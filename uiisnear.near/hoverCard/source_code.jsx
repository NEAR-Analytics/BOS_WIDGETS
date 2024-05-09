const HoverCardRoot = ({ children, ...props }) => (
  <HoverCard.Root {...props}>{children}</HoverCard.Root>
);

const HoverCardTrigger = ({ children, ...props }) => (
  <HoverCard.Trigger {...props}>{children}</HoverCard.Trigger>
);

const hoverCardContentClassname =
  "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

const HoverCardContent = ({
  className,
  children,
  align,
  sideOffset,
  ...props
}) => (
  <HoverCard.Content
    ref="forwardedRef"
    align={align ?? "center"}
    sideOffset={sideOffset ?? 4}
    className={className ?? hoverCardContentClassname}
    {...props}
  >
    {children}
  </HoverCard.Content>
);

return {
  HoverCard: HoverCardRoot,
  HoverCardTrigger,
  HoverCardContent,
  hoverCardContentClassname,
};
