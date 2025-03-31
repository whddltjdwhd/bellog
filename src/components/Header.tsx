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
      <h1 className="text-[70px]">{emoji}</h1>
      <h1 className="text-[70px]">{title}</h1>
      <div className="flex justify-between items-center pb-7 border-b-2">
        <p className="text-gray-800">{tag}</p>
        <p className="text-gray-800">{date}</p>
      </div>
    </article>
  );
}
