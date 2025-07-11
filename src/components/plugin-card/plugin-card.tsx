"use client";

import {
  ArrowUpRightIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import { cx } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

export type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  link?: string;
  image?: string;
  disabled?: boolean;
};

const PluginCard = ({
  id,
  title,
  description,
  link,
  image,
  disabled,
}: ProjectCardProps) => {
  const href = link || `/projects/${id}`;
  const isExternal = !!link;

  const cardContent = (
    <div
      className={cx(
        "relative flex flex-col border border-tertiary rounded-t overflow-hidden",
        disabled ? "rounded-b" : "rounded"
      )}
    >
      {disabled && (
        <div className="bg-quaternary text-label-2 px-2 py-0.5 text-tertiary border-b border-tertiary flex items-center gap-2">
          <CursorArrowRaysIcon className="size-4" />
          Work in progress
        </div>
      )}

      <div
        className={cx(
          "group flex gap-4 items-start p-4 relative transition-colors",
          disabled
            ? "opacity-50 cursor-default pointer-events-none select-none"
            : "cursor-pointer hover:bg-secondary/50 hover:border-primary"
        )}
      >
        <ArrowUpRightIcon className="size-4 text-accent absolute top-2 right-2 opacity-0 group-hover:opacity-70 transition-opacity" />
        <div className="size-8 bg-secondary rounded overflow-hidden shadow-inner mt-0.5">
          {image && (
            <Image
              src={image}
              alt={title}
              width={400}
              height={400}
              className="object-contain"
            />
          )}
        </div>
        <div className="flex flex-col flex-1 text-left">
          <h3 className="text-label-1 text-primary">{title}</h3>
          <p className="text-body-1 text-secondary">{description}</p>
        </div>
      </div>
    </div>
  );

  return isExternal ? (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx({ "pointer-events-none": disabled })}
    >
      {cardContent}
    </Link>
  ) : (
    <Link href={href}>{cardContent}</Link>
  );
};

export default PluginCard;
