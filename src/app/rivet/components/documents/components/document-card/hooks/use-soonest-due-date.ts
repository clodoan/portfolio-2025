import type { DocumentProps } from "../../../documents.types";

const useSoonestDueDate = (documents: DocumentProps[]) => {
  const soonestDueDate =
    documents.length > 0
      ? documents.reduce((soonest, current) =>
          new Date(current.dueDate) < new Date(soonest.dueDate)
            ? current
            : soonest
        ).dueDate
      : null;

  return { soonestDueDate };
};

export default useSoonestDueDate;
