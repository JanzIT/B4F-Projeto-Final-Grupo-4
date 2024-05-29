import React from "react";
import Link from "next/link";
import NavProfile from "./NavProfile";
import { useRouter } from "next/router";
import NavDash from "./NavDash";
import NavCareer from "./NavCareer";

const NavBar = () => {
    const router = useRouter()
  return (

    
    <div className="flex justify-center">
      <nav
        className="fixed bottom-10 rounded-full 
        flex justify-around 
        items-center
    h-20 w-11/12 mx-24
     bg-nav-bg"
      >
        <Link href="/dashboard">
          <div className="flex justify-center h-16 w-16 items-center cursor-pointer">
           <NavDash  color={router.pathname==="/dashboard" ? "#9299FC" : "#9A9A9A"} />
          </div>
        </Link>

        <Link href="/career">
          <div className="flex justify-center h-16 w-16 items-center cursor-pointer">
            <NavCareer  color={router.pathname==="/career" ? "#9299FC" : "#9A9A9A"} />
          </div>
        </Link>

        <Link href="/profile">
          <div className="flex justify-center h-16 w-16 items-center cursor-pointer">
          <NavProfile 
          color={router.pathname==="/profile" ? "#9299FC" : "#9A9A9A"} />
          </div>
        </Link>
      </nav>
    </div>



  );
};

export default NavBar;
