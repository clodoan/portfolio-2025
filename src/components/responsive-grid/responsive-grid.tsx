import { cx } from "class-variance-authority";

export type ResponsiveGridProps = {
  columns: 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
};

const ResponsiveGrid = ({
  children,
  columns,
  className,
}: ResponsiveGridProps) => {
  return (
    <div
      className={cx(
        "grid grid-cols-1 gap-4 max-w-container-desktop-wide mx-auto",
        {
          "md:grid-cols-2": columns === 2,
          "md:grid-cols-3": columns === 3,
          "md:grid-cols-4": columns === 4,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default ResponsiveGrid;
