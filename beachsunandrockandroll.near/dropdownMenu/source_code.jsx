const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const DropdownMenuRoot = ({ children, ...props }) => (
  <Tailwind>
    <DropdownMenu.Root {...props}>{children}</DropdownMenu.Root>
  </Tailwind>
);

const DropdownMenuTrigger = ({ children, ...props }) => (
  <Tailwind>
    <DropdownMenu.Trigger {...props}>{children}</DropdownMenu.Trigger>
  </Tailwind>
);

const DropdownMenuGroup = ({ children, ...props }) => (
  <Tailwind>
    <DropdownMenu.Group {...props}>{children}</DropdownMenu.Group>
  </Tailwind>
);

const DropdownMenuSub = ({ children, ...props }) => (
  <Tailwind>
    <DropdownMenu.Sub {...props}>{children}</DropdownMenu.Sub>
  </Tailwind>
);

const DropdownMenuRadioGroup = ({ children, ...props }) => (
  <Tailwind>
    <DropdownMenu.RadioGroup {...props}>{children}</DropdownMenu.RadioGroup>
  </Tailwind>
);

const dropdownMenuSubTriggerClassname =
  "flex cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent";

const DropdownMenuSubTrigger = ({ className, inset, children, ...props }) => {
  let cls = className ?? dropdownMenuSubTriggerClassname;
  cls = inset != undefined && inset ? `${cls} pr-2 pl-8` : `${cls} px-2`;

  return (
    <Tailwind>
      <DropdownMenu.SubTrigger ref="forwardedRef" className={cls} {...props}>
        {children}
        <i class="bi bi-chevron-right ml-auto h-4 w-4"></i>
      </DropdownMenu.SubTrigger>
    </Tailwind>
  );
};

const dropdownMenuSubContentClassname =
  "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

const DropdownMenuSubContent = ({ className, children, ...props }) => (
  <Tailwind>
    <DropdownMenu.SubContent
      ref="forwardedRef"
      className={className ?? dropdownMenuSubContentClassname}
      {...props}
    >
      {children}
    </DropdownMenu.SubContent>
  </Tailwind>
);

const dropdownMenuContentClassname =
  "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

const DropdownMenuContent = ({
  className,
  children,
  sideOffset,
  ...props
}) => (
  <Tailwind>
    <DropdownMenu.Content
      ref="forwardedRef"
      sideOffset={sideOffset ?? 4}
      className={className ?? dropdownMenuContentClassname}
      {...props}
    >
      {children}
    </DropdownMenu.Content>
  </Tailwind>
);

const dropdownMenuItemClassname =
  "relative flex cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const DropdownMenuItem = ({ className, children, inset, ...props }) => {
  let cls = className ?? dropdownMenuItemClassname;
  cls = inset != undefined && inset ? `${cls} pr-2 pl-8` : `${cls}`;

  return (
    <Tailwind>
      <DropdownMenu.Item ref="forwardedRef" className={cls} {...props}>
        {children}
      </DropdownMenu.Item>
    </Tailwind>
  );
};

const dropdownMenuCheckboxItemClassname =
  "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}) => (
  <Tailwind>
    <DropdownMenu.CheckboxItem
      ref="forwardedRef"
      className={className ?? dropdownMenuCheckboxItemClassname}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenu.ItemIndicator>
          <i class="bi bi-check h-4 w-4"></i>
        </DropdownMenu.ItemIndicator>
      </span>
      {children}
    </DropdownMenu.CheckboxItem>
  </Tailwind>
);

const dropdownMenuRadioItemClassname =
  "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const DropdownMenuRadioItem = ({ className, children, ...props }) => (
  <Tailwind>
    <DropdownMenu.RadioItem
      ref="forwardedRef"
      className={className ?? dropdownMenuRadioItemClassname}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenu.ItemIndicator>
          <i class="bi bi-dot h-4 w-4 fill-current"></i>
        </DropdownMenu.ItemIndicator>
      </span>
      {children}
    </DropdownMenu.RadioItem>
  </Tailwind>
);

const dropdownMenuLabelClassname = "px-2 py-1.5 text-sm font-semibold";

const DropdownMenuLabel = ({ className, children, inset, ...props }) => (
  <Tailwind>
    <DropdownMenu.Label
      ref="forwardedRef"
      className={className ?? dropdownMenuLabelClassname}
      {...props}
    >
      {children}
    </DropdownMenu.Label>
  </Tailwind>
);

const dropdownMenuSeparatorClassname = "-mx-1 my-1 h-px bg-muted";

const DropdownMenuSeparator = ({ className, children, ...props }) => (
  <Tailwind>
    <DropdownMenu.Separator
      ref="forwardedRef"
      className={className ?? dropdownMenuSeparatorClassname}
      {...props}
    >
      {children}
    </DropdownMenu.Separator>
  </Tailwind>
);

const dropdownMenuShortcutClassname =
  "ml-auto text-xs tracking-widest opacity-60";

const DropdownMenuShortcut = ({ className, children, ...props }) => (
  <Tailwind>
    <span className={className ?? dropdownMenuShortcutClassname} {...props}>
      {children}
    </span>
  </Tailwind>
);

return {
  DropdownMenu: DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  dropdownMenuSubTriggerClassname,
  dropdownMenuSubContentClassname,
  dropdownMenuContentClassname,
  dropdownMenuItemClassname,
  dropdownMenuCheckboxItemClassname,
  dropdownMenuRadioItemClassname,
  dropdownMenuLabelClassname,
  dropdownMenuSeparatorClassname,
  dropdownMenuShortcutClassname,
};
