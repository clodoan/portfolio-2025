import Link from "next/link";
import { cx } from "class-variance-authority";
import type {
  ImageCardProps,
  ProjectsIDs,
} from "../../../../projects-section.types";

const getBackgroundImage = (id: ProjectsIDs) => {
  switch (id) {
    case "new-doc-scan":
      return "/projects/backgrounds/nature-3.jpg";
    case "tax-credits":
      return "/projects/backgrounds/nature-5.jpg";
    default:
      return "/projects/backgrounds/nature-1.png";
  }
};

const ImageCard = ({
  id,
  title,
  description,
  link,
  children,
  disabled,
  year,
  company,
}: ImageCardProps) => {
  return (
    <Link
      href={link}
      className={cx(
        "flex flex-col rounded md:rounded-lg overflow-hidden relative border border-tertiary box-border hover:border-primary transition-colors duration-200",
        { "opacity-50 pointer-events-none": disabled }
      )}
      aria-disabled={disabled}
      id={id}
    >
      <div
        className="relative size-full h-[240px] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getBackgroundImage(id as ProjectsIDs)})`,
        }}
      >
        {children}
      </div>
      <div className="absolute inset-0 bg-primary/50" />
      <div className="flex flex-col gap-2 bg-primary p-4">
        <div className="flex justify-between gap-2">
          <h1 className="text-label-1 text-primary">{title}</h1>
          <p className="text-body-2 font-mono text-tertiary">
            {company} <span className="text-tertiary opacity-25">|</span> {year}
          </p>
        </div>
        <p className="text-body-1 text-secondary">{description}</p>
      </div>
    </Link>
  );
};

export default ImageCard;
