import { useMemo } from "react";
import { differenceInDays, parseISO } from "date-fns";
import type { DocumentProps } from "../document.types";

const useSortedDocuments = (documents: DocumentProps[]) => {
  return useMemo(() => {
    const today = new Date();

    return [...documents].sort((a, b) => {
      if (a.status === "completed" && b.status !== "completed") {
        return 1;
      }
      if (a.status !== "completed" && b.status === "completed") {
        return -1;
      }

      const aDueDate = parseISO(a.dueDate);
      const bDueDate = parseISO(b.dueDate);

      const aDaysFromToday = Math.abs(differenceInDays(aDueDate, today));
      const bDaysFromToday = Math.abs(differenceInDays(bDueDate, today));

      return aDaysFromToday - bDaysFromToday;
    });
  }, [documents]);
};

export default useSortedDocuments;
