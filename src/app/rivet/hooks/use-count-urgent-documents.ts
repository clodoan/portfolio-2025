import { addDays, isBefore } from "date-fns";
import type { DocumentProps } from "../document.types";
import { DAYS_FORMAT_THRESHOLD } from "../documents.constants";

const useCountUrgentDocuments = (documents: DocumentProps[]) => {
  const urgentDocumentsCount = documents.filter((document) => {
    const isRequired = document.status === "required";
    const isDueSoon =
      isRequired &&
      isBefore(
        new Date(document.dueDate),
        addDays(new Date(), DAYS_FORMAT_THRESHOLD)
      );
    return isDueSoon;
  }).length;

  return { urgentDocumentsCount };
};

export default useCountUrgentDocuments;
