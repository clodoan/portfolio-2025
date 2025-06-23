import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import { capitalize } from "lodash";
import type { DocumentStatus } from "../../../../../../../../document.types";

// map status with icon
const statusIconMap = {
  required: (
    <InfoCircleOutlined className="text-yellow-700 bg-yellow-50 rounded-full" />
  ),
  optional: (
    <QuestionCircleOutlined className="text-blue-700 bg-blue-50 rounded-full" />
  ),
  completed: (
    <CheckCircleOutlined className="text-emerald-700 bg-emerald-50 rounded-full" />
  ),
  pending: (
    <ClockCircleOutlined className="text-neutral-600 bg-neutral-50 rounded-full" />
  ),
  overdue: (
    <InfoCircleOutlined className="text-red-700 bg-red-50 rounded-full" />
  ),
};

type StatusBadgeProps = {
  status: DocumentStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Tooltip.Provider delayDuration={500}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="flex items-center rounded-full">
            {statusIconMap[status]}
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content
          className="text-rivet-label-3 bg-white rounded p-2 shadow-md"
          sideOffset={8}
        >
          <p>{capitalize(status)}</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default StatusBadge;
