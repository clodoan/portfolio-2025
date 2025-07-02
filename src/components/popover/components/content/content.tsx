import type { PopoverContentProps as RadixPopoverContentProps } from '@radix-ui/react-popover';
import * as RadixPopover from '@radix-ui/react-popover';
import { forwardRef } from 'react';

export type PopoverContentProps = RadixPopoverContentProps & {
  children: React.ReactNode;
  className?: string;
};

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, side = 'top', ...props }, ref) => {
    return (
      <RadixPopover.Content
        sideOffset={4}
        {...props}
        ref={ref}
        className={`bg-primary rounded shadow-md z-popover outline-none text-body-2 max-w-[420px] ${className}`}
      >
        {children}
      </RadixPopover.Content>
    );
  },
);

export default PopoverContent;
