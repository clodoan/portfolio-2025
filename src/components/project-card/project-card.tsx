import Image from "next/image";
import Link from "../link";

type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
  image?: string;
  external?: boolean;
};

const ProjectCard = ({
  title,
  description,
  link,
  image,
  external = false,
}: ProjectCardProps) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="size-14 bg-secondary rounded flex-0 p-2">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={100}
            height={100}
            className="flex-0"
          />
        ) : (
          <div className="" />
        )}
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="text-label-1 text-secondary">{title}</h3>
        <p className="text-body-1 text-secondary">{description}</p>
        <Link href={link} size="small" external={external}>
          Learn more
        </Link>
      </div>
    </div>
  );
};
export default ProjectCard;
