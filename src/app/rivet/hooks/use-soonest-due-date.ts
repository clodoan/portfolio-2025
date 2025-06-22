import type { DocumentProps } from "../document.types";

const useSoonestDueDate = (documents: DocumentProps[]) => {
  const soonestDueDate =
    documents.length > 0
      ? documents.reduce((soonest, current) =>
          new Date(current.dueDate) < new Date(soonest.dueDate)
            ? current
            : soonest
        ).dueDate
      : undefined;

  return { soonestDueDate };
};

export default useSoonestDueDate;
