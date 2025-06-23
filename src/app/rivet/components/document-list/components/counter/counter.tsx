import { cx } from "class-variance-authority";
import type { DocumentProps } from "../../../../document.types";
import useCompletedDocumentsCount from "../../../../hooks/use-completed-documents-count";
import ProgressRing from "./components";

type CounterProps = {
  documents: DocumentProps[];
  hasUrgentDocuments: boolean;
};

const Counter = ({ documents, hasUrgentDocuments }: CounterProps) => {
  const { completedDocumentsCount } = useCompletedDocumentsCount(documents);
  const progress =
    documents.length > 0 ? completedDocumentsCount / documents.length : 0;

  const alertStyles = hasUrgentDocuments
    ? {
        container: "bg-neutral-50 border-neutral-300",
        text: "text-red-700",
        ring: "text-red-800",
        muted: "text-red-700/60",
      }
    : {
        container: "bg-neutral-50 border-neutral-300",
        text: "text-gray-500",
        ring: "text-emerald-600",
        muted: "text-gray-300",
      };

  return (
    <div className="text-rivet-label-2 flex items-center gap-2 min-w-10 text-center">
      <ProgressRing
        progress={progress}
        size={20}
        strokeWidth={2}
        className={cx(alertStyles.ring)}
      />
      <div className="flex items-center gap-1 min-w-10">
        <span className={cx(alertStyles.text)}>{completedDocumentsCount}</span>
        <span className={cx(alertStyles.muted)}>/</span>
        <span className={cx(alertStyles.muted)}>{documents.length}</span>
      </div>
    </div>
  );
};

export default Counter;
