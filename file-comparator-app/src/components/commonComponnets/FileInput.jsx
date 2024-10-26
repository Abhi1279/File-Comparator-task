import React from "react";

const FileInput = ({ onFileChange, testId }) => {
  return (
    <input
      type="file"
      className="form-control"
      onChange={onFileChange}
      data-testid={testId}
    />
  );
};

export default FileInput;
