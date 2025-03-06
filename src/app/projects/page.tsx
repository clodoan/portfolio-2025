import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { FC } from "react";
import Link from "next/link";

// Define types for our media files
type MediaType = "image" | "video";
type MediaFile = {
  path: string;
  type: MediaType;
  name: string;
};

// Function to determine if a file is an image or video based on extension
const getMediaType = (filename: string): MediaType => {
  const ext = path.extname(filename).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(ext)
    ? "image"
    : "video";
};

// Function to get all media files from a directory recursively
async function getMediaFiles(dir: string, baseDir = "") {
  const mediaFiles: MediaFile[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await getMediaFiles(fullPath, relativePath);
      mediaFiles.push(...nestedFiles);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (
        [".mp4", ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(ext)
      ) {
        mediaFiles.push({
          path: relativePath,
          type: getMediaType(entry.name),
          name: entry.name,
        });
      }
    }
  }

  return mediaFiles;
}

// Media item component
const MediaItem: FC<{ file: MediaFile }> = ({ file }) => {
  const publicPath = `/footprint/${file.path}`;

  return (
    <div className="w-full mb-8 overflow-hidden rounded-lg border border-primary">
      {file.type === "image" ? (
        <div className="relative w-full">
          <Image
            src={publicPath}
            alt={`Media file: ${file.name}`}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority={false}
          />
        </div>
      ) : (
        <video
          src={publicPath}
          className="w-full h-auto"
          muted
          playsInline
          loop
          autoPlay
        />
      )}
    </div>
  );
};

export default async function ProjectsPage() {
  const mediaFiles = await getMediaFiles(
    path.join(process.cwd(), "public/footprint")
  );

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto relative">
        <Link
          href="/"
          className="absolute -left-12 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          aria-label="Back to home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <title>Back arrow</title>
            <path d="m15 18-6-6 6-6" />
          </svg>
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
