"use client";

import Image from "next/image";

const OVERFLOW_SIZE = 10;

type CoversProps = {
  image: string;
  id: string;
};

const Covers = ({ image, id }: CoversProps) => {
  return (
    <div className="absolute w-[240px] bottom-4 left-1/2 -translate-x-1/2 isolate shadow-md">
      <div
        style={{
          width: `calc(240px + ${2 * OVERFLOW_SIZE}px)`,
          height: `calc(240px + ${2 * OVERFLOW_SIZE}px)`,
          left: `-${OVERFLOW_SIZE}px`,
          bottom: `-${OVERFLOW_SIZE}px`,
        }}
        className="absolute bg-primary z-0 rounded-2xl opacity-20 backdrop-blur-md"
      />
      <Image
        src={image}
        alt={id}
        width={600}
        height={600}
        className="object-cover rounded-xl overflow-hidden z-10 relative shadow-md"
        priority
      />
    </div>
  );
};

export default Covers;
