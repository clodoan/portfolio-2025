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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // Reduced from 300px for faster loading
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

  const handleClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch((err) => {
          console.error("Failed to play video:", err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleRetry = () => {
    setError(false);
    setErrorMessage("");
    setIsLoaded(false);
    setShowPlaceholder(true);
    setIsVisible(false);

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
        <div className="text-center">
          <p className="text-tertiary mb-2">{errorMessage}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="px-4 py-2 bg-accent text-text-inverted rounded hover:bg-accent-muted transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Placeholder */}
      {showPlaceholder && (
        <div className="w-full h-64 bg-primary rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-shimmer" />
          <div className="w-full h-full bg-primary flex items-center justify-center">
            <div className="text-tertiary">Loading video...</div>
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
          preload="auto"
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
