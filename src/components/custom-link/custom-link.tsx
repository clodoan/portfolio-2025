import Link from "next/link";
import { cx } from "class-variance-authority";

export type CustomLinkProps = {
  href: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
};

const CustomLink = ({
  href,
  target,
  rel,
  children,
  className,
  ...props
}: CustomLinkProps) => (
  <Link
    href={href}
    target={target}
    rel={rel}
    {...props}
    className={cx(
      "text-accent transition-colors hover:text-accent-muted",
      className
    )}
  >
    {children}
  </Link>
);

export default CustomLink;
