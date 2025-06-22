import { execSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import ffmpeg from "ffmpeg-static";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";
import sharp from "sharp";

// Configuration
const config = {
  // Source directories to process
  sourceDirs: ["public/footprint", "public/home"],

  // Output directory (same as source for in-place optimization)
  // You can change this to create optimized copies instead of replacing
  outputDir: null, // null means in-place optimization

  // Image optimization options
  image: {
    // JPEG compression quality (0-100)
    jpegQuality: 80,
    // PNG compression quality (0-1)
    pngQuality: [0.6, 0.8],
    // Convert images to WebP?
    convertToWebP: false,
    // WebP compression quality (0-100)
    webpQuality: 80,
    // Maximum width for images (null for no resizing)
    maxWidth: null,
    // Maximum height for images (null for no resizing)
    maxHeight: null,
  },

  // Video optimization options
  video: {
    // CRF (Constant Rate Factor): lower means better quality (18-28 is good range)
    crf: 23,
    // Preset: slower presets give better compression
    preset: "medium", // options: ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow
    // Maximum width for videos (null for no resizing)
    maxWidth: null,
    // Maximum height for videos (null for no resizing)
    maxHeight: null,
  },

  // File extensions to process
  extensions: {
    images: [".jpg", ".jpeg", ".png", ".gif"],
    videos: [".mp4", ".mov", ".avi", ".webm"],
  },

  // Skip files smaller than this size (in bytes)
  minSizeToProcess: 50 * 1024, // 50KB
};

// Helper to get file size in MB
const getFileSizeMB = async (filePath) => {
  const stats = await fs.stat(filePath);
  return stats.size / (1024 * 1024);
};

// Process an image file
async function optimizeImage(filePath, outputPath) {
  const ext = path.extname(filePath).toLowerCase();
  const originalSize = await getFileSizeMB(filePath);

  console.log(`Processing image: ${filePath} (${originalSize.toFixed(2)} MB)`);

  try {
    // Use imagemin for better compression
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      const plugins = [];

      if (ext === ".jpg" || ext === ".jpeg") {
        plugins.push(imageminMozjpeg({ quality: config.image.jpegQuality }));
      } else if (ext === ".png") {
        plugins.push(imageminPngquant({ quality: config.image.pngQuality }));
      }

      // Read the file
      const fileBuffer = await fs.readFile(filePath);

      // Process with sharp for resizing if needed
      let processedBuffer = fileBuffer;
      if (config.image.maxWidth || config.image.maxHeight) {
        const image = sharp(fileBuffer);
        const metadata = await image.metadata();

        if (
          (config.image.maxWidth && metadata.width > config.image.maxWidth) ||
          (config.image.maxHeight && metadata.height > config.image.maxHeight)
        ) {
          processedBuffer = await image
            .resize({
              width: config.image.maxWidth || undefined,
              height: config.image.maxHeight || undefined,
              fit: "inside",
              withoutEnlargement: true,
            })
            .toBuffer();
        }
      }

      // Compress with imagemin
      const optimizedBuffer = await imagemin.buffer(processedBuffer, {
        plugins,
      });

      // Write the optimized file
      await fs.writeFile(outputPath, optimizedBuffer);

      // Convert to WebP if enabled
      if (config.image.convertToWebP) {
        const webpOutputPath = outputPath.replace(ext, ".webp");
        const webpBuffer = await imagemin.buffer(processedBuffer, {
          plugins: [imageminWebp({ quality: config.image.webpQuality })],
        });
        await fs.writeFile(webpOutputPath, webpBuffer);
      }
    } else {
      // For other image formats, use sharp directly
      // Create a temporary file path for GIF files to avoid the "Cannot use same file for input and output" error
      const tempOutputPath = `${outputPath}.temp${path.extname(outputPath)}`;

      let image = sharp(filePath);

      if (config.image.maxWidth || config.image.maxHeight) {
        image = image.resize({
          width: config.image.maxWidth || undefined,
          height: config.image.maxHeight || undefined,
          fit: "inside",
          withoutEnlargement: true,
        });
      }

      // Write to the temporary file first
      await image.toFile(tempOutputPath);

      // Replace the original file with the temporary file
      await fs.rename(tempOutputPath, outputPath);
    }

    const newSize = await getFileSizeMB(outputPath);
    const savings = (((originalSize - newSize) / originalSize) * 100).toFixed(
      2
    );
    console.log(
      `✅ Optimized: ${filePath} - ${originalSize.toFixed(2)} MB → ${newSize.toFixed(2)} MB (${savings}% saved)`
    );

    return {
      file: filePath,
      originalSize,
      newSize,
      savings: Number.parseFloat(savings),
    };
  } catch (error) {
    console.error(`❌ Error optimizing image ${filePath}:`, error);
    return {
      file: filePath,
      error: error.message,
    };
  }
}

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

        // Determine output path
        const outputPath = config.outputDir
          ? path.join(
              config.outputDir,
              path.relative(config.sourceDirs[0], fullPath)
            )
          : fullPath;

        // Create output directory if it doesn't exist
        if (config.outputDir) {
          const outputDir = path.dirname(outputPath);
          await fs.mkdir(outputDir, { recursive: true });
        }

        // Process based on file type
        let result;
        if (config.extensions.images.includes(ext)) {
          result = await optimizeImage(fullPath, outputPath);
        } else if (config.extensions.videos.includes(ext)) {
          result = await optimizeVideo(fullPath, outputPath);
        } else {
          // Skip unsupported file types
          continue;
        }

        // Add result to the appropriate array
        if (result.error) {
          results.error.push(result);
        } else {
          results.success.push(result);
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
  console.log("🚀 Starting media optimization...");
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
