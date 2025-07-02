"use client";

import type { PopoverContentProps } from "@radix-ui/react-popover";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameMonth,
  parse,
  startOfToday,
} from "date-fns";
import { motion } from "framer-motion";
import type React from "react";
import { useMemo, useState } from "react";
import type { PopoverProps } from "../../../popover";
import Popover from "../../../popover/popover";
import DayButton from "./components/day-button";
import Header from "./components/header";
import RangeInputs from "./components/range-inputs";
import WeekHeader from "./components/week-header";
import { DirectionChange } from "./date-selector-sheet.types";
import { getMoveVariants } from "./date-selector-sheet.utils";

const today = startOfToday();

type DateSelectorSheetProps = {
  children: React.ReactNode;
  className?: string;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  endDate?: Date;
  onChange: (dates: { startDate?: Date; endDate?: Date }) => void;
  onPointerDownOutside?: PopoverContentProps["onPointerDownOutside"];
  onEscapeKeyDown?: PopoverContentProps["onEscapeKeyDown"];
  startDate?: Date;
  align?: PopoverProps["align"];
  side?: PopoverProps["side"];
  sideOffset?: PopoverProps["sideOffset"];
  collisionBoundary?: PopoverProps["collisionBoundary"];
  portalContainer?: HTMLElement | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const DateSelectorSheet = ({
  children,
  disableFutureDates,
  disablePastDates,
  endDate,
  onChange,
  startDate,
  onPointerDownOutside,
  onEscapeKeyDown,
  align,
  side,
  sideOffset,
  collisionBoundary,
  portalContainer,
  open,
  onOpenChange,
}: DateSelectorSheetProps) => {
  const [movingDirection, setMovingDirection] = useState<
    DirectionChange | undefined
  >();
  const [visibleMonth, setVisibleMonth] = useState<string>(
    endDate ? format(endDate, "MMM-yyyy") : format(today, "MMM-yyyy")
  );
  const firstDayCurrentMonth = useMemo(
    () => parse(visibleMonth, "MMM-yyyy", new Date()),
    [visibleMonth]
  );
  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
      }),
    [firstDayCurrentMonth]
  );

  const goToDate = (targetDate?: Date) => {
    if (!targetDate) return;
    setVisibleMonth(format(targetDate, "MMM-yyyy"));
  };

  const handleMonthChange = (direction: DirectionChange) => {
    const monthAdjustment = direction === DirectionChange.next ? 1 : -1;
    const adjustedMonth = add(firstDayCurrentMonth, {
      months: monthAdjustment,
    });
    setVisibleMonth(format(adjustedMonth, "MMM-yyyy"));
  };

  const handleSelectDay = (day: Date, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (!isSameMonth(day, firstDayCurrentMonth)) {
      goToDate(day);
    }

    if (isAfter(day, endDate || day)) {
      onChange({ startDate: endDate, endDate: day });
    } else if (isBefore(day, startDate || day)) {
      onChange({ startDate: day, endDate: startDate });
    } else {
      onChange({ startDate: day, endDate: day });
    }
  };

  const handleRangeInputFocus = (trigger: "start" | "end") => {
    if (trigger === "start") {
      goToDate(startDate || today);
    }
    if (trigger === "end") {
      goToDate(endDate || today);
    }
  };

  const handleRangeChange = ({
    startDate: newStartDate,
    endDate: newEndDate,
    trigger,
  }: {
    startDate?: Date;
    endDate?: Date;
    trigger: "start" | "end";
  }) => {
    onChange({ startDate: newStartDate, endDate: newEndDate });
    if (trigger === "start") {
      goToDate(newStartDate);
    }
    if (trigger === "end") {
      goToDate(newEndDate);
    }
  };

  const popoverContent = (
    <div>
      <Header
        handleMonthChange={handleMonthChange}
        firstDayCurrentMonth={firstDayCurrentMonth}
        movingDirection={movingDirection}
        setMovingDirection={setMovingDirection}
      />
      <RangeInputs
        onChange={handleRangeChange}
        onFocus={handleRangeInputFocus}
        startDate={startDate}
        endDate={endDate}
        disableFutureDates={disableFutureDates}
        disablePastDates={disablePastDates}
      />
      <div id="error-message" />
      <div className="flex flex-col items-center px-2 py-3">
        <WeekHeader />
        <motion.div
          className="grid grid-cols-7 gap-0 mx-auto"
          style={{ gridTemplateColumns: "repeat(7, 40px)" }}
          key={format(firstDayCurrentMonth, "MMMM yyyy")}
          initial={movingDirection ? "initial" : false}
          animate={movingDirection ? "animate" : false}
          exit="exit"
          variants={movingDirection ? getMoveVariants(movingDirection) : {}}
          transition={{ duration: 0.5 }}
        >
          {days.map((day) => (
            <DayButton
              key={day.toISOString()}
              day={day}
              onClick={(event) => handleSelectDay(day, event)}
              visibleMonth={visibleMonth}
              activeStartDate={startDate}
              activeEndDate={endDate}
              disabled={
                (disableFutureDates && isAfter(day, today)) ||
                (disablePastDates && isBefore(day, today))
              }
            />
          ))}
        </motion.div>
      </div>
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      onPointerDownOutside={onPointerDownOutside}
      onEscapeKeyDown={onEscapeKeyDown}
      side={side}
      align={align}
      sideOffset={sideOffset}
      collisionBoundary={collisionBoundary}
      portalContainer={portalContainer}
      controlledOpen={open}
      onControlledOpenChange={onOpenChange}
    >
      {children}
    </Popover>
  );
};

export default DateSelectorSheet;
