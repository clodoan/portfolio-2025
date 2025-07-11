"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { cx } from "class-variance-authority";

export type VideoCardProps = {
  playbackId: string;
  id?: string;
  title?: string;
  description?: string;
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

  const handleError = () => {
    console.warn("Mux Player error occurred");
    setHasError(true);
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
        "w-full h-full rounded-lg overflow-hidden relative aspect-video outline outline-tertiary",
        className
      )}
    >
      <MuxPlayer
        key={id}
        playbackId={playbackId}
        metadata={{
          video_title: title,
          video_description: description,
        }}
        className="w-full h-full object-cover rounded-lg overflow-hidden"
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        onError={handleError}
      />
    </div>
  );
};

export default VideoCard;
