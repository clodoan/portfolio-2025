"use client";

import { cva } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { uniqueId } from "lodash";
import { useState } from "react";
import type { DocumentGroup, DocumentProps } from "../../../../document.types";
import {
  useHasUrgentDocuments,
  useSoonestDueDate,
  useSortedDocuments,
} from "../../../../hooks";
import DocumentRow from "./components/document-row";
import DocumentsHeader from "./components/documents-header";
import UrgentDocumentsAlert from "./components/urgent-alert";

type DocumentCardProps = {
  title: DocumentGroup;
  documents: DocumentProps[];
};

const documentCardVariants = cva(
  "flex flex-col w-full border rounded-lg text-text-rivet-primary box-content cursor-pointer transition-colors duration-200 overflow-hidden",
  {
    variants: {
      urgency: {
        urgent: "border-red-600 border-[1.5px] hover:border-red-700",
        normal: "border-neutral-300 hover:border-neutral-400",
      },
      state: {
        open: "bg-neutral-50",
        closed: "bg-white",
        urgentClosed: "bg-red-50",
      },
    },
    compoundVariants: [
      {
        urgency: "urgent",
        state: "closed",
        class: "bg-red-50",
      },
    ],
    defaultVariants: {
      urgency: "normal",
      state: "closed",
    },
  }
);

const DocumentCard = ({ title, documents }: DocumentCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { soonestDueDate } = useSoonestDueDate(documents);
  const { hasUrgentDocuments } = useHasUrgentDocuments(documents);
  const sortedDocuments = useSortedDocuments(documents);

  const urgency = hasUrgentDocuments ? "urgent" : "normal";
  const state = isOpen
    ? "open"
    : hasUrgentDocuments
      ? "urgentClosed"
      : "closed";

  return (
    <li
      aria-label={`${title} document card`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      }}
      onClick={() => setIsOpen(!isOpen)}
      className={documentCardVariants({ urgency, state })}
    >
      <DocumentsHeader
        title={title}
        soonestDueDate={soonestDueDate}
        documents={documents}
        hasUrgentDocuments={hasUrgentDocuments}
        isOpen={isOpen}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={uniqueId()}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 pt-0"
          >
            <ul className="flex flex-col gap-3 bg-white rounded-lg p-2 w-full overflow-hidden border border-gray-300">
              {sortedDocuments.map(({ company, status, dueDate }) => (
                <DocumentRow
                  key={uniqueId()}
                  company={company}
                  status={status}
                  dueDate={dueDate}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <UrgentDocumentsAlert
          documents={documents}
          hasUrgentDocuments={hasUrgentDocuments}
        />
      )}
    </li>
  );
};

export default DocumentCard;
