import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-4 mb-8 mt-16 sm:mt-36 text-center">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-amber-50">
          All rights reserved by castle_bell
        </p>
        <div className="flex gap-3">
          <Link href={"/posts"} className="group relative">
            Posts
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></span>
          </Link>
          <Link
            href="https://github.com/whddltjdwhd"
            className="group relative"
          >
            Github
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
