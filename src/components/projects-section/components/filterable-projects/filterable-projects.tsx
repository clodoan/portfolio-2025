"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import ProjectCard from "../project-card/project-card";
import { motion } from "framer-motion";

type Category = "plugins" | "project" | "components" | "random" | "all";

const categories: Record<Category, string> = {
  all: "All",
  project: "Projects",
  plugins: "Plugins",
  components: "Components",
  random: "Random",
};

export type Project = {
  id: string;
  title: string;
  description: string;
  link?: string;
  image?: string;
  category: Category;
};

type FilterableProjectsProps = {
  projects: Project[];
};

const FilterableProjects = ({ projects }: FilterableProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <Tabs.Root
      value={activeFilter}
      onValueChange={(value) => setActiveFilter(value as Category)}
    >
      <Tabs.List className="flex space-x-1 relative">
        {Object.entries(categories).map(([category, label]) => {
          const isActive = category === activeFilter;
          return (
            <Tabs.Trigger key={category} value={category} asChild>
              <div className="px-2 py-1 text-label-1 text-primary rounded-md relative z-10 bg-transparent cursor-pointer isolate hover:text-secondary transition-colors duration-200">
                {isActive && (
                  <motion.div
                    className="absolute size-1 bg-accent rounded-full left-1/2 -translate-x-1/2 -bottom-1"
                    layoutId="activeTab"
                    key={activeFilter}
                    initial={{ y: 0 }}
                    animate={{ y: [0, 3, -3, 1, -1, 0] }}
                    transition={{
                      layout: {
                        duration: 0.3,
                        ease: "easeInOut",
                      },
                      y: {
                        duration: 0.5,
                        ease: "easeInOut",
                      },
                    }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </div>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
      <Tabs.Content value={activeFilter} className="mt-6">
        <div className="flex flex-col gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              link={project.link}
              image={project.image}
            />
          ))}
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default FilterableProjects;
