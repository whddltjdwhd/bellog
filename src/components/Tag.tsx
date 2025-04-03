interface TagProps {
  tagName: string;
  variant?: "large" | "small";
  selected?: boolean;
}

export default function Tag({
  tagName,
  variant = "small",
  selected = false,
}: TagProps) {
  const baseClass =
    "rounded-full text-center cursor-pointer transition-colors duration-200 max-w-full w-fit truncate";

  const largeStyles = selected
    ? "px-3 py-1 sm:px-4 sm:py-2 bg-blue-200 text-blue-800 hover:bg-blue-300"
    : "px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 text-gray-800 hover:bg-gray-300";
  const smallStyles = selected
    ? "px-2 py-1 sm:px-3 sm:py-1 bg-blue-200 text-blue-800 text-[10px] sm:text-[12px]"
    : "px-2 py-1 sm:px-3 sm:py-1 bg-gray-100 text-gray-800 text-[10px] sm:text-[12px]";

  const style = variant === "large" ? largeStyles : smallStyles;

  return <div className={`${baseClass} ${style}`}>{tagName}</div>;
}
