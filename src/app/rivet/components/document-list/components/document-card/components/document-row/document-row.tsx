import type { DocumentStatus } from "../../../../../../document.types";
import StatusBadge from "./components/status-badge";
import { differenceInDays } from "date-fns";

import { DAYS_FORMAT_THRESHOLD } from "../../../../../../documents.constants";
import DueDate from "./components/due-date";
import Actions from "./components/actions";
import { cx } from "class-variance-authority";

type DocumentRowProps = {
  company: string;
  status: DocumentStatus;
  dueDate: string;
};

const DocumentRow = ({ company, status, dueDate }: DocumentRowProps) => {
  const dueDateCalculated = new Date(dueDate);
  const today = new Date();
  const daysDiff = differenceInDays(dueDateCalculated, today);
  const isCompleted = status === "completed";
  const shouldShowAlert = daysDiff < DAYS_FORMAT_THRESHOLD && !isCompleted;

  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <div className="flex items-center gap-2 flex-1">
        <StatusBadge status={status} />
        <div
          className={cx("text-rivet-label-2", {
            "opacity-50": isCompleted,
          })}
        >
          {company}
        </div>
      </div>
      <DueDate
        dueDate={dueDate}
        shouldShowAlert={shouldShowAlert}
        isCompleted={isCompleted}
      />
      <div className="flex-0">⋅</div>
      <Actions status={status} />
    </div>
  );
};

export default DocumentRow;
