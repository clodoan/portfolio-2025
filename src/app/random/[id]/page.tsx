import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getMDXComponents } from "../../../../mdx-components";
import type { RandomFrontmatter } from "@/lib/mdx";

interface RandomPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const randomDirectory = path.join(process.cwd(), "src/content/random");
  const fileNames = fs.readdirSync(randomDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => ({
      id: fileName.replace(/\.mdx$/, ""),
    }));
}

export default async function RandomPage({ params }: RandomPageProps) {
  const { id } = params;
  const randomPath = path.join(
    process.cwd(),
    "src/content/random",
    `${id}.mdx`
  );

  try {
    const fileContents = fs.readFileSync(randomPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as RandomFrontmatter;

    const components = getMDXComponents({});

    return (
      <div className="w-screen min-h-[100dvh]">
        <div className="flex flex-col gap-6 md:max-w-[var(--desktop-container-max-width)] max-w-[var(--mobile-container-max-width)] mx-auto p-5 py-20">
          <div className="space-y-4">
            <h1 className="text-label-1">{frontmatter.title}</h1>
            <p className="text-body-1 text-secondary">
              {frontmatter.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-secondary">
              <span>{new Date(frontmatter.date).toLocaleDateString()}</span>
              <span className="px-3 py-1 bg-tertiary text-primary rounded-full text-xs">
                {frontmatter.category}
              </span>
            </div>
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-background text-secondary rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="prose prose-invert max-w-none">
            <MDXRemote source={content} components={components} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading random content:", error);
    notFound();
  }
}
