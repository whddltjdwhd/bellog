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
      className={`flex justify-center items-center w-full h-[70px] sticky top-0 transition-all duration-80 z-10 ${
        isScrolled ? "bg-transparent/30 backdrop-blur-md" : "bg-[#F6F4E2]"
      }`}
    >
      <div className="flex justify-between items-center w-full max-w-4xl px-4">
        <Link
          href="/"
          className="group relative text-black font-bold text-lg sm:text-xl md:text-2xl"
        >
          Bellog
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></span>
        </Link>
        <div className="flex justify-center items-center gap-8">
          <Link
            href="/about"
            className="group relative text-black font-bold text-lg sm:text-xl md:text-2xl"
          >
            About
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link
            href="/projects"
            className="group relative text-black font-bold text-lg sm:text-xl md:text-2xl"
          >
            Projects
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
