"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";

const VideoCard = ({
  id,
  title,
  description,
  playbackId,
}: { id: string; title: string; description: string; playbackId: string }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    console.warn("Mux Player error occurred");
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="w-full h-full rounded overflow-hidden border border-tertiary bg-background-secondary animate-pulse">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-tertiary">Loading video...</div>
        </div>
      </div>
    );
  }

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
    <div className="w-full h-full rounded overflow-hidden border border-tertiary relative">
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
