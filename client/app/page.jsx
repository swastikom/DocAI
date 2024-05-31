// pages.js
"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";

export default function Home() {
  const [uploadMessage, setUploadMessage] = useState(""); // State for upload message

  // Function to handle file upload message from Navbar component
  const handleFileUpload = (message) => {
    setUploadMessage(message);
  };

  const [data, setData] = useState(null); // State for fetched data
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://docai-zk2t.onrender.com/document/first"
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

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <span class="relative flex h-[10em] w-[10em] justify-center items-center">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-[60%] w-[60%] bg-green-500"></span>
        </span> {/* Loading spinner */}
      </div>
    );
  }

  return (
    <>
      <Navbar onFileUpload={handleFileUpload} /> {/* Navbar component with file upload handler */}
      <Chatbot data={data.id} /> {/* Chatbot component with document ID */}
    </>
  );
}
