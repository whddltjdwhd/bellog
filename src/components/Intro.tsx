"use client";
import Link from "next/link";
import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function Intro() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full h-auto md:h-[300px] p-4">
      <div className="flex flex-col justify-evenly items-start gap-4 text-lg md:text-2xl">
        <div className="font-light whitespace-pre-line min-h-[70px] md:min-h-[80px]">
          <TypeAnimation
            sequence={[`안녕하세요, \n이해하는 개발자 이성종입니다.`]}
            wrapper="div"
            cursor={false}
            repeat={0}
          />
        </div>
        <div className="font-light whitespace-pre-line min-h-[70px] md:min-h-[80px]">
          <TypeAnimation
            sequence={[
              1500,
              `좋은 개발자이기 전에, \n좋은 사람이 되고 싶습니다.`,
            ]}
            wrapper="div"
            cursor={false}
            repeat={0}
          />
        </div>
      </div>

      <div className="flex flex-row md:flex-col justify-around items-center md:items-end w-full md:w-auto mt-4 md:mt-0 gap-4">
        <Link
          href={"/posts"}
          className="text-[var(--text)] group relative font-bold text-[18px] md:text-[25px]"
        >
          <p>Posts</p>
          <span className="bg-[var(--text)] absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-500 group-hover:w-full" />
        </Link>
        <Link
          href={"https://github.com/whddltjdwhd"}
          className="text-[var(--text)] group relative font-bold text-[18px] md:text-[25px]"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
          <span className="bg-[var(--text)] absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-500 group-hover:w-full" />
        </Link>
        <Link
          href={"https://velog.io/@whddltjdwhd/posts"}
          className="text-[var(--text)] group relative font-bold text-[18px] md:text-[25px]"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prev Blog
          <span className="bg-[var(--text)] absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-500 group-hover:w-full" />
        </Link>
      </div>
    </div>
  );
}
