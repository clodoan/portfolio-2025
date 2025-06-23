import type { DocumentProps } from "../document.types";

const useSoonestDueDate = (documents: DocumentProps[]) => {
  const nonCompletedDocuments = documents.filter(
    (doc) => doc.status !== "completed"
  );

  const soonestDueDate =
    nonCompletedDocuments.length > 0
      ? nonCompletedDocuments.reduce((soonest, current) =>
          new Date(current.dueDate) < new Date(soonest.dueDate)
            ? current
            : soonest
        ).dueDate
      : undefined;

  return { soonestDueDate };
};

export default useSoonestDueDate;
