import { execSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

// Configuration
const config = {
  // Source directories to process
  sourceDirs: ["public/footprint"],

  // Video optimization options
  video: {
    // CRF (Constant Rate Factor): lower means better quality (18-28 is good range)
    crf: 23,
    // Preset: slower presets give better compression
    preset: "medium", // options: ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow
    // Maximum width for videos (null for no resizing)
    maxWidth: 1920,
    // Maximum height for videos (null for no resizing)
    maxHeight: 1080,
  },

  // File extensions to process
  extensions: {
    videos: [".mp4", ".mov", ".avi", ".webm"],
  },

  // Skip files smaller than this size (in bytes)
  minSizeToProcess: 100 * 1024, // 100KB
};

// Helper to get file size in MB
const getFileSizeMB = async (filePath) => {
  const stats = await fs.stat(filePath);
  return stats.size / (1024 * 1024);
};

// Process a video file
async function optimizeVideo(filePath, outputPath) {
  const originalSize = await getFileSizeMB(filePath);
  console.log(`Processing video: ${filePath} (${originalSize.toFixed(2)} MB)`);

  // Create a temporary file path
  const tempOutputPath = `${outputPath}.temp.mp4`;

  try {
    // Build FFmpeg command
    let ffmpegCommand = `"${ffmpeg}" -i "${filePath}" -c:v libx264 -crf ${config.video.crf} -preset ${config.video.preset}`;

    // Add resize filter if needed
    if (config.video.maxWidth || config.video.maxHeight) {
      ffmpegCommand += ` -vf "scale=${config.video.maxWidth || -1}:${config.video.maxHeight || -1}:force_original_aspect_ratio=decrease"`;
    }

    // Add audio codec and output path
    ffmpegCommand += ` -c:a aac -strict experimental "${tempOutputPath}"`;

    // Execute FFmpeg
    execSync(ffmpegCommand, { stdio: "inherit" });

    // Check if the optimized file is actually smaller
    const tempSize = await getFileSizeMB(tempOutputPath);

    if (tempSize < originalSize) {
      // If the temp file is smaller, replace the original
      await fs.rename(tempOutputPath, outputPath);
      const savings = (
        ((originalSize - tempSize) / originalSize) *
        100
      ).toFixed(2);
      console.log(
        `✅ Optimized: ${filePath} - ${originalSize.toFixed(2)} MB → ${tempSize.toFixed(2)} MB (${savings}% saved)`
      );

      return {
        file: filePath,
        originalSize,
        newSize: tempSize,
        savings: Number.parseFloat(savings),
      };
    }

    // If the temp file is not smaller, keep the original
    await fs.unlink(tempOutputPath);
    console.log(
      `⚠️ Skipped: ${filePath} - Optimized version not smaller than original`
    );

    return {
      file: filePath,
      originalSize,
      newSize: originalSize,
      savings: 0,
    };
  } catch (error) {
    console.error(`❌ Error optimizing video ${filePath}:`, error);

    // Clean up temp file if it exists
    try {
      await fs.access(tempOutputPath);
      await fs.unlink(tempOutputPath);
    } catch {
      // Temp file doesn't exist, ignore
    }

    return {
      file: filePath,
      error: error.message,
    };
  }
}

// Process all files in a directory recursively
async function processDirectory(
  directory,
  results = { success: [], error: [] }
) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(fullPath, results);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        const stats = await fs.stat(fullPath);

        // Skip files smaller than the minimum size
        if (stats.size < config.minSizeToProcess) {
          console.log(
            `Skipping small file: ${fullPath} (${(stats.size / 1024).toFixed(2)} KB)`
          );
          continue;
        }

        // Process only video files
        if (config.extensions.videos.includes(ext)) {
          const result = await optimizeVideo(fullPath, fullPath);

          // Add result to the appropriate array
          if (result.error) {
            results.error.push(result);
          } else {
            results.success.push(result);
          }
        }
      }
    }

    return results;
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
    return results;
  }
}

// Main function
async function main() {
  console.log("🚀 Starting video optimization...");
  console.log("Configuration:", JSON.stringify(config, null, 2));

  const startTime = Date.now();
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let results = { success: [], error: [] };

  // Process each source directory
  for (const sourceDir of config.sourceDirs) {
    console.log(`\nProcessing directory: ${sourceDir}`);
    results = await processDirectory(sourceDir, results);
  }

  // Calculate statistics
  for (const item of results.success) {
    totalOriginalSize += item.originalSize;
    totalNewSize += item.newSize;
  }

  const totalSavings = totalOriginalSize - totalNewSize;
  const savingsPercentage = ((totalSavings / totalOriginalSize) * 100).toFixed(
    2
  );
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  // Print summary
  console.log("\n📊 Optimization Summary:");
  console.log(`Total files processed: ${results.success.length}`);
  console.log(`Failed files: ${results.error.length}`);
  console.log(`Original size: ${totalOriginalSize.toFixed(2)} MB`);
  console.log(`New size: ${totalNewSize.toFixed(2)} MB`);
  console.log(
    `Space saved: ${totalSavings.toFixed(2)} MB (${savingsPercentage}%)`
  );
  console.log(`Time taken: ${duration} seconds`);

  // List errors if any
  if (results.error.length > 0) {
    console.log("\n❌ Errors:");
    for (const item of results.error) {
      console.log(`- ${item.file}: ${item.error}`);
    }
  }
}

// Run the main function
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
