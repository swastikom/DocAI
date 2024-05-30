// components/Navbar.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { FiPlusCircle } from "react-icons/fi";
import LoaderGroup from "./LoaderGroup";

const Navbar = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://docai-zk2t.onrender.com/text/${data.id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Document deleted successfully");
        window.location.reload();

      } else {
        const errorData = await response.json();
        console.log(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://docai-zk2t.onrender.com/document/first"
        );
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      await handleSubmit(selectedFile);
    }
  };

  const handleSubmit = async (selectedFile) => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://docai-zk2t.onrender.com/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const successMessage = "File uploaded successfully: " + data.filename;
        setMessage(successMessage);
        onFileUpload(successMessage); // Send message to parent
        window.location.reload();
      } else {
        const errorData = await response.json();
        const errorMessage = "Error: " + errorData.detail;
        setMessage(errorMessage);
        onFileUpload(errorMessage); // Send message to parent
      }
    } catch (error) {
      const errorMessage = "An error occurred: " + error.message;
      setMessage(errorMessage);
      onFileUpload(errorMessage); // Send message to parent
    }
  };

  return (
    <div className="flex items-center px-10 py-4 fixed shadow-md w-[100%] bg-white justify-between">
      <Link href={"/"}>
        <Image
          src={logo}
          alt="Picture of the author"
          height={100}
          width={100}
        />
      </Link>

      <div>
        <div className="flex items-center justify-center gap-4">
          
          {loading ? (
            <LoaderGroup />
          ) : (
            <div>
              <div>
                <h1>{data.filename}</h1>
                
              
              {data.id?<button onClick={handleDelete} disabled={isLoading}>
                Delete 
              </button>:<div></div>}
              </div>
            </div>
          )}
          <input
            type="file"
            id="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file"
            className="flex gap-3 items-center justify-center cursor-pointer border-black hover:border-slate-900 text-black hover:text-slate-900 border-[1.5px] rounded-lg px-4 py-2"
          >
            <FiPlusCircle size={20} />
            Upload PDF
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
