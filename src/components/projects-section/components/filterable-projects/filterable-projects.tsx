"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { cva, cx } from "class-variance-authority";
import { motion, useMotionValueEvent } from "framer-motion";
import { useScroll } from "motion/react";
import { useQueryState } from "nuqs";
import { useRef, useState } from "react";
import VideoCard from "./components/video-card/video-card";
import PluginCard from "./components/plugin-card/plugin-card";
import ImageCard from "./components/image-card/image-card";
import Covers from "./components/covers/covers";
import type {
  Category,
  OverflowSide,
  Project,
  FilterableProjectsProps,
} from "../../projects-section.types";

const categories: Record<Category, string> = {
  // all: "All",  // TODO: add back when we have more projects
  design: "Design",
  designCode: "Design + Code",
  plugins: "Figma Plugins",
  // random: "Random",
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
  const [activeFilter, setActiveFilter] = useQueryState("tab", {
    defaultValue: "design",
  });

  const currentFilter: Category = (activeFilter as Category) || "design";

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const filteredProjects = projects.filter(
    (project) => project.category === currentFilter
  );

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

  const renderProjectCard = (project: Project) => {
    const {
      id,
      title,
      description,
      link,
      mediaAsset,
      category,
      disabled,
      year,
      company,
    } = project;

    const cardComponents = {
      designCode: (
        <VideoCard
          key={id}
          id={id}
          title={title}
          description={description}
          playbackId={mediaAsset || ""}
        />
      ),
      plugins: (
        <PluginCard
          key={id}
          id={id}
          title={title}
          description={description}
          link={link}
          image={mediaAsset}
          disabled={disabled}
        />
      ),
      design: (
        <ImageCard
          key={id}
          id={id}
          title={title}
          description={description}
          link={link || ""}
          disabled={disabled || false}
          year={year}
          company={company}
        >
          <Covers image={mediaAsset || ""} id={id} />
        </ImageCard>
      ),
    };

    return cardComponents[category] || cardComponents.design;
  };

  return (
    <Tabs.Root
      value={currentFilter}
      onValueChange={(value) => setActiveFilter(value)}
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
                      key={currentFilter}
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
      <Tabs.Content value={currentFilter} asChild>
        <div className="flex flex-col gap-3 mt-3">
          {filteredProjects.map(renderProjectCard)}
          {currentFilter === "design" && (
            <div className="flex flex-col gap-3 text-label-1 text-primary text-center bg-quaternary rounded-md p-4">
              <span className="text-label-2 text-tertiary select-none">
                More projects coming soon...
              </span>
            </div>
          )}
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default FilterableProjects;
