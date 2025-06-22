import { ExclamationCircleOutlined } from "@ant-design/icons";
import { cx } from "class-variance-authority";
import useFormatDueDate from "../../../../../../../../hooks/use-format-due-date";

type DueDateProps = {
  dueDate: string;
  shouldShowAlert: boolean;
  isCompleted: boolean;
};

const DueDate = ({ dueDate, shouldShowAlert, isCompleted }: DueDateProps) => {
  const { formatDueDate } = useFormatDueDate();

  return (
    <div
      className={cx("text-rivet-label-2 flex-0 flex items-center gap-1.5", {
        "text-red-700": shouldShowAlert,
      })}
    >
      {shouldShowAlert && (
        <ExclamationCircleOutlined className="text-red-700 bg-red-50 rounded-full" />
      )}
      <p
        className={cx("text-rivet-label-2 whitespace-nowrap mt-[1.5px]", {
          "opacity-50": isCompleted,
        })}
      >
        {formatDueDate(dueDate)}
      </p>
    </div>
  );
};

export default DueDate;
