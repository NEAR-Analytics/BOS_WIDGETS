const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const ContextMenuRoot = ({ children, ...props }) => (
  <Tailwind>
    <ContextMenu.Root {...props}>{children}</ContextMenu.Root>
  </Tailwind>
);

const ContextMenuTrigger = ({ children, ...props }) => (
  <Tailwind>
    <ContextMenu.Trigger {...props}>{children}</ContextMenu.Trigger>
  </Tailwind>
);

const ContextMenuGroup = ({ children, ...props }) => (
  <Tailwind>
    <ContextMenu.Group {...props}>{children}</ContextMenu.Group>
  </Tailwind>
);

const ContextMenuSub = ({ children, ...props }) => (
  <Tailwind>
    <ContextMenu.Sub {...props}>{children}</ContextMenu.Sub>
  </Tailwind>
);

const ContextMenuRadioGroup = ({ children, ...props }) => (
  <Tailwind>
    <ContextMenu.RadioGroup {...props}>{children}</ContextMenu.RadioGroup>
  </Tailwind>
);

const contextMenuSubTriggerClassname =
  "flex cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground";

const ContextMenuSubTrigger = ({ className, inset, children, ...props }) => {
  let cls = className ?? contextMenuSubTriggerClassname;
  cls = inset != undefined && inset ? `${cls} pr-2 pl-8` : `${cls} px-2`;

  return (
    <Tailwind>
      <ContextMenu.SubTrigger ref="forwardedRef" className={cls} {...props}>
        {children}
        <i class="bi bi-chevron-right ml-auto h-4 w-4"></i>
      </ContextMenu.SubTrigger>
    </Tailwind>
  );
};

const contextMenuSubContentClassname =
  "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

const ContextMenuSubContent = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.SubContent
      ref="forwardedRef"
      className={className ?? contextMenuSubContentClassname}
      {...props}
    >
      {children}
    </ContextMenu.SubContent>
  </Tailwind>
);

const contextMenuContentClassname =
  "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

const ContextMenuContent = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.Content
      ref="forwardedRef"
      className={className ?? contextMenuContentClassname}
      {...props}
    >
      {children}
    </ContextMenu.Content>
  </Tailwind>
);

const contextMenuItemClassname =
  "relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const ContextMenuItem = ({ className, inset, children, ...props }) => {
  let cls = className ?? contextMenuItemClassname;
  cls = inset != undefined && inset ? `${cls} pr-2 pl-8` : `${cls} px-2`;

  return (
    <Tailwind>
      <ContextMenu.Item ref="forwardedRef" className={cls} {...props}>
        {children}
      </ContextMenu.Item>
    </Tailwind>
  );
};

const contextMenuCheckboxItemClassname =
  "relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const ContextMenuCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}) => (
  <Tailwind>
    <ContextMenu.CheckboxItem
      ref="forwardedRef"
      className={className ?? contextMenuCheckboxItemClassname}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenu.ItemIndicator>
          <i class="bi bi-check h-4 w-4"></i>
        </ContextMenu.ItemIndicator>
      </span>
      {children}
    </ContextMenu.CheckboxItem>
  </Tailwind>
);

const contextMenuRadioItemClassname =
  "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const ContextMenuRadioItem = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.RadioItem
      ref="forwardedRef"
      className={className ?? contextMenuRadioItemClassname}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenu.ItemIndicator>
          <i class="bi bi-dot h-4 w-4 fill-current"></i>
        </ContextMenu.ItemIndicator>
      </span>
      {children}
    </ContextMenu.RadioItem>
  </Tailwind>
);

const contextMenuLabelClassname =
  "py-1.5 text-sm font-semibold text-foreground";

const ContextMenuLabel = ({ className, inset, children, ...props }) => {
  let cls = className ?? contextMenuLabelClassname;
  cls = inset != undefined && inset ? `${cls} pr-2 pl-8` : `${cls} px-2`;

  return (
    <Tailwind>
      <ContextMenu.Label ref="forwardedRef" className={cls} {...props}>
        {children}
      </ContextMenu.Label>
    </Tailwind>
  );
};

const contextMenuSeparatorClassname = "-mx-1 my-1 h-px bg-border";

const ContextMenuSeparator = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.Separator
      ref="forwardedRef"
      className={className ?? contextMenuSeparatorClassname}
      {...props}
    >
      {children}
    </ContextMenu.Separator>
  </Tailwind>
);

const contextMenuShortcutClassname =
  "ml-auto text-xs tracking-widest text-muted-foreground";

const ContextMenuShortcut = ({ className, children, ...props }) => (
  <Tailwind>
    <span className={className ?? contextMenuShortcutClassname} {...props}>
      {children}
    </span>
  </Tailwind>
);

return {
  ContextMenu: ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  contextMenuSubTriggerClassname,
  contextMenuSubContentClassname,
  contextMenuContentClassname,
  contextMenuItemClassname,
  contextMenuCheckboxItemClassname,
  contextMenuRadioItemClassname,
  contextMenuLabelClassname,
  contextMenuSeparatorClassname,
  contextMenuShortcutClassname,
};
