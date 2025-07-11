import { cx } from "class-variance-authority";

export type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
  customMaxWidth?: string;
};

const Paragraph = ({ children, className, customMaxWidth }: ParagraphProps) => {
  return (
    <div
      className={cx(
        "flex flex-col gap-1.5 mx-auto mt-5",
        customMaxWidth
          ? customMaxWidth
          : "max-w-container-mobile md:max-w-container-desktop px-5 md:px-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Paragraph;
