import Link from "next/link";
import { cx } from "class-variance-authority";

export type ProjectID = "new-doc-scan" | "website";

export type ProjectCardProps = {
  id: ProjectID;
  company?: string;
  link: string;
  children: React.ReactNode;
  disabled?: boolean;
  backgroundImage: string;
  title: string;
  description: string;
  year: string;
};

const ProjectCard = ({
  id,
  link,
  children,
  disabled,
  backgroundImage,
  title,
  description,
  year,
}: ProjectCardProps) => {
  return (
    <Link
      href={link}
      className={cx(
        "flex flex-col relative box-border group isolate transition-all duration-200 rounded-lg",
        {
          "opacity-50 pointer-events-none": disabled,
        }
      )}
      aria-disabled={disabled}
      id={id}
    >
      <div
        className="relative size-full h-[240px] overflow-hidden bg-cover bg-center bg-no-repeat rounded-lg z-10 box-content group-hover:shadow-sm group-hover:scale-[1.01] group-hover:translate-y-[-2px] transition-all duration-200"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 z-10">{children}</div>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <h3 className="text-label-1 text-primary flex items-center gap-2">
          {title}
          <span className="text-body-1 text-secondary">({year})</span>
        </h3>
        <p className="text-body-1 text-secondary">{description}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
