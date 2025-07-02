"use client";

import { useState } from "react";
import DateSelectorSheet from "./components/date-selector-sheet";

const DateSelect = () => {
  const [open, setOpen] = useState(false);
  return (
    <DateSelectorSheet open={open} onOpenChange={setOpen} onChange={() => {}}>
      <button
        onClick={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setOpen(false);
        }}
        tabIndex={0}
        className="text-body-1 text-secondary cursor-pointer"
        type="button"
      >
        Close
      </button>
    </DateSelectorSheet>
  );
};

export default DateSelect;
