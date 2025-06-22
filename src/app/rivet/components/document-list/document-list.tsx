import useGroupedDocuments from "../../hooks/use-grouped-documents";
import DocumentCard from "./components/document-card/document-card";

const DocumentList = () => {
  const { documentEntries } = useGroupedDocuments();

  return (
    <div className="flex flex-col w-full">
      <div className="text-label-1">Documents</div>
      <ul className="flex flex-col gap-1">
        {documentEntries.map(([group, documents]) => (
          <DocumentCard key={group} title={group} documents={documents} />
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
