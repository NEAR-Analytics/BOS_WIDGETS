const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const ContextMenuRoot = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.Root className={className} {...props}>
      {children}
    </ContextMenu.Root>
  </Tailwind>
);

const ContextMenuTrigger = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.Trigger className={className} {...props}>
      {children}
    </ContextMenu.Trigger>
  </Tailwind>
);

const ContextMenuGroup = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.Group className={className} {...props}>
      {children}
    </ContextMenu.Group>
  </Tailwind>
);

const ContextMenuSub = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.Sub className={className} {...props}>
      {children}
    </ContextMenu.Sub>
  </Tailwind>
);

const ContextMenuRadioGroup = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.RadioGroup className={className} {...props}>
      {children}
    </ContextMenu.RadioGroup>
  </Tailwind>
);

const ContextMenuSubTrigger = ({ className, inset, children, ...props }) => {
  let cls =
    inset != undefined && inset
      ? `${className} pr-2 pl-8`
      : `${className} px-2`;

  return (
    <Tailwind>
      <ContextMenu.SubTrigger ref="forwardedRef" className={cls} {...props}>
        {children}
        <i class="bi bi-chevron-right ml-auto h-4 w-4"></i>
      </ContextMenu.SubTrigger>
    </Tailwind>
  );
};

const ContextMenuSubContent = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.SubContent ref="forwardedRef" className={className} {...props}>
      {children}
    </ContextMenu.SubContent>
  </Tailwind>
);

const ContextMenuContent = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.Content ref="forwardedRef" className={className} {...props}>
      {children}
    </ContextMenu.Content>
  </Tailwind>
);

const ContextMenuItem = ({ className, inset, children, ...props }) => {
  let cls =
    inset != undefined && inset
      ? `${className} pr-2 pl-8`
      : `${className} px-2`;

  return (
    <Tailwind>
      <ContextMenu.Item ref="forwardedRef" className={cls} {...props}>
        {children}
      </ContextMenu.Item>
    </Tailwind>
  );
};

const ContextMenuCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}) => (
  <Tailwind>
    <ContextMenu.CheckboxItem
      ref="forwardedRef"
      className={className}
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

const ContextMenuRadioItem = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.RadioItem ref="forwardedRef" className={className} {...props}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenu.ItemIndicator>
          <i class="bi bi-dot h-4 w-4 fill-current"></i>
        </ContextMenu.ItemIndicator>
      </span>
      {children}
    </ContextMenu.RadioItem>
  </Tailwind>
);

const ContextMenuLabel = ({ className, inset, children, ...props }) => {
  let cls =
    inset != undefined && inset
      ? `${className} pr-2 pl-8`
      : `${className} px-2`;

  return (
    <Tailwind>
      <ContextMenu.Label ref="forwardedRef" className={cls} {...props}>
        {children}
      </ContextMenu.Label>
    </Tailwind>
  );
};

const ContextMenuSeparator = ({ className, children, ...props }) => (
  <Tailwind>
    <ContextMenu.Separator ref="forwardedRef" className={className} {...props}>
      {children}
    </ContextMenu.Separator>
  </Tailwind>
);

const ContextMenuShortcut = ({ className, children, ...props }) => (
  <Tailwind>
    <span className={className} {...props}>
      {children}
    </span>
  </Tailwind>
);

return {
  ContextMenuRoot,
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
};
