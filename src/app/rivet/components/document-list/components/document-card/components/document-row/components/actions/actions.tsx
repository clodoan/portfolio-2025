import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  ForwardIcon,
} from "@heroicons/react/24/outline";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { DocumentStatus } from "../../../../../../../../document.types";

type ActionsProps = {
  status: DocumentStatus;
};

type IconButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
  tooltipText: string;
};

const IconButton = ({ icon, onClick, tooltipText }: IconButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      alert(`${tooltipText} action triggered`);
    }
  };

  return (
    <Tooltip.Provider delayDuration={500}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            onClick={handleClick}
            className="p-1 w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
          >
            {icon}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content
          className="text-rivet-label-3 bg-white rounded p-2 shadow-md"
          sideOffset={8}
        >
          <p>{tooltipText}</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

const Actions = ({ status }: ActionsProps) => {
  if (status === "completed")
    return (
      <div className="flex items-center gap-1">
        <IconButton
          icon={<ArrowDownTrayIcon className="w-4 h-4" />}
          tooltipText="Download"
        />
        <IconButton
          icon={<EyeIcon className="w-4 h-4" />}
          tooltipText="Preview"
        />
      </div>
    );

  return (
    <div className="flex items-center gap-1">
      <IconButton
        icon={<ArrowUpTrayIcon className="w-4 h-4" />}
        tooltipText="Upload"
      />
      <IconButton
        icon={<ForwardIcon className="w-4 h-4" />}
        tooltipText="Skip"
      />
    </div>
  );
};

export default Actions;
