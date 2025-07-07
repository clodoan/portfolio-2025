type RoleHeaderProps = {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
};

const RoleHeader = ({
  title,
  company,
  startDate,
  endDate = "Present",
}: RoleHeaderProps) => (
  <div className="flex justify-between items-start mb-2">
    <div>
      <h3 className="text-label-1 text-primary">{title}</h3>
      <p className="text-body-1 text-tertiary">{company}</p>
    </div>
    <div className="flex items-center gap-2 font-mono text-xs text-tertiary">
      {startDate}
      {endDate && ` - ${endDate}`}
    </div>
  </div>
);

export default RoleHeader;
