"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";

export type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  link?: string;
  image?: string;
};

const ProjectCard = ({
  id,
  title,
  description,
  link,
  image,
}: ProjectCardProps) => {
  const isExternal = !!link;
  const href = link || `/projects/${id}`;

  const children = (
    <div className="cursor-pointer group flex gap-4 items-start hover:bg-secondary/50 transition-colors p-4 rounded-lg border border-tertiary hover:border-primary relative">
      <ArrowUpRightIcon className="size-4 text-accent absolute top-2 right-2 opacity-0 group-hover:opacity-70 transition-opacity" />
      <div className="size-12 bg-secondary rounded flex-0 p-1">
        {image && (
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
            className="object-contain p-[1px]"
          />
        )}
      </div>
      <div className="flex flex-col flex-1 text-left">
        <h3 className="text-label-1 text-primary">{title}</h3>
        <p className="text-body-1 text-secondary">{description}</p>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    );
  }

  return <Link href={href}>{children}</Link>;
};

export default ProjectCard;
