import { readdir } from "node:fs/promises";
import { exec } from "node:child_process";
import { join, extname, basename, dirname } from "node:path";

const VIDEO_ROOT = "./public/footprint";

async function getAllVideoFiles(dir) {
  let files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await getAllVideoFiles(fullPath));
    } else if (extname(entry.name).toLowerCase() === ".mp4") {
      files.push(fullPath);
    }
  }
  return files;
}

async function generateThumbnail(videoPath) {
  const thumbPath = join(
    dirname(videoPath),
    `${basename(videoPath, ".mp4")}-thumbnail.jpg`
  );
  return new Promise((resolve, reject) => {
    exec(
      `ffmpeg -y -ss 00:00:00.500 -i "${videoPath}" -frames:v 1 -q:v 2 "${thumbPath}"`,
      (err, stdout, stderr) => {
        if (err) {
          console.error(`Failed for ${videoPath}:`, stderr);
          reject(err);
        } else {
          console.log(`Generated thumbnail: ${thumbPath}`);
          resolve(thumbPath);
        }
      }
    );
  });
}

(async () => {
  const videos = await getAllVideoFiles(VIDEO_ROOT);
  for (const video of videos) {
    await generateThumbnail(video);
  }
})();
