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

// Optimized image component
const OptimizedImage: React.FC<{ file: MediaFile }> = ({ file }) => {
  const publicPath = `/footprint/${file.path}`;

  return (
    <div className="w-full mb-8 overflow-hidden rounded-lg border border-primary">
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

// Lazy loaded video component using the optimized video component
const LazyVideo: React.FC<{ file: MediaFile }> = ({ file }) => {
  const publicPath = `/footprint/${file.path}`;

  return (
    <div className="w-full mb-8 overflow-hidden rounded-lg border border-primary">
      <OptimizedVideo
        src={publicPath}
        alt={`Video: ${file.name}`}
        className="w-full"
      />
    </div>
  );
};

// Media item component
const MediaItem: React.FC<{ file: MediaFile }> = ({ file }) => {
  return file.type === "image" ? (
    <OptimizedImage file={file} />
  ) : (
    <LazyVideo file={file} />
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
            className="flex items-center justify-center w-10 h-10 rounded transition-colors bg-secondary mb-3 hover:bg-secondary/80 group"
            aria-label="Back to home"
          >
            <ArrowLeftIcon className="w-4 h-4 text-primary group-hover:text-secondary" />
          </Link>
          <div className="flex flex-col gap-8">
            {Array.from({ length: 6 }, () => (
              <div
                key={uniqueId()}
                className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg animate-pulse"
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
          className="flex items-center justify-center w-10 h-10 rounded transition-colors bg-secondary mb-3 hover:bg-secondary/80 group"
          aria-label="Back to home"
        >
          <ArrowLeftIcon className="w-4 h-4 text-primary group-hover:text-secondary" />
        </Link>
        <div className="flex flex-col">
          {mediaFiles.map((file) => (
            <MediaItem key={`${file.path}-${file.name}`} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
}
