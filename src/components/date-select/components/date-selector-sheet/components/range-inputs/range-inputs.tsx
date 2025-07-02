import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  endOfDay,
  isAfter,
  isBefore,
  startOfDay,
  startOfToday,
} from "date-fns";
import { useState } from "react";

import DateInput from "../date-input";

export type RangeInputsProps = {
  startDate?: Date;
  endDate?: Date;
  onFocus?: (trigger: "start" | "end") => void;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  onChange: ({
    startDate,
    endDate,
    trigger,
  }: {
    startDate?: Date;
    endDate?: Date;
    trigger: "start" | "end";
  }) => void;
};

const RangeInputs = ({
  startDate = new Date(),
  endDate = new Date(),
  disableFutureDates = false,
  disablePastDates = false,
  onChange,
  onFocus,
}: RangeInputsProps) => {
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);

  const handleFocus = (trigger: "start" | "end") => () => {
    onFocus?.(trigger);
  };

  const handleStartChanged = (newStartDate: Date) => {
    if (disableFutureDates && isAfter(newStartDate, endOfDay(startOfToday()))) {
      setStartError(true);
    } else if (
      disablePastDates &&
      isBefore(newStartDate, startOfDay(startOfToday()))
    ) {
      setStartError(true);
    } else {
      setStartError(false);
      if (newStartDate > endDate) {
        onChange({
          startDate: endDate,
          endDate: newStartDate,
          trigger: "start",
        });
      } else {
        onChange({
          startDate: newStartDate,
          endDate,
          trigger: "start",
        });
      }
    }
  };

  const handleEndChanged = (newEndDate: Date) => {
    if (disableFutureDates && isAfter(newEndDate, endOfDay(startOfToday()))) {
      setEndError(true);
    } else if (
      disablePastDates &&
      isBefore(newEndDate, startOfDay(startOfToday()))
    ) {
      setEndError(true);
    } else {
      setEndError(false);
      if (newEndDate < startDate) {
        onChange({
          startDate: newEndDate,
          endDate: startDate,
          trigger: "end",
        });
      } else {
        onChange({
          startDate,
          endDate: newEndDate,
          trigger: "end",
        });
      }
    }
  };

  return (
    <>
      <div className="gap-3 p-3 border-t border-b bg-secondary border-tertiary">
        <div className="flex items-center gap-3">
          <DateInput
            onChange={handleStartChanged}
            onFocus={handleFocus("start")}
            value={startDate}
            hasError={startError}
          />
          <div className="flex items-center justify-center">
            <ArrowRightIcon className="w-4 h-4" />
          </div>
          <DateInput
            onChange={handleEndChanged}
            onFocus={handleFocus("end")}
            value={endDate}
            hasError={endError}
          />
        </div>
      </div>
      {endError || startError ? (
        <div className="gap-2 px-3 py-2 rounded-lg bg-error">
          <div className="flex items-center gap-3">
            <ExclamationTriangleIcon className="w-4 h-4 text-error" />
            <p className="text-body-3 text-error">
              {disableFutureDates ? "Error: Future date" : "Error: Past date"}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RangeInputs;
