"use client";

import FilterableProjects from "./components/filterable-projects/filterable-projects";
import type { Project } from "./components/filterable-projects/filterable-projects";

const projects: Project[] = [
  {
    id: "annotate-instances",
    title: "Annotate Instances",
    description:
      "A Figma plugin to annotate instances of your components in your design system so Engineers know what to use.",
    link: "https://www.figma.com/community/plugin/1148778271243240018/annotate-instances",
    image: "/plugins/annotate-instances.svg",
    category: "plugins",
  },
  {
    id: "black-and-white",
    title: "Black and White",
    description:
      "A Figma plugin to quickly convert your designs to black and white.",
    link: "https://www.figma.com/community/plugin/1091815827328120861/black-and-white",
    image: "/plugins/black-and-white.svg",
    category: "plugins",
  },
  {
    id: "internal-project",
    title: "New ID doc capture mobile flow",
    description:
      "Improved conversion rate of ID doc capture flow from 60% to +90%.",
    category: "project",
    link: "/projects/internal-project",
    disabled: true,
  },
];

const ProjectsSection = () => {
  return <FilterableProjects projects={projects} />;
};

export default ProjectsSection;
