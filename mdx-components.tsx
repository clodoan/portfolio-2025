import type { MDXComponents } from "mdx/types";

import ProjectCard, { type ProjectCardProps } from "@/components/project-card";
import Divider from "@/components/divider";
import CustomLink from "@/components/custom-link";

export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override specific components to match design system
    h1: ({ children }) => <h1 className="text-label-1">{children}</h1>,
    h2: ({ children }) => (
      <h2 className="text-label-1 text-secondary">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-label-2 text-secondary">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-body-1 text-secondary">{children}</p>
    ),
    a: ({ href, children, target, rel, ...props }) => (
      <CustomLink
        href={href}
        target={target}
        rel={rel}
        {...props}
        className="text-accent underline transition-colors hover:text-primary"
      >
        {children}
      </CustomLink>
    ),
    // Use the default components with any custom components (after our overrides)
    ...components,
    ProjectCard: ({
      title,
      description,
      link,
      image,
      onClick,
    }: ProjectCardProps) => (
      <ProjectCard
        title={title}
        description={description}
        link={link}
        image={image}
        onClick={onClick}
      />
    ),
    Divider: () => <Divider />,
    ProjectMeta: ({ children }: { children: React.ReactNode }) => (
      <div className="flex flex-wrap gap-1 mt-2">{children}</div>
    ),
    Tag: ({ children }: { children: React.ReactNode }) => (
      <span className="px-2 py-1 bg-tertiary text-primary rounded text-xs">
        {children}
      </span>
    ),
    Category: ({ children }: { children: React.ReactNode }) => (
      <span className="px-3 py-1 bg-secondary text-primary rounded-full text-sm">
        {children}
      </span>
    ),
  };
}
