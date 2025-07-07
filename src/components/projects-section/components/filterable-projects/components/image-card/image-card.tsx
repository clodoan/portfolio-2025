import Link from "next/link";
import { cx } from "class-variance-authority";

type ImageCardProps = {
  id: string;
  title: string;
  description: string;
  link: string;
  children: React.ReactNode;
  disabled: boolean;
};

const getBackgroundImage = (id: string) => {
  switch (id) {
    case "new-doc-scan":
      return "/projects/backgrounds/nature-3.jpg";
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
}: ImageCardProps) => {
  return (
    <Link
      href={link}
      className={cx(
        "flex flex-col rounded-lg overflow-hidden relative border border-tertiary box-border hover:border-primary transition-colors duration-200",
        { "opacity-50 pointer-events-none": disabled }
      )}
      aria-disabled={disabled}
      id={id}
    >
      <div
        className="relative size-full h-[240px] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getBackgroundImage(id)})`,
        }}
      >
        {children}
      </div>
      <div className="absolute inset-0 bg-primary/50" />
      <div className="flex flex-col gap-2 bg-primary p-4">
        <h1 className="text-label-1 text-primary">{title}</h1>
        <p className="text-body-1 text-secondary">{description}</p>
      </div>
    </Link>
  );
};

export default ImageCard;
