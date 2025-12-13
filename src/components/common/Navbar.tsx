"use client";

import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-auto max-w-[95vw]">
      <div
        className={`
          flex items-center gap-6 px-6 py-3 rounded-full border transition-all duration-300
          ${
            isScrolled
              ? "bg-background/80 backdrop-blur-xl border-border/40 shadow-lg"
              : "bg-background/50 backdrop-blur-md border-transparent shadow-sm"
          }
        `}
      >
        <NavItem
          href="/"
          className="font-heading font-bold text-foreground hover:text-primary"
        >
          Bellog
        </NavItem>

        <div className="flex gap-4 items-center">
          <NavItem href="/posts">Posts</NavItem>
          <NavItem href="/projects">Projects</NavItem>
        </div>

        <div className="pl-4 border-l border-border/50">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
