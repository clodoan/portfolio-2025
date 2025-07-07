import { MapPinIcon } from "@heroicons/react/24/outline";
import RoleHeader from "../role-header";

type ExperienceItemProps = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description?: string;
  bullets?: string[];
};

const ExperienceItem = ({
  title,
  company,
  location,
  startDate,
  endDate,
  description,
  bullets,
}: ExperienceItemProps) => (
  <div className="p-0 mb-12 last:border-b-0 border-b border-tertiary">
    <RoleHeader
      title={title}
      company={company}
      startDate={startDate}
      endDate={endDate}
    />
    <p className="text-body-1 text-tertiary mb-3 flex items-center gap-2">
      <MapPinIcon className="size-4 mb-0.5" />
      {location}
    </p>
    {description && (
      <p className="text-body-1 text-secondary mb-3">{description}</p>
    )}
    {bullets && (
      <ul className="text-body-1 text-secondary mb-3 space-y-1">
        {bullets.map((item) => (
          <li key={item} className="flex items-start">
            <span className="text-tertiary mr-2">•</span>
            <span className="text-tertiary">{item}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ExperienceItem;
