import { capitalize } from "lodash";

const dayTranslations = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const WeekHeader = () => {
  return (
    <div
      className="grid grid-cols-7 gap-0 mx-auto h-7"
      style={{ gridTemplateColumns: "repeat(7, 40px)" }}
    >
      {dayTranslations.map((day) => (
        <div key={day} className="flex items-center justify-center">
          <p className="text-label-3 text-tertiary">
            {capitalize(day.slice(0, 3))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WeekHeader;
