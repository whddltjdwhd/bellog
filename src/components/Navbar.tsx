"use client";

import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.pageYOffset > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex justify-center items-center w-full h-[70px] sticky top-0 z-10 transition-all duration-200 ${
        isScrolled
          ? "backdrop-blur-md bg-[var(--surface)]/80 shadow-sm"
          : "bg-[var(--surface)]"
      }`}
    >
      <div className="flex w-full max-w-4xl items-center justify-between px-3">
        <NavItem href="/" className="mr-auto">
          Bellog
        </NavItem>

        <div className="hidden sm:flex gap-4 items-center mr-4">
          <NavItem href="/about">About</NavItem>
          <NavItem href="/projects">Projects</NavItem>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
}
