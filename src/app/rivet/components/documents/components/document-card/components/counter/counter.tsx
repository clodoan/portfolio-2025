import { cx } from "class-variance-authority";
import type { DocumentProps } from "../../../../documents.types";
import useCompletedDocumentsCount from "./hooks/use-completed-documents-count";

type CounterProps = {
  documents: DocumentProps[];
  hasUrgentDocuments: boolean;
};

const Counter = ({ documents, hasUrgentDocuments }: CounterProps) => {
  const { completedDocumentsCount } = useCompletedDocumentsCount(documents);
  const alertStyles = hasUrgentDocuments
    ? {
        container: "bg-neutral-50 border-neutral-300",
        text: "text-red-700",
        muted: "text-red-700/60",
      }
    : {
        container: "bg-neutral-50 border-neutral-300",
        text: "text-gray-500",
        muted: "text-gray-300",
      };

  return (
    <div className="text-rivet-label-2 flex items-center gap-1 min-w-10 text-center">
      <span className={cx(alertStyles.text)}>{completedDocumentsCount}</span>
      <span className={cx(alertStyles.muted)}>/</span>
      <span className={cx(alertStyles.muted)}>{documents.length}</span>
    </div>
  );
};

export default Counter;
