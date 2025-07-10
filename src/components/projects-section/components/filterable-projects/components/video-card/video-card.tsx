"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { cx } from "class-variance-authority";

export type VideoCardProps = {
  id: string;
  title: string;
  description: string;
  playbackId: string;
  className?: string;
};

const VideoCard = ({
  id,
  title,
  description,
  playbackId,
  className,
}: VideoCardProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    console.warn("Mux Player error occurred");
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div className="w-full h-full rounded overflow-hidden border border-tertiary bg-background-secondary">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-tertiary text-center">
            <div>Video unavailable</div>
            <div className="text-label-3">{title}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cx(
        "w-full h-full rounded overflow-hidden border border-tertiary relative min-h-[200px]",
        className
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-background-secondary">
          <div className="w-full h-full relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background-tertiary/20 to-transparent animate-shimmer" />
            {/* Loading text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-tertiary text-center">
                <div className="text-label-2">Loading video...</div>
                <div className="text-label-3 mt-1">{title}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <MuxPlayer
        key={id}
        playbackId={playbackId}
        metadata={{
          video_title: title,
          video_description: description,
        }}
        className="w-full h-full object-cover"
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        onError={handleError}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        style={
          {
            "--controls": "none",
            "--media-object-fit": "cover",
            "--media-object-position": "center",
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default VideoCard;
