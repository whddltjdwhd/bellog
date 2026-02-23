import Link from "next/link";

interface FooterLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export default function FooterLink({
  href,
  children,
  ...rest
}: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="group relative font-medium text-foreground"
      {...rest}
    >
      {children}
      <span
        className="absolute left-0 -bottom-1 h-0.5 w-0 bg-foreground
                     transition-all duration-500 group-hover:w-full"
      />
    </Link>
  );
}
