type EducationItemProps = {
  degree: string;
  school: string;
  field?: string;
  startYear: string;
  endYear?: string;
};

const EducationItem = ({
  degree,
  school,
  field,
  startYear,
  endYear,
}: EducationItemProps) => (
  <div className="flex justify-between items-start mb-2">
    <div>
      <h3 className="text-label-1 text-primary">{degree}</h3>
      <p className="text-body-1 text-tertiary">{school}</p>
      {field && <p className="text-body-1 text-tertiary">{field}</p>}
    </div>
    <div className="flex items-center gap-2 font-mono text-xs text-tertiary">
      <span>
        {startYear}
        {endYear && ` - ${endYear}`}
      </span>
    </div>
  </div>
);

export default EducationItem;
