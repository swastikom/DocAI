// @use-client
"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

const Navbar = () => {
    

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
        
      </div>
    );
};

export default Navbar;
