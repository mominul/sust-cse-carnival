import React from "react";
import logo from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { NavMenu } from "./Navmenu";
import { SearchField } from "./SearchBar";

const Header = () => {
  return (
    <div className="shadow ">
      <div className="bg-white py-2 flex justify-between items-center container mx-auto px-5">
       
      <div>
          <NavMenu />
        </div>

       
        {/* left logo part */}
        <div className="flex gap-2 items-center">
          <Link href="/" className="flex items-center">
            <Image
              height={100}
              width={200}
              className="w-12 sm:w-20"
              src={logo}
              alt="logo"
            />
            {/* <h1 className="font-semibold opacity-55">Best Deal</h1> */}
          </Link>
        </div>

        {/* middle links */}

        
        {/* right search bar */}
        {/* <div className="flex justify-end">
          <SearchField />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
