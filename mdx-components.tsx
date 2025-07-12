import type { MDXComponents } from "mdx/types";

import CustomLink from "@/components/custom-link";
import Divider from "@/components/divider";
import ProjectCard, {
  type ProjectCardProps,
} from "@/components/project-card/project-card";
import Image, { type ImageProps } from "next/image";
import Paragraph, { type ParagraphProps } from "@/components/paragraph";
import FramedImage, { type FramedImageProps } from "@/components/framed-image";
import ExpandableImage, {
  type ExpandableImageProps,
} from "@/components/expandable-image";
import Covers, {
  type CoversProps,
} from "@/components/project-card/components/covers";
import VideoCard, { type VideoCardProps } from "@/components/video-card";
import IphoneMockupVideo, {
  type IphoneMockupVideoProps,
} from "@/components/iphone-mockup-video";
import IphoneMockupImage, {
  type IphoneMockupImageProps,
} from "@/components/iphone-mockup-image";
import ResponsiveGrid, {
  type ResponsiveGridProps,
} from "@/components/responsive-grid";

export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override specific components to match design system
    h1: ({ children }) => <h1 className="text-label-1">{children}</h1>,
    h2: ({ children }) => <h2 className="text-label-1">{children}</h2>,
    h3: ({ children }) => (
      <h3 className="text-label-2 text-secondary">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-body-1 text-secondary">{children}</p>
    ),
    a: ({ href, children, target, rel, ...props }) => (
      <CustomLink
        href={href}
        target={target}
        rel={rel}
        {...props}
        className="text-accent underline transition-colors hover:text-primary"
      >
        {children}
      </CustomLink>
    ),
    // Use the default components with any custom components (after our overrides)
    ...components,
    Divider: () => <Divider />,
    ProjectMeta: ({ children }: { children: React.ReactNode }) => (
      <div className="flex flex-wrap gap-1 mt-2">{children}</div>
    ),
    Paragraph: ({ children, className }: ParagraphProps) => (
      <Paragraph className={className}>{children}</Paragraph>
    ),
    Image: ({ src, alt, width, height, className }: ImageProps) => (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    ),
    FramedImage: ({ children, backgroundImage }: FramedImageProps) => (
      <FramedImage backgroundImage={backgroundImage}>{children}</FramedImage>
    ),
    ExpandableImage: ({ image }: ExpandableImageProps) => (
      <ExpandableImage image={image} />
    ),
    ProjectCard: ({
      id,
      company,
      link,
      children,
      disabled,
      backgroundImage,
      title,
      description,
      year,
    }: ProjectCardProps) => (
      <ProjectCard
        id={id}
        company={company}
        link={link}
        disabled={disabled}
        backgroundImage={backgroundImage}
        title={title}
        description={description}
        year={year}
      >
        {children}
      </ProjectCard>
    ),
    Covers: ({ id }: CoversProps) => <Covers id={id} />,
    VideoCard: ({
      id,
      title,
      description,
      playbackId,
      className,
    }: VideoCardProps) => (
      <VideoCard
        id={id}
        title={title}
        description={description}
        playbackId={playbackId}
        className={className}
      />
    ),
    IphoneMockupVideo: ({ playbackId, className }: IphoneMockupVideoProps) => (
      <IphoneMockupVideo playbackId={playbackId} className={className} />
    ),
    IphoneMockupImage: ({
      src,
      alt,
      width,
      height,
      className,
      backgroundImage,
    }: IphoneMockupImageProps) => (
      <IphoneMockupImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        backgroundImage={backgroundImage}
      />
    ),
    ResponsiveGrid: ({ children, columns, className }: ResponsiveGridProps) => (
      <ResponsiveGrid columns={columns} className={className}>
        {children}
      </ResponsiveGrid>
    ),
  };
}
