// @use-client
"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import UploadForm from "./UploadForm";

const Navbar = () => {
    const [uploadedData, setUploadedData] = useState(null);

    const handleDataUpdate = (data) => {
      // Handle updated data here
      console.log("Data updated:", data);
      setUploadedData(data);
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
        <UploadForm onDataUpdate={handleDataUpdate} />
        {/* {uploadedData && (
          <h1 className="ml-4 text-lg font-semibold">
            Uploaded: {uploadedData.id}
          </h1>
        )} */}
      </div>
    );
};

export default Navbar;
