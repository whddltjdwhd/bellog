import Link from "next/link";
import React from "react";

export default function Intro() {
  return (
    <div className="flex justify-between items-center w-full h-[300px]">
      <div className="flex flex-col justify-evenly items-start gap-[30px] text-white text-[30px] h-full">
        <div className="flex flex-col justify-center items-start">
          <div>안녕하세요, </div>
          <div> 이해하는 개발자 이성종입니다.</div>
        </div>
        <div className="flex flex-col justify-center items-start">
          <div>좋은 개발자이기 전에, </div>
          <div>좋은 사람이 되고 싶습니다.</div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end h-[50%]">
        <Link
          href={"/posts"}
          className="group relative text-black font-bold text-[25px]"
        >
          Posts
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full" />
        </Link>
        <Link
          href={"https://github.com/whddltjdwhd"}
          className="group relative text-black font-bold text-[25px]"
        >
          Github
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full" />
        </Link>
        <Link
          href={"https://velog.io/@whddltjdwhd/posts"}
          className="group relative text-black font-bold text-[25px]"
        >
          Prev Blog
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-500 group-hover:w-full" />
        </Link>
      </div>
    </div>
  );
}
