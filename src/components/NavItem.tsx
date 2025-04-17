import Link from "next/link";

interface NavItemProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
  className?: string;
}

export default function NavItem({ href, children, className }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`group relative font-bold text-[var(--text)] text-lg sm:text-l md:text-2xl ${className}`}
    >
      {children}
      <span
        className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[var(--text)]
                     transition-all duration-500 group-hover:w-full"
      />
    </Link>
  );
}
