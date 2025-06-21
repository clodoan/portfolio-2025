import { addDays, isBefore } from "date-fns";
import type { DocumentProps } from "../../../documents.types";

const DAYS_ALERT_THRESHOLD = 3;

const useHasUrgentDocuments = (documents: DocumentProps[]) => {
  const hasUrgentDocuments = documents.some((document) => {
    const dueDate = new Date(document.dueDate);
    const alertThreshold = addDays(new Date(), DAYS_ALERT_THRESHOLD);
    return isBefore(dueDate, alertThreshold);
  });

  return { hasUrgentDocuments };
};

export default useHasUrgentDocuments;
