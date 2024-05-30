// pages/index.js
"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";

export default function Home() {
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileUpload = (message) => {
    setUploadMessage(message);
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <span class="relative flex h-[10em] w-[10em] justify-center items-center">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-[60%] w-[60%] bg-green-500"></span>
        </span>
      </div>
    );
  }

  return (
    <>
      <Navbar onFileUpload={handleFileUpload} />
      <Chatbot data={data.id} />
    </>
  );
}
