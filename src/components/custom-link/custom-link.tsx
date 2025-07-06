import Link from "next/link";

export type CustomLinkProps = {
  href: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
};

const CustomLink = ({
  href,
  target,
  rel,
  children,
  ...props
}: CustomLinkProps) => (
  <Link
    href={href}
    target={target}
    rel={rel}
    {...props}
    className="text-accent transition-colors hover:text-accent-muted"
  >
    {children}
  </Link>
);

export default CustomLink;
