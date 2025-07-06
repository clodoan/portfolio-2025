import Divider from "@/components/divider";
import FindMeOn from "@/components/find-me-on";
import ProjectCard from "@/components/projects-section/components/filterable-projects/components/project-card";
import { getPortfolioContent } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "../../mdx-components";

export default async function Home() {
  const { content } = await getPortfolioContent();
  const components = getMDXComponents({ Divider, ProjectCard });

  return (
    <div className="w-screen min-h-[100dvh] flex flex-col">
      <div className="flex flex-col gap-3 md:max-w-[var(--desktop-container-max-width)] max-w-[var(--mobile-container-max-width)] mx-auto px-5 pt-24 rounded overflow-hidden motion-opacity-in-0 motion-blur-in-md motion-duration-1500 z-0">
        <MDXRemote source={content} components={components} />
      </div>
      <FindMeOn
        socialLinks={[
          { label: "GitHub", url: "https://github.com/clodoan" },
          {
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/claudioangrigiani/",
          },
        ]}
      />
    </div>
  );
}
