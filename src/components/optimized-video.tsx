"use client";

import { useEffect, useRef, useState } from "react";
import PlayButton from "./play-button";

interface OptimizedVideoProps {
  src: string;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export default function OptimizedVideo({
  src,
  className = "",
  alt = "Video",
  priority = false,
}: OptimizedVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [priority]);

  const handleCanPlay = () => {
    setIsLoaded(true);
    setShowPlaceholder(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const error = video.error;
    let message = `Failed to load video: ${src}`;

    if (error) {
      switch (error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          message = "Video loading was aborted";
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          message = "Network error while loading video";
          break;
        case MediaError.MEDIA_ERR_DECODE:
          message = "Video decoding error";
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          message = "Video format not supported";
          break;
        default:
          message = `Video error: ${error.message || "Unknown error"}`;
      }
    }

    console.error(message);
    setErrorMessage(message);
    setError(true);
    setShowPlaceholder(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleRetry = () => {
    setError(false);
    setErrorMessage("");
    setIsLoaded(false);
    setShowPlaceholder(true);
    setIsVisible(false);
    setIsPlaying(false);

    // Re-trigger intersection observer
    setTimeout(() => {
      if (containerRef.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          },
          {
            rootMargin: "100px",
            threshold: 0.1,
          }
        );
        observer.observe(containerRef.current);
      }
    }, 100);
  };

  if (error) {
    return (
      <div
        className={`w-full h-64 bg-secondary flex items-center justify-center rounded-lg ${className}`}
      >
        <div className="text-center flex flex-col items-center justify-center">
          <p className="text-tertiary mb-2 text-label-1">{errorMessage}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="px-4 py-2 bg-accent text-text-inverted rounded hover:bg-accent-muted transition-colors text-label-1"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {showPlaceholder && (
        <div className="w-full h-64 bg-secondary rounded-lg overflow-hidden relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-shimmer" />
          <div className="relative z-10 text-tertiary text-label-1">
            Loading video...
          </div>
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
          onCanPlay={handleCanPlay}
          onError={handleError}
          onPlay={handlePlay}
          onPause={handlePause}
          onClick={() => {
            if (videoRef.current?.paused) {
              videoRef.current.play().catch((err) => {
                console.error("Failed to play video:", err);
              });
              setIsPlaying(true);
            }
          }}
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
              if (videoRef.current?.paused) {
                videoRef.current.play().catch((err) => {
                  console.error("Failed to play video:", err);
                });
                setIsPlaying(true);
              }
            }
          }}
        />
      )}

      {/* Always visible play button for iOS */}
      {isLoaded && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <PlayButton
            onClick={(e) => {
              e.stopPropagation();
              if (videoRef.current?.paused) {
                videoRef.current.play().catch((err) => {
                  console.error("Failed to play video:", err);
                });
                setIsPlaying(true);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
