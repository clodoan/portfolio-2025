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
    mediaAsset: "/plugins/annotate-instances.svg",
    category: "plugins",
    type: "image",
  },
  {
    id: "black-and-white",
    title: "Black and White",
    description:
      "A Figma plugin to quickly convert your designs to black and white.",
    link: "https://www.figma.com/community/plugin/1091815827328120861/black-and-white",
    mediaAsset: "/plugins/black-and-white.svg",
    category: "plugins",
    type: "image",
  },
  {
    id: "internal-project",
    title: "New ID doc capture flow",
    description:
      "Improved conversion rate of ID doc capture flow from 60% to +90%.",
    category: "project",
    link: "/projects/internal-project",
    disabled: true,
    type: "link",
  },
  {
    id: "date-picker",
    title: "Date picker",
    description: "A date picker component built with React and Tailwind CSS.",
    category: "components",
    mediaAsset: "hQqT01Lt6e5IE02qW6d29mmGE00KwEzSiESfvmh7qgGovM",
    disabled: false,
    type: "video",
  },
];

const ProjectsSection = () => {
  return <FilterableProjects projects={projects} />;
};

export default ProjectsSection;
