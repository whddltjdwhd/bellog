"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`flex justify-center items-center w-full h-[70px] bg-[#F6F4E2] sticky top-0 transition-all duration-80 z-10 ${
        isScrolled && "bg-transparent/30 backdrop-blur-md"
      }`}
    >
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
        </div>
      </div>
    </div>
  );
}
