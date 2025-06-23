import {
  differenceInDays,
  format,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns";
import { DAYS_FORMAT_THRESHOLD } from "../documents.constants";

const useFormatDueDate = () => {
  const formatDueDate = (dateString: string, isSummary?: boolean) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const daysDiff = differenceInDays(dueDate, today);

    const prefix = isSummary ? "Next due:" : "Due";

    // If it's today
    if (isToday(dueDate)) {
      return `${prefix} today`;
    }

    // If it's tomorrow
    if (isTomorrow(dueDate)) {
      return `${prefix} tomorrow`;
    }

    // If it's yesterday
    if (isYesterday(dueDate)) {
      return `${prefix} yesterday`;
    }

    // If it's exactly 7 days from today, format as "Due June 21"
    if (daysDiff === DAYS_FORMAT_THRESHOLD) {
      return `${prefix} ${format(dueDate, "MMM d, yyyy")}`;
    }

    // If it's less than 7 days from today (but not today, tomorrow, or yesterday)
    if (daysDiff > 0 && daysDiff < DAYS_FORMAT_THRESHOLD) {
      return `${prefix} in ${daysDiff} days`;
    }

    // If it's more than 7 days from today
    if (daysDiff > DAYS_FORMAT_THRESHOLD) {
      return `${prefix} ${format(dueDate, "MMM d, yyyy")}`;
    }

    // If it's before yesterday (negative daysDiff)
    if (daysDiff < -1) {
      const absDaysDiff = Math.abs(daysDiff);
      return `${prefix} ${absDaysDiff} days ago`;
    }

    // If it's before yesterday (negative daysDiff)
    if (daysDiff === -1) {
      return `${prefix} yesterday`;
    }

    // Fallback
    return `${prefix} ${format(dueDate, "MMM d, yyyy")}`;
  };

  return { formatDueDate };
};

export default useFormatDueDate;
