import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-between gap-1 w-full py-4 mb-8 mt-36 text-center">
      <p className="text-sm text-amber-50">
        All rights reserved by castle_bell
      </p>
      <a href="https://github.com/whddltjdwhd" className="group relative">
        Github
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></span>
      </a>
    </footer>
  );
}
