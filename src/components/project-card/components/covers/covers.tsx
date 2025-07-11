"use client";

import Image from "next/image";
import type { ProjectID } from "../../project-card";
import { DesignSystemIcon } from "./design-system-icon";

export type CoversProps = {
  id: ProjectID;
};

const Covers = ({ id }: CoversProps) => {
  if (id === "new-doc-scan") {
    return (
      <div className="absolute overflow-hidden bottom-2 isolate p-2 left-1/2 -translate-x-1/2 bg-white/10 rounded-3xl backdrop-blur-sm shadow-md">
        <Image
          src="/projects/id-doc/status-sheet.png"
          alt={id}
          width={600}
          height={600}
          className="z-10 relative rounded-2xl bg-white/50 shadow-md"
          priority
        />
      </div>
    );
  }
  if (id === "website") {
    return (
      <div className="relative isolate z-10 inset-0">
        <div className="absolute w-full max-w-[90%] overflow-hidden top-4 left-1/2 -translate-x-1/2 isolate p-2 bg-white/10 rounded-2xl backdrop-blur-sm shadow-md">
          <Image
            src="/projects/footprint/website/cover.jpg"
            alt={id}
            width={600}
            height={600}
            className="relative rounded-md bg-primary shadow-md"
            priority
          />
        </div>
      </div>
    );
  }
  if (id === "design-system") {
    return (
      <div className="absolute overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 bg-white/10 text-white rounded-3xl backdrop-blur-sm shadow-md">
        <DesignSystemIcon />
      </div>
    );
  }
  return null;
};

export default Covers;
