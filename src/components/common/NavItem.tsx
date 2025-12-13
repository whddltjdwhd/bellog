import Link from "next/link";

interface NavItemProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
  className?: string;
}

export default function NavItem({ href, children, className }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`relative font-medium text-muted-foreground hover:text-primary transition-colors duration-300 text-base md:text-lg ${className}`}
    >
      {children}
    </Link>
  );
}
