import Image from "next/image";
import { cx } from "class-variance-authority";

export type IphoneMockupImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  backgroundImage?: string;
};

function IphoneMockupImage({
  src,
  alt,
  width = 375,
  height = 480,
  className,
  backgroundImage = "/projects/backgrounds/nature-1.jpg",
}: IphoneMockupImageProps) {
  return (
    <div
      className={cx(
        "inset-0 z-10 relative rounded-2xl overflow-hidden flex-1 min-w-0 max-w-full bg-cover bg-center bg-no-repeat",
        className
      )}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="p-2 bg-background-secondary h-full backdrop-blur-md overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-contain overflow-hidden rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}

export default IphoneMockupImage;
