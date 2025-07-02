import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    const mediaFiles = await getMediaFiles(
      path.join(process.cwd(), "public/footprint")
    );

    return NextResponse.json(mediaFiles);
  } catch (error) {
    console.error("Error fetching media files:", error);
    return NextResponse.json(
      { error: "Failed to fetch media files" },
      { status: 500 }
    );
  }
}
