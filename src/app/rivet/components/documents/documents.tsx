import DocumentCard from "./components/document-card/document-card";
import documentData from "./document-data.json";
import type { DocumentProps, DocumentGroup } from "./documents.types";

const Documents = () => {
  // Group documents by their group type
  const groupedDocuments = documentData.reduce(
    (acc, document) => {
      const group = document.group as DocumentGroup;
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(document as unknown as DocumentProps);
      return acc;
    },
    {} as Record<DocumentGroup, DocumentProps[]>
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-label-1">Documents</h1>
      {Object.entries(groupedDocuments).map(([group, documents]) => (
        <DocumentCard
          key={group}
          title={group as DocumentGroup}
          documents={documents}
        />
      ))}
    </div>
  );
};

export default Documents;
