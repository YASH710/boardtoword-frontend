import React, { useRef, useState } from "react";
import { Button } from "monday-ui-react-core";

const TEXT_CONTENT = {
  default: "Drag and drop your template documents to upload",
  onDragOver: "Release your mouse to upload document.",
};

const FileUpload = ({ onChange }) => {
  const fileInput = useRef(null);
  const [text, setText] = useState(TEXT_CONTENT["default"]);

  const handleClick = () => {
    if (fileInput.current) fileInput.current.click();
  };

  const handleChange = (event) => {
    if (event.target.files?.length == 1) onChange(event.target.files[0]);
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files.length == 1) {
      onChange(event.dataTransfer.files[0]);
    } else {
      console.error("Can not upload multiple file");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setText(TEXT_CONTENT["onDragOver"]);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setText(TEXT_CONTENT["default"]);
  };

  return (
    <div className="upload-container display-grid-center" onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} style={{}}>
      <input type="file" ref={fileInput} onChange={handleChange} accept=".docx" style={{ display: "none" }} />
      <div className="upload-info-text">{text}</div>
      <div className="or-split-line">
        <div></div>
        <div>OR</div>
        <div></div>
      </div>
      <div className="display-grid-center">
        <Button onClick={handleClick}> Upload Template</Button>
      </div>
    </div>
  );
};

export default FileUpload;
