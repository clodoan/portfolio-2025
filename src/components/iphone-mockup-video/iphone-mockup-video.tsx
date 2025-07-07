"use client";

import { Iphone } from "@zuude-ui/ios-mockups";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";

export type IphoneMockupVideoProps = {
  playbackId: string;
};

function IphoneMockupVideo({ playbackId }: IphoneMockupVideoProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center py-10 rounded-2xl overflow-hidden bg-secondary my-10 mx-auto">
      <Iphone
        size="md"
        style={
          {
            "--dynamic-island-color": "transparent",
            "--screen-color": "transparent",
          } as React.CSSProperties
        }
      >
        <div className="relative w-full h-full">
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

          <MuxPlayer
            playbackId={playbackId}
            className="w-full h-full object-cover"
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            onLoadStart={handleLoadStart}
            onCanPlay={handleCanPlay}
          />
        </div>
      </Iphone>
    </div>
  );
}

export default IphoneMockupVideo;
