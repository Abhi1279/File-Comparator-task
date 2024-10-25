import React, { useState } from "react";
import Header from "./Header";

const FileComaprator = () => {
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleCompare = () => {
    setLoading(true); // Set loading to true when the compare button is clicked
    // Simulate loading for demonstration purposes
    setTimeout(() => {
      // Here, you would handle your file comparison logic
      setLoading(false); // Set loading to false after processing
    }, 2000); // Simulate a delay of 2 seconds (adjust as needed)
  };

  return (
    <div className="container mt-2 p-4">
      <div className="row">
        <Header />
      </div>
      <div className="row mt-2">
        <div className="col-md-6 mb-3">
          <div className="d-flex justify-content-center align-items-center p-3">
            <input type="file" className="form-control" />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="d-flex justify-content-center align-items-center p-3">
            <input type="file" className="form-control" />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4"></div>
        <div className="col-md-4 d-flex justify-content-center">
          <button className="btn btn-primary w-50 p-2" onClick={handleCompare}>
            Compare
          </button>
        </div>
        <div className="col-md-4"></div>
      </div>

      <div className="row mt-5">
        <div
          className="col-md-5 p-3 mr-md-2"
          style={{ border: "1px solid rgb(179 198 217)", height: "450px" }}
        >
          {loading && (
            <div className="text-center">
              <div className="spinner-border" role="status"></div>
              <center><span className="sr-only">Loading...</span></center>
            </div>
          )}
        </div>
        <div className="col-md-2"></div>
        <div
          className="col-md-5 p-3 ml-md-2"
          style={{ border: "1px solid rgb(179 198 217)", height: "450px" }}
        >
          {loading && (
            <div className="text-center">
              <div className="spinner-border" role="status"></div>
              <center><span className="sr-only">Loading...</span></center>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileComaprator;
