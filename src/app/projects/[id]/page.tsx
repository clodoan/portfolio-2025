import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getMDXComponents } from "../../../../mdx-components";
import type { ProjectFrontmatter } from "@/lib/mdx";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const projectsDirectory = path.join(process.cwd(), "src/content/projects");
  const fileNames = fs.readdirSync(projectsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => ({
      id: fileName.replace(/\.mdx$/, ""),
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const projectPath = path.join(
    process.cwd(),
    "src/content/projects",
    `${id}.mdx`
  );

  try {
    const fileContents = fs.readFileSync(projectPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as ProjectFrontmatter;

    const components = getMDXComponents({});

    return (
      <div className="w-screen min-h-[100dvh]">
        <div className="flex flex-col gap-6 md:max-w-[var(--desktop-container-max-width)] max-w-[var(--mobile-container-max-width)] mx-auto p-5 py-20">
          <div className="space-y-4">
            <h1 className="text-label-1">{frontmatter.title}</h1>
            <p className="text-body-1 text-secondary">
              {frontmatter.description}
            </p>
            {frontmatter.link && (
              <a
                href={frontmatter.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-primary text-background rounded hover:bg-primary/90 transition-colors"
              >
                View Project
              </a>
            )}
          </div>
          <div className="prose prose-invert max-w-none">
            <MDXRemote source={content} components={components} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading project:", error);
    notFound();
  }
}
