type DocumentRowProps = {
  id: string;
  company: string;
  status: string;
};

const DocumentRow = ({ id, company, status }: DocumentRowProps) => {
  return (
    <div key={id} className="flex items-center gap-2 px-2 py-1">
      <div className="text-rivet-label-2">{company}</div>
      <div className="text-rivet-label-2">{status}</div>
    </div>
  );
};

export default DocumentRow;
