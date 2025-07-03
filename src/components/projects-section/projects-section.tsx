"use client";

import FilterableProjects from "./components/filterable-projects/filterable-projects";
import { Project } from "./components/filterable-projects/filterable-projects";

const projects: Project[] = [
  {
    id: "annotate-instances",
    title: "Annotate Instances",
    description: "A Figma plugin to annotate instances of your components in your design system so Engineers know what to use.",
    link: "https://www.figma.com/community/plugin/1148778271243240018/annotate-instances",
    image: "/plugins/annotate-instances.svg",
    category: "figma-plugin"
  },
  {
    id: "black-and-white",
    title: "Black and White",
    description: "A Figma plugin to quickly convert your designs to black and white.",
    link: "https://www.figma.com/community/plugin/1091815827328120861/black-and-white",
    image: "/plugins/black-and-white.svg",
    category: "figma-plugin"
  },
  {
    id: "internal-project",
    title: "Internal project",
    description: "A project I'm working on.",
    image: "/plugins/black-and-white.svg",
    category: "project",
    link: "/projects/internal-project"
  }
];

const ProjectsSection = () => {
  return <FilterableProjects projects={projects} />;
};

export default ProjectsSection; 