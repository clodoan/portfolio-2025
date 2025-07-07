import { cx } from "class-variance-authority";

export type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

const Paragraph = ({ children, className }: ParagraphProps) => {
  return (
    <div className={cx("flex flex-col gap-1.5 mt-3", className)}>
      {children}
    </div>
  );
};

export default Paragraph;
