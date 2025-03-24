interface TagProps {
  tagName: string;
  variant?: "large" | "small";
  onClick?: () => void;
}

export default function Tag({ tagName, variant = "small", onClick }: TagProps) {
  const baseClass =
    "rounded-full text-center cursor-pointer transition-colors duration-200 max-w-full w-fit truncate";

  const largeStyles = "px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-300";
  const smallStyles = "px-3 py-1 bg-gray-100 text-gray-800 text-[12px]";

  const style = variant === "large" ? largeStyles : smallStyles;

  return (
    <div onClick={onClick} className={`${baseClass} ${style}`}>
      {tagName}
    </div>
  );
}
