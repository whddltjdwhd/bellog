import React from "react";

interface HeaderProps {
  emoji: string;
  title: string;
  date: string;
  tag: string;
}

export default function Header({ emoji, title, date, tag }: HeaderProps) {
  return (
    <article className="mt-4">
      <h1 className="text-4xl md:text-[70px]">{emoji}</h1>
      <h1 className="text-2xl md:text-[40px] pb-10">{title}</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-7 border-b-2">
        <p className="text-gray-800 text-sm md:text-base">{tag}</p>
        <p className="text-gray-800 text-sm md:text-base">{date}</p>
      </div>
    </article>
  );
}
