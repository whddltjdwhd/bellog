import React from "react";
import FooterLink from "./FooterLink";

export default function Footer() {
  return (
    <footer className="w-full  mb-8 mt-16 sm:mt-36 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mx-auto">
        <p className="text-sm text-[var(--text)]">
          © castle_bell · All rights reserved
        </p>

        <div className="flex gap-3">
          <FooterLink href="/posts">Posts</FooterLink>
          <FooterLink
            href="https://github.com/whddltjdwhd"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </FooterLink>
        </div>
      </div>
    </footer>
  );
}
