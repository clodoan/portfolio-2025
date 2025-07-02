"use client";

import { useEffect, useRef, useState } from "react";

interface OptimizedVideoProps {
  src: string;
  className?: string;
  alt?: string;
}

export default function OptimizedVideo({
  src,
  className = "",
  alt = "Video",
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px", // Start loading 300px before the video comes into view
        threshold: 0.1,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      // Only load metadata initially to save bandwidth
      videoRef.current.load();
    }
  }, [isVisible]);

  const handleLoadedMetadata = () => {
    // Video metadata is loaded, but we don't show it yet
    if (videoRef.current) {
      // Create a poster from the first frame
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx && videoRef.current.videoWidth > 0) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0);

        // Set the poster
        videoRef.current.poster = canvas.toDataURL("image/jpeg", 0.8);
      }
    }
  };

  const handleCanPlay = () => {
    setIsLoaded(true);
    setShowPlaceholder(false);
  };

  const handleError = () => {
    console.error(`Failed to load video: ${src}`);
    setError(true);
    setShowPlaceholder(false);
  };

  const handleClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  };

  if (error) {
    return (
      <div
        className={`w-full h-64 bg-secondary flex items-center justify-center rounded-lg ${className}`}
      >
        <div className="text-center">
          <p className="text-tertiary">Failed to load video</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-accent text-text-inverted rounded hover:bg-accent-muted"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Placeholder */}
      {showPlaceholder && (
        <div className="w-full h-64 bg-primary rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-shimmer" />
          <div className="w-full h-full bg-primary" />
        </div>
      )}

      {/* Video */}
      {isVisible && (
        <video
          ref={videoRef}
          src={src}
          className={`w-full h-auto transition-opacity duration-500 cursor-pointer ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          muted
          playsInline
          loop
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={handleCanPlay}
          onError={handleError}
          onClick={handleClick}
          // Performance optimizations
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          // Accessibility
          aria-label={alt}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
        />
      )}

      {/* Play button overlay */}
      {isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-primary bg-opacity-50 rounded-full p-3 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
            <svg
              className="w-8 h-8 text-text-inverted"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
