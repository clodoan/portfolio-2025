import {
  isToday,
  isTomorrow,
  isYesterday,
  differenceInDays,
  format,
} from "date-fns";
import { DAYS_FORMAT_THRESHOLD } from "../documents.constants";

const useFormatDueDate = () => {
  const formatDueDate = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const daysDiff = differenceInDays(dueDate, today);

    // If it's today
    if (isToday(dueDate)) {
      return "Due today";
    }

    // If it's tomorrow
    if (isTomorrow(dueDate)) {
      return "Due tomorrow";
    }

    // If it's yesterday
    if (isYesterday(dueDate)) {
      return "Due yesterday";
    }

    // If it's exactly 7 days from today, format as "Due June 21"
    if (daysDiff === DAYS_FORMAT_THRESHOLD) {
      return `Due ${format(dueDate, "MMM d, yyyy")}`;
    }

    // If it's less than 7 days from today (but not today, tomorrow, or yesterday)
    if (daysDiff > 0 && daysDiff < DAYS_FORMAT_THRESHOLD) {
      return `Due in ${daysDiff} days`;
    }

    // If it's more than 7 days from today
    if (daysDiff > DAYS_FORMAT_THRESHOLD) {
      return `Due ${format(dueDate, "MMM d, yyyy")}`;
    }

    // If it's before yesterday (negative daysDiff)
    if (daysDiff < -1) {
      const absDaysDiff = Math.abs(daysDiff);
      return `Due ${absDaysDiff} days ago`;
    }

    // If it's before yesterday (negative daysDiff)
    if (daysDiff === -1) {
      return "Due yesterday";
    }

    // Fallback
    return `Due ${format(dueDate, "MMM d, yyyy")}`;
  };

  return { formatDueDate };
};

export default useFormatDueDate;
