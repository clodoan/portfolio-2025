import { Iphone } from "@zuude-ui/ios-mockups";
import MuxPlayer from "@mux/mux-player-react";

export type IphoneMockupVideoProps = {
  playbackId: string;
};

function IphoneMockupVideo({ playbackId }: IphoneMockupVideoProps) {
  return (
    <div className="flex justify-center py-10 rounded-2xl overflow-hidden bg-secondary my-10 mx-auto">
      <Iphone
        size="md"
        style={
          {
            "--dynamic-island-color": "transparent",
          } as React.CSSProperties
        }
      >
        <MuxPlayer
          playbackId={playbackId}
          className="w-full h-full object-cover"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
        />
      </Iphone>
    </div>
  );
}

export default IphoneMockupVideo;
