export type Category = "design" | "plugins" | "designCode"; // | "all";
export type OverflowSide = "left" | "right" | "both" | "none";
export type Companies = "Mainstreet" | "Footprint";
export type ProjectsIDs =
  | "tax-credits"
  | "new-doc-scan"
  | "annotate-instances"
  | "black-and-white"
  | "date-picker"
  | "multi-select"
  | "full-screen-filters"
  | "risk-signal-glossary";

export type Project = {
  id: ProjectsIDs;
  title: string;
  description: string;
  link?: string;
  mediaAsset?: string;
  category: Category;
  disabled?: boolean;
  year?: number;
  company?: Companies;
};

export type FilterableProjectsProps = {
  projects: Project[];
};

export type ImageCardProps = Omit<Project, "mediaAsset" | "category"> & {
  link: string;
  children: React.ReactNode;
  disabled?: boolean;
};
