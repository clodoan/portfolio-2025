"use client";

import FilterableProjects from "./components/filterable-projects/filterable-projects";
import { projects } from "./projects-section.content";

const ProjectsSection = () => {
  return <FilterableProjects projects={projects} />;
};

export default ProjectsSection;
