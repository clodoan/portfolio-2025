import { CalendarIcon } from "@heroicons/react/16/solid";
import { cva, cx } from "class-variance-authority";
import type { DocumentProps } from "../../../../../../document.types";
import useFormatDueDate from "../../../../../../hooks/use-format-due-date";
import Counter from "../../../counter";

type DocumentsHeaderProps = {
  title: string;
  soonestDueDate?: string;
  documents: DocumentProps[];
  hasUrgentDocuments: boolean;
  isOpen: boolean;
};

const dateStyleVariants = cva("text-rivet-label-2", {
  variants: {
    urgency: {
      urgent: "text-red-700",
      normal: "text-neutral-500",
    },
  },
  defaultVariants: {
    urgency: "normal",
  },
});

const containerStyleVariants = cva(
  "flex justify-between p-3 rounded-lg box-border transition-all duration-200 w-full",
  {
    variants: {
      urgency: {
        urgent: "bg-white shadow-[0_4px_12px_rgba(220,38,38,0.15)]",
        normal: "bg-transparent",
      },
      isOpen: {
        true: "bg-neutral-100 shadow-none",
      },
    },
    defaultVariants: {
      urgency: "normal",
    },
  }
);

const DocumentsHeader = ({
  title,
  soonestDueDate,
  documents,
  hasUrgentDocuments,
  isOpen,
}: DocumentsHeaderProps) => {
  const { formatDueDate } = useFormatDueDate();
  const urgency = hasUrgentDocuments ? "urgent" : "normal";

  return (
    <div className={containerStyleVariants({ urgency, isOpen })}>
      <p className="text-rivet-label-2 pl-1 text-neutral-700">{title}</p>
      <div className="flex gap-3">
        <div
          className={cx(
            "flex items-center gap-2",
            dateStyleVariants({ urgency })
          )}
        >
          <CalendarIcon className="size-4" />
          {soonestDueDate ? formatDueDate(soonestDueDate, true) : "null"}
        </div>
        <span className={dateStyleVariants({ urgency })}>⋅</span>
        {documents.length > 0 && (
          <Counter
            documents={documents}
            hasUrgentDocuments={hasUrgentDocuments}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentsHeader;
