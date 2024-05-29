import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png"

const Navbar = () => {
  return (
    <div>
      <Link href={"/"}>
        <Image
          src={logo}
          alt="Picture of the author"
          height={100}
          width={100}
        />
      </Link>
      <div>
        {
          <h1>Hallo</h1>
        }
        <button>upload pdf</button>
      </div>
    </div>
  );
};

export default Navbar;
