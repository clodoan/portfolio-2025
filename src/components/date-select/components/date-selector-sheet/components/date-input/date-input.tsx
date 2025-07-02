import { getDaysInMonth, isEqual, isValid, set } from "date-fns";
import type React from "react";
import { useEffect, useRef, useState } from "react";

type DateInputProps = {
  autoFocus?: boolean;
  value: Date;
  hasError?: boolean;
  onChange: (date: Date) => void;
  onFocus: () => void;
};

const DateInput = ({
  autoFocus,
  value,
  hasError,
  onChange,
  onFocus,
}: DateInputProps) => {
  const [focused, setFocused] = useState(false);
  const [month, setMonth] = useState(() =>
    (value.getMonth() + 1).toString().padStart(2, "0")
  );
  const [day, setDay] = useState(() =>
    value.getDate().toString().padStart(2, "0")
  );
  const [year, setYear] = useState(value.getFullYear().toString());

  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMonth((value.getMonth() + 1).toString().padStart(2, "0"));
    setDay(value.getDate().toString().padStart(2, "0"));
    setYear(value.getFullYear().toString());
  }, [value]);

  const submit = () => {
    const newDate = set(value, {
      year: Number.parseInt(year, 10),
      month: Number.parseInt(month, 10) - 1,
      date: Number.parseInt(day, 10),
    });

    if (!isValid(newDate)) {
      setMonth((value.getMonth() + 1).toString().padStart(2, "0"));
      setDay(value.getDate().toString().padStart(2, "0"));
      setYear(value.getFullYear().toString());
    }

    if (!isEqual(newDate, value)) {
      onChange(newDate);
    }
  };

  const getMaxDaysForMonth = (monthValue: number, yearValue: number) => {
    const date = new Date(yearValue, monthValue - 1, 1);
    return getDaysInMonth(date);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.currentTarget.select();
    setFocused(true);
    onFocus();
  };

  const handleBlur = () => {
    setFocused(false);

    // Apply formatting and constraints on blur
    let monthValue = Number.parseInt(month, 10);
    monthValue = Math.max(1, Math.min(12, monthValue));
    setMonth(monthValue.toString().padStart(2, "0"));

    const yearValue = Number.parseInt(year, 10);
    const maxDays = getMaxDaysForMonth(monthValue, yearValue);
    let dateValue = Number.parseInt(day, 10);
    dateValue = Math.max(1, Math.min(maxDays, dateValue));
    setDay(dateValue.toString().padStart(2, "0"));

    if (year.length > 0) {
      if (yearValue > 0) {
        setYear(yearValue.toString());
      }
    }

    submit();
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const monthValue = event.target.value;
    if (monthValue === "" || /^[0-9]{1,2}$/.test(monthValue)) {
      const numMonth = Number.parseInt(monthValue, 10);
      if (numMonth > 12) {
        setMonth("12");
      } else {
        setMonth(monthValue);
      }
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    if (dateValue === "" || /^[0-9]{1,2}$/.test(dateValue)) {
      const numDate = Number.parseInt(dateValue, 10);
      const numMonth = Number.parseInt(month, 10);
      const numYear = Number.parseInt(year, 10);
      const maxDays = getMaxDaysForMonth(numMonth, numYear);

      if (numDate > maxDays) {
        setDay(maxDays.toString());
      } else {
        setDay(dateValue);
      }
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const yearValue = event.target.value;
    if (yearValue === "" || /^[0-9]{1,4}$/.test(yearValue)) {
      setYear(yearValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submit();
    }

    if (event.key === "Tab") {
      event.preventDefault();

      if (event.currentTarget === monthRef.current) {
        dayRef.current?.focus();
      } else if (event.currentTarget === dayRef.current) {
        yearRef.current?.focus();
      } else if (event.currentTarget === yearRef.current) {
        containerRef.current?.blur();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`
        flex items-center justify-center w-32 h-8 bg-white border border-primary rounded outline-none
        ${focused ? "bg-primary border-primary shadow-sm" : ""}
        ${hasError ? "border-red-500 bg-red-50 shadow-sm" : ""}
      `}
    >
      <input
        ref={monthRef}
        {...(autoFocus && { autoFocus })}
        maxLength={2}
        onBlur={handleBlur}
        onChange={handleMonthChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        type="number"
        value={month}
        className="w-6 h-6 border-none text-primary text-center text-body-3 outline-none bg-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
      />
      <span className="text-tertiary text-body-3">/</span>
      <input
        ref={dayRef}
        maxLength={2}
        onBlur={handleBlur}
        onChange={handleDateChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        type="number"
        value={day}
        className="w-6 h-6 border-none text-primary text-center text-body-3 outline-none bg-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
      />
      <span className="text-tertiary text-body-3">/</span>
      <input
        ref={yearRef}
        maxLength={4}
        onBlur={handleBlur}
        onChange={handleYearChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        type="number"
        value={year}
        className="w-11 h-6 border-none text-primary text-center text-body-3 outline-none bg-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0"
      />
    </div>
  );
};

export default DateInput;
