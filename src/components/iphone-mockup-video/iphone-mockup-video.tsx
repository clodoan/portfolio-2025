"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { cx } from "class-variance-authority";

export type IphoneMockupVideoProps = {
  playbackId: string;
  className?: string;
};

function IphoneMockupVideo({ playbackId, className }: IphoneMockupVideoProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <div
      className={cx(
        "flex justify-center w-full py-5 rounded-2xl overflow-hidden bg-[url('/projects/backgrounds/nature-1.jpg')] bg-cover bg-center bg-no-repeat mx-auto relative",
        className
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-background-secondary">
          <div className="w-full h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background-tertiary/20 to-transparent animate-shimmer" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-tertiary text-center">
                <div className="text-label-2">Loading video...</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="inset-0 z-10 bg-background-secondary h-[480px]">
        <div className="p-2 bg-white/10 rounded-2xl h-full backdrop-blur-md">
          <MuxPlayer
            playbackId={playbackId}
            className="w-full h-full object-cover rounded-xl overflow-hidden"
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            onLoadStart={handleLoadStart}
            onCanPlay={handleCanPlay}
          />
        </div>
      </div>
    </div>
  );
}

export default IphoneMockupVideo;
