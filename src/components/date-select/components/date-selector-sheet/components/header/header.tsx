import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  DirectionChange,
  type HeaderProps,
} from "../../date-selector-sheet.types";
import { getMoveVariants } from "../../date-selector-sheet.utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Header = ({
  handleMonthChange,
  firstDayCurrentMonth,
  movingDirection,
  setMovingDirection,
}: HeaderProps) => {
  const handleDirectionChange = (newDirection: DirectionChange) => {
    handleMonthChange(newDirection);
    setMovingDirection(newDirection);
  };

  return (
    <div className="flex items-center justify-between h-10 px-1">
      <button
        type="button"
        aria-label="Previous month"
        onClick={() => handleDirectionChange(DirectionChange.previous)}
        className="text-secondary"
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
      <motion.div
        className="pointer-events-none user-select-none"
        key={format(firstDayCurrentMonth, "MMMM yyyy")}
        initial={movingDirection ? "initial" : false}
        animate={movingDirection ? "animate" : false}
        exit="exit"
        variants={movingDirection ? getMoveVariants(movingDirection) : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="text-label-2">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </p>
      </motion.div>
      <button
        type="button"
        aria-label="Next month"
        onClick={() => handleDirectionChange(DirectionChange.next)}
        className="text-secondary"
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Header;
