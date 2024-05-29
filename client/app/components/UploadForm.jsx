"use client"

import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegFile } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import LoaderGroup from "./LoaderGroup";

const UploadForm = ({ onDataUpdate, onDataDelete }) => {
  useEffect(() => {
    // Load data from localStorage on component mount
    const storedData = JSON.parse(localStorage.getItem("uploadData"));
    if (storedData) {
      setFile(storedData.file);
      
      setSubmit(true);
      setResult({
        filename: storedData.filename,
        file_path: storedData.file_path,
        id: storedData.id
      });
      // Send data to parent component
      onDataUpdate(storedData);
    }
  }, []);

  const handleFileChange = (e) => {
    localStorage.removeItem("uploadData");
    setResult(null)
    const selectedFile = e.target.files[0];

    // Check if the selected file is a PDF
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setSubmit(true);
    } else {
      alert("Please select a PDF file.");
    }
  };

  const handleDeleteFromLocalStorage = () => {
    const deletedData = JSON.parse(localStorage.getItem("uploadData"));
    if (deletedData) {
      localStorage.removeItem("uploadData");
      // Send deleted data to parent component
      onDataDelete(deletedData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        // Store data in localStorage
        localStorage.setItem("uploadData", JSON.stringify({
          file,
          filename: res.filename,
          file_path: res.file_path,
          id: res.id
        }));
        // Send data to parent component
        onDataUpdate({
          file,
          filename: res.filename,
          file_path: res.file_path,
          id: res.id
        });
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };



  const [file, setFile] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
      {loading && <LoaderGroup />}
      {result && !loading && (
        <div className="truncate text-sm mr-2 flex items-center gap-2 text-[#1aad60]">
          <div className="items-center flex justify-center rounded-sm border-dotted text-[#1aad60] p-1 border-[1px] border-[#1aad60]  ">
            <FaRegFile size={17} />
          </div>{" "}
          {getTruncatedFileName(result.filename)}
          
        </div>
      )}
      {file && !result ? (
        <div className="font-semibold text-md bg-white border-[1.5px] border-black rounded-lg px-5 py-2 w-fit">
          {getTruncatedFileName(file.name)}
        </div>
      ) : (
        <label htmlFor="file-upload" className="file-upload-label">
          <div className="cursor-pointer font-semibold text-md bg-white border-[1.5px] border-black rounded-lg px-5 py-2 w-fit">
            <div className="flex items-center gap-2 content-center">
              <CiCirclePlus size={20} /> <h1 className="sm:hidden md:hidden lg:inline">Upload PDF</h1> 
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
      {submit && !loading && !result && (
        <>
          <button
            type="submit"
            className="bg-green-800 text-white cursor-pointer font-semibold text-md flex items-center gap-2 content-center border-[1.5px] rounded-lg px-5 py-2 w-fit border-green-800 hover:bg-green-700 hover:border-green-700 hover:border-[1.5px]"
          >
            Upload
          </button>
        </>
      )}
    </form>
  );
};

export default UploadForm;
