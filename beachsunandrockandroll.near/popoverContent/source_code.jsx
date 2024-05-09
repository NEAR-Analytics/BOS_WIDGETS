let {align, sideOffset, className, ...addProps} = props;

const base =
  "z-50 w-72 rounded-2 border bg-success p-4 text-white shadow outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

const PopoverContent = ({ children }) => (
  <Popover.Content
    align={align}
    sideOffset={sideOffset}
    className={`${base} ${className ?? ``}`}
    {...addProps}
  >
    {children}
  </Popover.Content>
);

return { PopoverContent };
