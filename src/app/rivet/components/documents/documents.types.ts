export type DocumentGroup = "W-2" | "1099" | "1099-INT" | "K-1" | "Other";

export type DocumentStatus = "required" | "optional" | "completed" | "pending";

export type DocumentProps = {
  id: string;
  group: DocumentGroup;
  company: string;
  status: DocumentStatus;
  lastUpdatedDate: string;
  dueDate: string;
};
