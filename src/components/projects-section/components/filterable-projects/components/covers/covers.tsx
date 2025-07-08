"use client";

import Image from "next/image";
import type { DesignProjectId } from "../image-card/image-card";

type CoversProps = {
  image: string;
  id: DesignProjectId;
};

const Covers = ({ image, id }: CoversProps) => {
  if (id === "tax-credits") {
    return (
      <div className="absolute overflow-hidden top-2 isolate p-2 w-[calc(100%-16px)] left-1/2 -translate-x-1/2 bg-white/10 rounded-2xl backdrop-blur-sm shadow-md">
        <Image
          src={image}
          alt={id}
          width={600}
          height={600}
          className="z-10 relative rounded bg-primary shadow-md"
          priority
        />
      </div>
    );
  }

  return (
    <div className="absolute w-[240px] overflow-hidden bottom-4 left-1/2 -translate-x-1/2 isolate p-2 bg-white/10 rounded-2xl backdrop-blur-sm shadow-md">
      <Image
        src={image}
        alt={id}
        width={600}
        height={600}
        className="z-10 relative rounded-xl bg-primary shadow-md"
        priority
      />
    </div>
  );
};

export default Covers;
