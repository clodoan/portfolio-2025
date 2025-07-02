import NextLink from "next/link";
import { cva } from "class-variance-authority";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  external?: boolean;
};

const link = cva("text-accent", {
  variants: {
    size: {
      small: "text-label-1",
      medium: "text-label-2",
      large: "text-label-3",
    },
  },
});

const Link = ({
  href,
  children,
  size = "medium",
  external = false,
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={link({ size })}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
      {external && <span className="text-accent ml-1 inline-block">→</span>}
    </NextLink>
  );
};

export default Link;
