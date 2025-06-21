"use client";

import { CalendarIcon } from "@heroicons/react/24/outline";
import type { DocumentGroup, DocumentProps } from "../../documents.types";
import { cx, cva } from "class-variance-authority";
import useFormatDueDate from "./hooks/use-format-due-date";
import useSoonestDueDate from "./hooks/use-soonest-due-date";
import Counter from "./components/counter";
import useHasUrgentDocuments from "./hooks/use-has-urgent-documents";
import DocumentRow from "./components/document-row";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const cardVariants = cva(
  "flex flex-col gap-3 max-w-[876px] border rounded-lg p-3 text-text-rivet-primary box-content cursor-pointer transition-colors",
  {
    variants: {
      urgency: {
        urgent: "bg-red-100 border-red-600 hover:border-red-800",
        normal:
          "bg-neutral-50 border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100",
      },
      isOpen: {
        true: "bg-neutral-50",
        false: "bg-neutral-50",
      },
    },
    defaultVariants: {
      urgency: "normal",
    },
  }
);

const textVariants = cva("text-rivet-label-2", {
  variants: {
    urgency: {
      urgent: "text-red-700",
      normal: "text-gray-500",
    },
  },
  defaultVariants: {
    urgency: "normal",
  },
});

type DocumentCardProps = {
  title: DocumentGroup;
  documents: DocumentProps[];
};

const DocumentCard = ({ title, documents }: DocumentCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { formatDueDate } = useFormatDueDate();
  const { soonestDueDate } = useSoonestDueDate(documents);
  const { hasUrgentDocuments } = useHasUrgentDocuments(documents);

  const urgency = hasUrgentDocuments ? "urgent" : "normal";

  return (
    <button
      type="button"
      className={cardVariants({ urgency, isOpen })}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between">
        <div className="text-rivet-label-2">{title}</div>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-3 bg-white rounded-lg p-2 w-full overflow-hidden border border-gray-300"
          >
            {documents.map(({ id, company, status }) => (
              <DocumentRow key={id} id={id} company={company} status={status} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default DocumentCard;
