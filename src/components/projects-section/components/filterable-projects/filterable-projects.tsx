"use client";

import { useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import ProjectCard from "../project-card/project-card";
import { motion, useMotionValueEvent } from "framer-motion";
import { useScroll } from "motion/react";
import { cva, cx } from "class-variance-authority";

type Category = "plugins" | "project" | "all";
type OverflowSide = "left" | "right" | "both" | "none";

const categories: Record<Category, string> = {
  all: "All",
  project: "Projects",
  plugins: "Plugins",
  // components: "Components",
  // random: "Random",
};

export type Project = {
  id: string;
  title: string;
  description: string;
  link?: string;
  image?: string;
  category: Category;
  disabled?: boolean;
};

type FilterableProjectsProps = {
  projects: Project[];
};

const tabsListVariants = cva(
  "flex relative max-w-full overflow-x-auto py-2 scrollbar-hide scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent",
  {
    variants: {
      overflowSide: {
        none: "",
        left: "border-l border-l-tertiary",
        right: "border-r border-r-tertiary",
        both: "border-l border-l-tertiary border-r border-r-tertiary",
      },
    },
    defaultVariants: {
      overflowSide: "none",
    },
  }
);

const FilterableProjects = ({ projects }: FilterableProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const [overflowSide, setOverflowSide] = useState<OverflowSide>("none");

  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    const containerWidth = containerRef.current?.getBoundingClientRect().width;
    const contentWidth = contentRef.current?.getBoundingClientRect().width;
    const hasOverflow =
      containerWidth && contentWidth && containerWidth < contentWidth;

    if (hasOverflow) {
      if (value <= 0.1) {
        setOverflowSide("right");
      } else if (value >= 0.9) {
        setOverflowSide("left");
      } else {
        setOverflowSide("both");
      }
    } else {
      setOverflowSide("none");
    }
  });

  return (
    <Tabs.Root
      value={activeFilter}
      onValueChange={(value) => setActiveFilter(value as Category)}
      className="flex flex-col"
    >
      <Tabs.List
        ref={containerRef}
        className={cx(tabsListVariants({ overflowSide }))}
      >
        <div ref={contentRef} className="w-fit flex space-x-1">
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
        </div>
      </Tabs.List>
      <Tabs.Content value={activeFilter} asChild>
        <div className="flex flex-col gap-3 mt-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              link={project.link}
              image={project.image}
              disabled={project.disabled}
            />
          ))}
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default FilterableProjects;
