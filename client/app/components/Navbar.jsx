// components/Navbar.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { FiPlusCircle } from "react-icons/fi"; // Icon for file upload button
import LoaderGroup from "./LoaderGroup"; // Loader component for loading state
import { MdDelete } from "react-icons/md"; // Icon for delete button
import { FaRegFile } from "react-icons/fa"; // Icon for file display

const Navbar = ({ onFileUpload }) => {
  const [file, setFile] = useState(null); // State for the selected file
  const [message, setMessage] = useState(""); // State for status messages

  const [data, setData] = useState(null); // State for fetched data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [isLoading, setIsLoading] = useState(false); // State for delete button loading indicator

  const handleDelete = async () => {
    setIsLoading(true); // Show loading indicator on delete button
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/text/${data.id}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Document deleted successfully");
        window.location.reload(); // Reload page on successful delete
      } else {
        const errorData = await response.json();
        console.log(`Error: ${errorData.detail}`); // Log error details
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`); // Set error message
    } finally {
      setIsLoading(false); // Hide loading indicator on delete button
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/document/first"
        );
        const result = await response.json();
        setData(result); // Set fetched data
        setLoading(false); // Hide loading indicator
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Hide loading indicator on error
      }
    };

    fetchData();
  }, []); // Fetch data on component mount

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Set the selected file
      await handleSubmit(selectedFile); // Handle file upload
    }
  };

  const handleSubmit = async (selectedFile) => {
    if (!selectedFile) {
      setMessage("Please select a file first."); // Set message for no file selected
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile); // Append selected file to form data

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const successMessage = "File uploaded successfully: " + data.filename;
        setMessage(successMessage); // Set success message
        onFileUpload(successMessage); // Send message to parent component
        localStorage.clear();
        window.location.reload(); // Reload page on successful upload
      } else {
        const errorData = await response.json();
        const errorMessage = "Error: " + errorData.detail;
        setMessage(errorMessage); // Set error message
        onFileUpload(errorMessage); // Send message to parent component
      }
    } catch (error) {
      const errorMessage = "An error occurred: " + error.message;
      setMessage(errorMessage); // Set error message
      onFileUpload(errorMessage); // Send message to parent component
    }
  };

  const truncateFilename = (filename) => {
    const maxLength = 5; // Maximum length for truncated filename
    if (filename.length <= maxLength) {
      return filename; // Return filename if within max length
    }
    const extensionIndex = filename.lastIndexOf(".");
    const extension = filename.substring(extensionIndex); // Get file extension
    const truncatedName = filename.substring(0, maxLength) + "..."; // Truncate filename
    return truncatedName + extension; // Return truncated filename with extension
  };

  return (
    <div className="flex items-center px-8 py-4 fixed shadow-md w-full bg-white justify-between z-50">
      <Link href="/">
        <Image src={logo} alt="Logo" height={100} width={100} className="pr-3" />
      </Link>

      <div>
        <div className="flex items-center justify-center gap-4">
          {loading ? (
            <LoaderGroup /> // Show loader while fetching data
          ) : (
            <div>
              <div className="flex items-center gap-3 justify-center">
                <h1 className="text-[#4ADE80] lg:text-md sm:text-[0.6em] md:text-sm flex items-center gap-1">
                  {data?.id && (
                    <FaRegFile
                      color="#4ADE80"
                      size={25}
                      className="p-[3px] border-dotted border-[#4ADE80] border-2 rounded-md"
                    />
                  )}
                  {data.filename ? truncateFilename(data.filename) : ""} {/* Display truncated filename */}
                </h1>

                {data?.id ? (
                  <button
                    className="flex justify-center items-center hover:bg-rose-600 transition duration-700 ease-in-out bg-rose-700 md:p-1 sm:p-1 lg:p-2 rounded-md"
                    onClick={handleDelete}
                    disabled={isLoading} // Disable button while loading
                  >
                    <MdDelete color="white" size={25} />
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          )}
          <input
            type="file"
            id="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden" // Hide default file input
          />
          <label
            htmlFor="file"
            className="sm:p-2 md:p-2 flex gap-3 items-center justify-center cursor-pointer border-black hover:border-slate-900 text-black hover:text-slate-900 border-[1.5px] rounded-lg lg:px-4 lg:py-2"
          >
            <FiPlusCircle size={20} />
            <h3 className="md:hidden sm:hidden lg:inline">Upload PDF</h3>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
