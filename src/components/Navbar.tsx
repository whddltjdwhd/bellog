"use client";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.pageYOffset > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex justify-center items-center w-full h-[70px] sticky top-0 z-10 transition-all duration-200
        ${
          isScrolled
            ? "backdrop-blur-md bg-[var(--surface)]/80 shadow-sm"
            : "bg-[var(--surface)]"
        }`}
    >
      <div className="flex w-full max-w-4xl items-center justify-between px-3">
        <NavItem href="/" className="mr-auto">
          Bellog
        </NavItem>

        <NavItem href="/about" className="sm:inline-block mr-3 sm:mr-8">
          About
        </NavItem>
        <NavItem href="/projects" className="sm:inline-block">
          Projects
        </NavItem>
      </div>
    </nav>
  );
}
