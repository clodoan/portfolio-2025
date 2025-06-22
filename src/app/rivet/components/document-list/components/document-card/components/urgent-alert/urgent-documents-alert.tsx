import { InfoCircleOutlined } from "@ant-design/icons";
import type { DocumentProps } from "../../../../../../document.types";
import useCountUrgentDocuments from "../../../../../../hooks/use-count-urgent-documents";

type UrgentDocumentsAlertProps = {
  documents: DocumentProps[];
  hasUrgentDocuments: boolean;
};

const UrgentDocumentsAlert = ({
  documents,
  hasUrgentDocuments,
}: UrgentDocumentsAlertProps) => {
  const { urgentDocumentsCount } = useCountUrgentDocuments(documents);

  return (
    <>
      {hasUrgentDocuments && (
        <div className="flex gap-2 px-3 pb-1.5 pt-2 text-red-700">
          <InfoCircleOutlined />
          <p className="text-rivet-label-2">
            {urgentDocumentsCount}{" "}
            {urgentDocumentsCount > 1 ? "documents" : "document"}
            need your attention
          </p>
        </div>
      )}
    </>
  );
};

export default UrgentDocumentsAlert;
