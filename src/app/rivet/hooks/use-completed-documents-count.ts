import type { DocumentProps } from "../document.types";

const useCompletedDocumentsCount = (documents: DocumentProps[]) => {
  const completedDocumentsCount = documents.filter(
    (document) => document.status === "completed"
  ).length;

  return { completedDocumentsCount };
};

export default useCompletedDocumentsCount;
