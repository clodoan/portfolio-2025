import { useMemo } from "react";
import documentData from "../document-data.json";
import type { DocumentGroup, DocumentProps } from "../document.types";

const useGroupedDocuments = () => {
  const groupedDocuments = useMemo(() => {
    return documentData.reduce(
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
  }, []);

  const documentEntries = useMemo(() => {
    return Object.entries(groupedDocuments) as Array<
      [DocumentGroup, DocumentProps[]]
    >;
  }, [groupedDocuments]);

  return { groupedDocuments, documentEntries };
};

export default useGroupedDocuments;
