import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/16/solid";

export type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
  image?: string;
  onClick?: () => void;
};

const ProjectCard = ({
  title,
  description,
  link,
  image,
  onClick,
}: ProjectCardProps) => {
  const commonStyles =
    "flex gap-4 items-start hover:bg-secondary/50 transition-colors p-4 rounded-lg border border-tertiary hover:border-primary relative group";

  const Icon = external ? ArrowUpRightIcon : ArrowsPointingOutIcon;

  const children = (
    <>
      <Icon className="size-4 text-accent absolute top-2 right-2 opacity-0 group-hover:opacity-70 transition-opacity" />
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
      <div className="flex flex-col flex-1">
        <h3 className="text-label-1 text-primary">{title}</h3>
        <p className="text-body-1 text-secondary">{description}</p>
      </div>
    </>
  );

  if (link) {
    return (
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={commonStyles}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={commonStyles}>
      {children}
    </button>
  );
};
export default ProjectCard;
