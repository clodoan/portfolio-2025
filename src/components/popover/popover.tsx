import * as RadixPopover from "@radix-ui/react-popover";
import type { PopoverContentProps } from "@radix-ui/react-popover";

import { cx } from "class-variance-authority";

export type PopoverProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  collisionBoundary?: Element | null;
  onPointerDownOutside?: PopoverContentProps["onPointerDownOutside"];
  onEscapeKeyDown?: PopoverContentProps["onEscapeKeyDown"];
  controlledOpen?: boolean;
  onControlledOpenChange?: (open: boolean) => void;
  className?: string;
  portalContainer?: HTMLElement | null;
};

const Popover = ({
  children,
  content,
  side = "top",
  align = "start",
  sideOffset = 4,
  collisionBoundary,
  className,
  onPointerDownOutside,
  onEscapeKeyDown,
  controlledOpen,
  onControlledOpenChange,
  portalContainer,
  ...props
}: PopoverProps) => {
  const handleEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onEscapeKeyDown?.(e);
    }
  };
  return (
    <RadixPopover.Root
      open={controlledOpen}
      onOpenChange={onControlledOpenChange}
    >
      <RadixPopover.Trigger asChild>{children}</RadixPopover.Trigger>
      <RadixPopover.Portal container={portalContainer}>
        <RadixPopover.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          collisionBoundary={collisionBoundary}
          onPointerDownOutside={onPointerDownOutside}
          onEscapeKeyDown={handleEscapeKeyDown}
          className={cx(
            "relative bg-primary rounded shadow-md z-popover outline-none border border-tertiary origin-[var(--radix-popover-content-transform-origin)]",
            "data-[state=open]:animate-scaleIn",
            "data-[state=closed]:animate-scaleOut",
            "data-[side=bottom]:animate-slideDown",
            "data-[side=top]:animate-slideUp",
            "data-[side=left]:animate-slideLeft",
            "data-[side=right]:animate-slideRight",
            className
          )}
          asChild
          {...props}
        >
          {content}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

export default Popover;
