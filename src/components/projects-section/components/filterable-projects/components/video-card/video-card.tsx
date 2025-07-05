import MuxPlayer from "@mux/mux-player-react";

const VideoCard = ({
  id,
  title,
  description,
  playbackId,
}: { id: string; title: string; description: string; playbackId: string }) => (
  <MuxPlayer
    key={id}
    playbackId={playbackId}
    metadata={{
      video_title: title,
      video_description: description,
    }}
    className="w-full h-full rounded overflow-hidden border border-tertiary"
    autoPlay={true}
    muted={true}
    loop={true}
    playsInline={true}
    style={
      {
        "--controls": "none",
      } as React.CSSProperties
    }
  />
);

export default VideoCard;
