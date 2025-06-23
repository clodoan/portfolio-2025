import { cx } from "class-variance-authority";

type ProgressRingProps = {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
};

const ProgressRing = ({ progress, className }: ProgressRingProps) => {
  const diameter = 20;
  const radius = diameter / 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg
      width={diameter}
      height={diameter}
      className={cx("transform -rotate-90", className)}
      viewBox={`0 0 ${diameter} ${diameter}`}
      role="img"
      aria-label={`Progress: ${Math.round(progress * 100)}%`}
    >
      <title>Progress: {Math.round(progress * 100)}%</title>
      <circle
        cx={diameter / 2}
        cy={diameter / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={4}
        fill="none"
        opacity="0.2"
        className="transition-opacity duration-200"
      />
      <circle
        cx={diameter / 2}
        cy={diameter / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        className="transition-all duration-300 ease-out"
      />
    </svg>
  );
};

export default ProgressRing;
