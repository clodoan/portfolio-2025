"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import OptimizedVideo from "@/components/optimized-video";
import uniqueId from "lodash/uniqueId";

type MediaType = "image" | "video";
type MediaFile = {
  path: string;
  type: MediaType;
  name: string;
};

const OptimizedImage: React.FC<{ file: MediaFile }> = ({ file }) => {
  const publicPath = `/footprint/${file.path}`;

  return (
    <div className="w-full mb-8 overflow-hidden rounded-lg">
      <div className="relative w-full">
        <Image
          src={publicPath}
          alt={`Media file: ${file.name}`}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          className="w-full h-auto"
          priority={false}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
    </div>
  );
};

const getPosterPath = (file: MediaFile) => {
  if (file.type === "video") {
    // Replace .mp4 with -thumbnail.jpg
    return `/footprint/${file.path.replace(/\.mp4$/, "-thumbnail.jpg")}`;
  }
  return undefined;
};

const LazyVideo: React.FC<{ file: MediaFile; priority?: boolean }> = ({
  file,
  priority,
}) => {
  const publicPath = `/footprint/${file.path}`;
  const posterPath = getPosterPath(file);

  return (
    <div className="w-full mb-8 overflow-hidden rounded-lg border border-primary">
      <OptimizedVideo
        src={publicPath}
        alt={`Video: ${file.name}`}
        className="w-full"
        priority={priority}
        poster={posterPath}
      />
    </div>
  );
};

// Media item component
const MediaItem: React.FC<{ file: MediaFile; priority?: boolean }> = ({
  file,
  priority,
}) => {
  return file.type === "image" ? (
    <OptimizedImage file={file} />
  ) : (
    <LazyVideo file={file} priority={priority} />
  );
};

// Projects page component
export default function ProjectsPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch media files from API route
    const fetchMediaFiles = async () => {
      try {
        const response = await fetch("/api/media-files");
        if (response.ok) {
          const files = await response.json();
          setMediaFiles(files);
        } else {
          console.error("Failed to fetch media files");
        }
      } catch (error) {
        console.error("Error fetching media files:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaFiles();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto relative">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded transition-colors bg-secondary mb-3 hover:bg-tertiary group"
            aria-label="Back to home"
          >
            <ArrowLeftIcon className="w-4 h-4 text-secondary group-hover:text-primary" />
          </Link>
          <div className="flex flex-col gap-8">
            {Array.from({ length: 6 }, () => (
              <div
                key={uniqueId()}
                className="w-full h-64 bg-secondary rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto relative">
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded transition-colors bg-secondary mb-3 hover:bg-tertiary group"
          aria-label="Back to home"
        >
          <ArrowLeftIcon className="w-4 h-4 text-secondary group-hover:text-primary" />
        </Link>
        <div className="flex flex-col">
          {mediaFiles.map((file, idx) => (
            <MediaItem
              key={`${file.path}-${file.name}`}
              file={file}
              priority={idx === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
