import type { DocumentProps } from "../../../../../documents.types";

const useCompletedDocumentsCount = (documents: DocumentProps[]) => {
  const completedDocumentsCount = documents.filter(
    (document) => document.status === "completed"
  ).length;

  return { completedDocumentsCount };
};

export default useCompletedDocumentsCount;
