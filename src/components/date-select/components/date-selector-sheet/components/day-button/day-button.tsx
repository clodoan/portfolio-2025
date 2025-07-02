import { cva } from "class-variance-authority";
import {
  format,
  getDay,
  getWeekOfMonth,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  lastDayOfMonth,
  parse,
  startOfMonth,
} from "date-fns";

import type { DayButtonProps } from "../../date-selector-sheet.types";

const dayButton = cva(
  "all-unset relative flex h-full w-full min-h-10 min-w-10 items-center justify-center text-caption-1 cursor-pointer isolate text-label-3",
  {
    variants: {
      isDisabled: {
        true: "cursor-not-allowed pointer-events-none text-quaternary/50",
        false: "text-primary",
      },
      isSameMonth: {
        true: "text-primary",
        false: "text-tertiary",
      },
      isSelectionStart: {
        true: "rounded-full bg-accent text-quinary hover:bg-accent/90",
      },
      isSelectionEnd: {
        true: "rounded-full bg-accent text-quinary hover:bg-accent/90",
      },
      isInRange: {
        true: "",
      },
      isFirstDayOfMonth: {
        true: "",
      },
      isLastDayOfMonth: {
        true: "",
      },
      hasRange: {
        true: "",
      },
    },
    compoundVariants: [
      {
        isInRange: true,
        isSelectionStart: false,
        isSelectionEnd: false,
        isFirstDayOfMonth: false,
        isLastDayOfMonth: false,
        className:
          "bg-accent/10 hover:before:absolute hover:before:inset-0 hover:before:bg-accent/20 hover:before:rounded-full hover:before:w-full hover:before:z-10",
      },
      {
        isSelectionStart: true,
        hasRange: true,
        isFirstDayOfMonth: false,
        isLastDayOfMonth: false,
        className:
          "before:absolute before:left-[50%] before:top-0 before:right-0 before:bottom-0 before:w-5 before:bg-gradient-to-r before:from-transparent before:to-accent/10 before:z-50",
      },
      {
        isSelectionEnd: true,
        hasRange: true,
        isFirstDayOfMonth: false,
        isLastDayOfMonth: false,
        className:
          "before:absolute before:left-0 before:top-0 before:right-[50%] before:bottom-0 before:w-5 before:bg-gradient-to-l before:from-transparent before:to-accent/10 before:z-50",
      },
      {
        isInRange: false,
        isSelectionStart: false,
        isSelectionEnd: false,
        isFirstDayOfMonth: false,
        isLastDayOfMonth: false,
        className:
          "hover:before:absolute hover:before:inset-0 hover:before:bg-secondary hover:before:rounded-full hover:before:w-full hover:before:z-[0] [&>time]:z-[1] [&>time]:relative",
      },
      {
        isInRange: true,
        isSelectionStart: false,
        isSelectionEnd: false,
        isFirstDayOfMonth: true,
        isLastDayOfMonth: false,
        className: "bg-gradient-to-r from-transparent to-accent/10",
      },
      {
        isInRange: true,
        isSelectionStart: false,
        isSelectionEnd: false,
        isFirstDayOfMonth: false,
        isLastDayOfMonth: true,
        className: "bg-gradient-to-l from-transparent to-accent/10",
      },
    ],
  }
);

const DayButton = ({
  day,
  activeStartDate,
  activeEndDate,
  visibleMonth,
  onClick,
  disabled,
}: DayButtonProps) => {
  const firstDayCurrentMonth = parse(visibleMonth, "MMM-yyyy", new Date());
  const hasRange =
    activeStartDate &&
    activeEndDate &&
    (isBefore(activeStartDate, activeEndDate) ||
      isBefore(activeEndDate, activeStartDate));
  const isInRange =
    hasRange &&
    ((isBefore(day, activeEndDate) && isAfter(day, activeStartDate)) ||
      (isBefore(day, activeStartDate) && isAfter(day, activeEndDate)));
  const isStart = activeStartDate && isSameDay(day, activeStartDate);
  const isEnd = activeEndDate && isSameDay(day, activeEndDate);
  const isFirstDayOfMonth = isSameDay(day, startOfMonth(firstDayCurrentMonth));
  const isLastDayOfMonth = isSameDay(day, lastDayOfMonth(firstDayCurrentMonth));
  const isSameMonthDay = isSameMonth(day, firstDayCurrentMonth);
  const isCurrentDay = isToday(day);

  // Grid positioning logic
  const getRow = (targetDay: Date) => {
    const lastDay = lastDayOfMonth(firstDayCurrentMonth);
    if (isAfter(targetDay, lastDay)) {
      return getWeekOfMonth(lastDay);
    }
    if (isBefore(targetDay, firstDayCurrentMonth)) {
      return 1;
    }
    return getWeekOfMonth(day);
  };

  const getColumn = (targetDay: Date) => getDay(targetDay);
  const gridColumn = getColumn(day) + 1;
  const gridRow = getRow(day);

  return (
    <button
      type="button"
      data-is-today={isCurrentDay}
      data-is-same-month={isSameMonthDay}
      data-is-in-range={isInRange}
      data-is-selection-start={isStart}
      data-is-selection-end={isEnd}
      data-is-first-day-of-month={isFirstDayOfMonth}
      data-is-last-day-of-month={isLastDayOfMonth}
      style={{
        gridColumn,
        gridRow,
      }}
      className={dayButton({
        isDisabled: disabled,
        isSameMonth: isSameMonthDay,
        isSelectionStart: isStart,
        isSelectionEnd: isEnd,
        isInRange: !!isInRange,
        isFirstDayOfMonth: isFirstDayOfMonth && !!isInRange,
        isLastDayOfMonth: isLastDayOfMonth && !!isInRange,
        hasRange: !!hasRange,
      })}
      onClick={(e) => onClick(e, day)}
      aria-label={`Select ${format(day, "MMMM d, yyyy")}`}
      disabled={disabled}
    >
      <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
    </button>
  );
};

export default DayButton;
