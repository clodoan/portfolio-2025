import Divider from "@/components/divider";
import ProjectCard from "@/components/plugin-card";
import { getPortfolioContent } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "../../mdx-components";
import Footer from "@/components/footer";

export default async function Home() {
  const { content } = await getPortfolioContent();
  const components = getMDXComponents({ Divider, ProjectCard });

  return (
    <div className="w-screen flex flex-col text-primary min-h-screen">
      <div className="flex flex-col gap-4 max-w-container-mobile md:max-w-container-desktop mx-auto px-5 py-24 rounded overflow-hidden motion-opacity-in-0 motion-blur-in-md motion-duration-1500 z-0">
        <MDXRemote source={content} components={components} />
      </div>
      <Footer
        socialLinks={[
          { label: "GitHub", url: "https://github.com/clodoan" },
          {
            label: "X",
            url: "https://x.com/clodoan",
          },
          {
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/claudioangrigiani/",
          },
        ]}
      />
    </div>
  );
}
