const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const MenubarMenu = ({ children, ...props }) => (
  <Tailwind>
    <Menubar.Menu {...props}>{children}</Menubar.Menu>
  </Tailwind>
);

const MenubarGroup = ({ children, ...props }) => (
  <Tailwind>
    <Menubar.Group {...props}>{children}</Menubar.Group>
  </Tailwind>
);

const MenubarSub = ({ children, ...props }) => (
  <Tailwind>
    <Menubar.Sub {...props}>{children}</Menubar.Sub>
  </Tailwind>
);

const MenubarRadioGroup = ({ children, ...props }) => (
  <Tailwind>
    <Menubar.RadioGroup {...props}>{children}</Menubar.RadioGroup>
  </Tailwind>
);

const menubarRootClassname =
  "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm";

const MenubarRoot = ({ className, children, ...props }) => (
  <Tailwind>
    <Menubar.Root
      ref="forwardedRef"
      className={className ?? menubarRootClassname}
      {...props}
    >
      {children}
    </Menubar.Root>
  </Tailwind>
);

const menubarTriggerClassname =
  "flex cursor-default select-none items-center justify-between rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground";

const MenubarTrigger = ({ className, children, ...props }) => (
  <Tailwind>
    <Menubar.Trigger
      ref="forwardedRef"
      className={className ?? menubarTriggerClassname}
      {...props}
    >
      {children}
    </Menubar.Trigger>
  </Tailwind>
);

const menubarSubTriggerClassname =
  "flex cursor-default select-none items-center justify-between rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground";

const MenubarSubTrigger = ({ className, inset, children, ...props }) => {
  let cls = className ?? menubarSubTriggerClassname;
  cls = inset != undefined && inset ? `${cls} pr-2 pl-8` : `${cls} px-2`;

  return (
    <Tailwind>
      <Menubar.SubTrigger ref="forwardedRef" className={cls} {...props}>
        {children}
        <i class="bi bi-chevron-right ml-auto h-4 w-4"></i>
      </Menubar.SubTrigger>
    </Tailwind>
  );
};

const menubarSubContentClassname =
  "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

const MenubarSubContent = ({ className, children, ...props }) => (
  <Tailwind>
    <Menubar.SubContent
      ref="forwardedRef"
      className={className ?? menubarSubContentClassname}
      {...props}
    >
      {children}
    </Menubar.SubContent>
  </Tailwind>
);

const menubarContentClassname =
  "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

const MenubarContent = ({
  className,
  children,
  align,
  alignOffset,
  sideOffset,
  ...props
}) => (
  <Tailwind>
    <Menubar.Content
      ref="forwardedRef"
      align={align ?? "start"}
      alignOffset={alignOffset ?? -4}
      sideOffset={sideOffset ?? 8}
      className={className ?? menubarContentClassname}
      {...props}
    >
      {children}
    </Menubar.Content>
  </Tailwind>
);

const menubarItemClassname =
  "relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const MenubarItem = ({ className, children, inset, ...props }) => {
  let cls = className ?? menubarItemClassname;
  cls = inset != undefined && inset ? `${cls} pr-2 pl-8` : `${cls} px-2`;

  return (
    <Tailwind>
      <Menubar.Item ref="forwardedRef" className={cls} {...props}>
        {children}
      </Menubar.Item>
    </Tailwind>
  );
};

const menubarCheckboxItemClassname =
  "relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const MenubarCheckboxItem = ({ className, children, checked, ...props }) => (
  <Tailwind>
    <Menubar.CheckboxItem
      ref="forwardedRef"
      className={className ?? menubarCheckboxItemClassname}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Menubar.ItemIndicator>
          <i class="bi bi-check h-4 w-4"></i>
        </Menubar.ItemIndicator>
      </span>
      {children}
    </Menubar.CheckboxItem>
  </Tailwind>
);

const menubarRadioItemClassname =
  "relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

const MenubarRadioItem = ({ className, children, ...props }) => (
  <Tailwind>
    <Menubar.RadioItem
      ref="forwardedRef"
      className={className ?? menubarRadioItemClassname}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Menubar.ItemIndicator>
          <i class="bi bi-dot h-4 w-4 fill-current"></i>
        </Menubar.ItemIndicator>
      </span>
      {children}
    </Menubar.RadioItem>
  </Tailwind>
);

const menubarLabelClassname = "py-1.5 text-sm font-semibold";

const MenubarLabel = ({ className, children, inset, ...props }) => {
  let cls = className ?? menubarLabelClassname;
  cls = inset != undefined && inset ? `${cls} pr-2 pl-8` : `${cls} px-2`;

  return (
    <Tailwind>
      <Menubar.Label ref="forwardedRef" className={cls} {...props}>
        {children}
      </Menubar.Label>
    </Tailwind>
  );
};

const menubarSeparatorClassname = "-mx-1 my-1 h-px bg-muted";

const MenubarSeparator = ({ className, children, ...props }) => (
  <Tailwind>
    <Menubar.Separator
      ref="forwardedRef"
      className={className ?? menubarSeparatorClassname}
      {...props}
    >
      {children}
    </Menubar.Separator>
  </Tailwind>
);

const menubarShortcutClassname =
  "ml-auto text-xs tracking-widest text-muted-foreground";

const MenubarShortcut = ({ className, children, ...props }) => {
  return (
    <Tailwind>
      <span className={className ?? menubarShortcutClassname} {...props}>
        {children}
      </span>
    </Tailwind>
  );
};

return {
  Menubar: MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
  menubarRootClassname,
  menubarTriggerClassname,
  menubarSubTriggerClassname,
  menubarSubContentClassname,
  menubarContentClassname,
  menubarItemClassname,
  menubarCheckboxItemClassname,
  menubarRadioItemClassname,
  menubarLabelClassname,
  menubarSeparatorClassname,
  menubarShortcutClassname,
};
