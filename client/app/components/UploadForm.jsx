"use client";

import { useState } from "react";
import { CiCirclePlus  } from "react-icons/ci";
import { FaRegFile } from "react-icons/fa";


const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
    e.preventDefault();
    setLoading(true);
    setSubmit(false);

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
        console.log(res);
        setResult(res);
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  const handleCancel = () => {
    setSubmit(false);
    setFile(null);
  };

  const getTruncatedFileName = (filename) => {
    if (filename) {
      const extensionIndex = filename.lastIndexOf(".");
      const extension = filename.substring(extensionIndex);
      const truncatedFileName = filename.substring(0, 5) + "..." + extension;
      return truncatedFileName;
    }
    return "";
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      {loading && <div className="text-sm mr-2">Loading...</div>}
      {result && !loading && (
        <div className="truncate text-sm mr-2 flex items-center gap-2 text-green-700">
          <div className="items-center flex justify-center rounded-sm border-dotted text-green-700 p-1 border-[1px] border-green-700  "><FaRegFile /></div>  {getTruncatedFileName(result.filename)}
        </div>
      )}
      {file ? (
        <div className="font-semibold text-md bg-white border-[1.5px] border-black rounded-lg px-5 py-2 w-fit">
          {getTruncatedFileName(file.name)}
        </div>
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
