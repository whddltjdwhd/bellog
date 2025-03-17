import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <div className="flex justify-center items-center w-full h-[80px] bg-[#F6F4E2]">
      <div className="flex justify-between items-center w-[1000px]">
        <Link
          href="/"
          className="group relative text-black font-bold text-[25px]"
        >
          Bellog
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></span>
        </Link>
        <div className="flex justify-center items-center gap-[50px]">
          <Link
            href="/about"
            className="group relative text-black font-bold text-[25px]"
          >
            About
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link
            href="/projects"
            className="group relative text-black font-bold text-[25px]"
          >
            Projects
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link
            href="https://github.com/whddltjdwhd"
            className="group relative text-black font-bold text-[25px]"
          >
            Github
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
