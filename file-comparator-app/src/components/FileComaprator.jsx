import React, { useState } from "react";
import Header from "./Header";
import { compareFilesAPI } from "../service/fileComparatorService";
import { toast } from "react-toastify";
import Toaster from "./commonComponnets/Toaster";
import Loader from "./commonComponnets/Loader";
import FileInput from "./commonComponnets/FileInput";
import "./fileComparator.css"; 

const FileComparator = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [diffResult, setDiffResult] = useState(null);

  const allowedExtensions = ["txt", "json", "csv"];

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        toast.error(`File type not allowed. Please upload a ${allowedExtensions.join(", ")} file.`);
        setFile(null);
      } else {
        setFile(file);
      }
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleCompare = async () => {
    if (!file1 || !file2) {
      toast.error("Please upload both files before comparing.");
      return;
    }

    setLoading(true);

    try {
      const content1 = await readFileContent(file1);
      const content2 = await readFileContent(file2);
      const response = await compareFilesAPI(content1, content2);

      if (response.success) {
        const lines1 = content1.split("\n");
        const lines2 = content2.split("\n");
        const maxLength = Math.max(lines1.length, lines2.length);

        const differences = [];
        for (let i = 0; i < maxLength; i++) {
          const line1 = lines1[i] || "";
          const line2 = lines2[i] || "";
          const isDifferent = line1 !== line2;
          differences.push({
            line: i + 1,
            file1: line1,
            file2: line2,
            isDifferent,
          });
        }

        setDiffResult(differences);
        toast.success("Files compared successfully!");
      } else {
        toast.error(response.error);
      }
    } catch (err) {
      console.error("Error details:", err);
      toast.error("Error reading files or comparing content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-2 p-4">
      <div className="row">
        <Header />
      </div>
      <div className="row mt-2">
        <div className="col-md-6 mb-3">
          <div className="d-flex justify-content-center align-items-center p-3">
            <FileInput
              onFileChange={(e) => handleFileChange(e, setFile1)}
              testId="file-input-1"
            />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="d-flex justify-content-center align-items-center p-3">
            <FileInput
              onFileChange={(e) => handleFileChange(e, setFile2)}
              testId="file-input-2"
            />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4"></div>
        <div className="col-md-4 d-flex justify-content-center">
          <button
            data-testid="filecompare"
            className="btn btn-primary w-50 p-2"
            onClick={handleCompare}
            disabled={loading}
          >
            {loading ? "Comparing..." : "Compare"}
          </button>
        </div>
        <div className="col-md-4"></div>
      </div>

      <div className="row mt-5">
        <div className="col-md-5 p-3 outputContainer">
          {loading && <Loader />}
          {!loading && diffResult && (
            <div data-testfile1>
              <h5>File 1</h5>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {diffResult.map((diff, index) => (
                  <li
                    key={index}
                    style={{
                      backgroundColor: diff.isDifferent
                        ? "#ffcccc"
                        : "transparent",
                      padding: "5px",
                    }}
                  >
                    <strong>Line {diff.line}:</strong> {diff.file1}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-5 p-3 outputContainer">
          {loading && <Loader />}
          {!loading && diffResult && (
            <div>
              <h5>File 2</h5>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {diffResult.map((diff, index) => (
                  <li
                    key={index}
                    style={{
                      backgroundColor: diff.isDifferent
                        ? "#ffcccc"
                        : "transparent",
                      padding: "5px",
                    }}
                  >
                    <strong>Line {diff.line}:</strong> {diff.file2}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default FileComparator;
