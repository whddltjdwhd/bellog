interface TagProps {
  tagName: string;
  variant?: "large" | "small";
  onClick?: () => void;
}

export default function Tag({ tagName, variant = "small", onClick }: TagProps) {
  const baseClass =
    "rounded-full text-center cursor-pointer transition-colors duration-200";

  const largeStyles = "px-4 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200";
  const smallStyles = "px-2 py-1 bg-gray-200 text-gray-800 text-sm";

  const style = variant === "large" ? largeStyles : smallStyles;

  return (
    <div onClick={onClick} className={`${baseClass} ${style}`}>
      {tagName}
    </div>
  );
}
