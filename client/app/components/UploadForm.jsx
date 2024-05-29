
"use client";

import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [result, setResult] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Check if the selected file is a PDF
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setSubmit(true);
    } else {
      alert("Please select a PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    setSubmit(false);
    setFile(null);
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://docai-zk2t.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      

      if (response.ok) {
        console.log("File uploaded successfully");
        
        const res = await response.json();
        setResult(res);
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCancel = () => {
    setSubmit(false);
    setFile(null);
  };

  const getTruncatedFileName = () => {
    if (file) {
      const fileName = file.name;
      const extensionIndex = fileName.lastIndexOf(".");
      const truncatedFileName =
        fileName.substring(0, 5) + "..." + fileName.substring(extensionIndex);
      return truncatedFileName;
    }
    return "";
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      {result && (
        <div className="truncate text-sm mr-2">{result.fileName}</div>
      )}
      {file ? (
        <div className="font-semibold text-md bg-white border-[1.5px] border-black rounded-lg px-5 py-2 w-fit">{getTruncatedFileName()}</div>
      ) : (
        <label htmlFor="file-upload" className="file-upload-label">
          <div className="cursor-pointer font-semibold text-md bg-white border-[1.5px] border-black rounded-lg px-5 py-2 w-fit">
            <div className="flex items-center gap-2 content-center">
              <CiCirclePlus size={20} /> Upload PDF
            </div>
          </div>
        </label>
      )}

      <input
        id="file-upload"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {submit ? (
        <>
          <button
            type="submit"
            className="bg-green-800 text-white cursor-pointer font-semibold text-md flex items-center gap-2 content-center border-[1.5px] rounded-lg px-5 py-2 w-fit border-green-800 hover:bg-green-700 hover:border-green-700 hover:border-[1.5px]"
          >
            Upload
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-800 text-white cursor-pointer font-semibold text-md flex items-center gap-2 content-center border-[1.5px] rounded-lg px-5 py-2 w-fit border-red-800 hover:bg-red-700 hover:border-red-700 hover:border-[1.5px]"
          >
            Cancel
          </button>
        </>
      ) : (
        <div></div>
      )}
    </form>
  );
};

export default UploadForm;
