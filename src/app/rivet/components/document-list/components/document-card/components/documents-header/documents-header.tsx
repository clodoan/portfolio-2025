import { cva, cx } from "class-variance-authority";
import type { DocumentProps } from "../../../../../../document.types";
import { CalendarIcon } from "@heroicons/react/16/solid";
import Counter from "./components/counter";
import useFormatDueDate from "../../../../../../hooks/use-format-due-date";

type DocumentsHeaderProps = {
  title: string;
  soonestDueDate?: string;
  documents: DocumentProps[];
  hasUrgentDocuments: boolean;
  isOpen: boolean;
};

const textVariants = cva("text-rivet-label-2", {
  variants: {
    urgency: {
      urgent: "text-red-700",
      normal: "text-gray-500",
    },
  },
});

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
    <div
      className={cx(
        "flex justify-between p-3 rounded-lg box-border transition-all duration-200",
        {
          "bg-white shadow-[0_4px_12px_rgba(220,38,38,0.15)]":
            hasUrgentDocuments && !isOpen,
        }
      )}
    >
      <p className="text-rivet-label-2">{title}</p>
      <div className="flex gap-3">
        <div
          className={cx("flex items-center gap-2", textVariants({ urgency }))}
        >
          <CalendarIcon className="size-4" />
          {soonestDueDate ? formatDueDate(soonestDueDate) : "null"}
        </div>
        <span className={textVariants({ urgency })}>⋅</span>
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
