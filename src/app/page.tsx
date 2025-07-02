import { MDXRemote } from "next-mdx-remote/rsc";
import { getPortfolioContent } from "@/lib/mdx";
import Divider from "@/components/divider";
import ProjectCard from "@/components/project-card";
import { getMDXComponents } from "../../mdx-components";

export default async function Home() {
  const { content } = await getPortfolioContent();
  const components = getMDXComponents({ Divider, ProjectCard });

  return (
    <div className="w-screen min-h-[100dvh]">
      <div className="flex flex-col gap-3 md:max-w-[var(--desktop-container-max-width)] max-w-[var(--mobile-container-max-width)] mx-auto justify-center h-screen p-5 rounded overflow-hidden motion-opacity-in-0 motion-blur-in-md motion-duration-1500 z-0">
        <MDXRemote source={content} components={components} />
      </div>
    </div>
  );
}
