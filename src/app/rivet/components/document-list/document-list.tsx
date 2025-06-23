import type { DocumentProps } from "../../document.types";
import { CONTAINER_MAX_WIDTH } from "../../documents.constants";
import useGroupedDocuments from "../../hooks/use-grouped-documents";
import Counter from "./components/counter/counter";
import DocumentCard from "./components/document-card/document-card";

const DocumentList = () => {
  const { documentEntries } = useGroupedDocuments();

  return (
    <div
      className="flex flex-col w-full"
      style={{ maxWidth: CONTAINER_MAX_WIDTH }}
    >
      <div className="text-label-1 flex items-center justify-between gap-2 px-2">
        Active tasks
        <Counter
          documents={
            documentEntries.flatMap(
              ([, documents]) => documents
            ) as DocumentProps[]
          }
          hasUrgentDocuments={false}
        />
      </div>
      <span className="border-b border-neutral-400 border-dashed h-[1px] mb-3" />
      <ul className="flex flex-col gap-1">
        {documentEntries.map(([group, documents]) => (
          <DocumentCard key={group} title={group} documents={documents} />
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
