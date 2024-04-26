const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");
const {
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
} = VM.require("beachsunandrockandroll.near/widget/contextMenu");

if (Tailwind === undefined) return <></>;

return (
  <Tailwind>
    <div className="flex mx-auto w-max pt-10">
      <ContextMenuRoot>
        <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-64">
          <ContextMenuItem
            className="relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            inset
          >
            Back
            <ContextMenuShortcut className="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘[
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem
            className="relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            inset
            disabled
          >
            Forward
            <ContextMenuShortcut className="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘]
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem
            className="relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            inset
          >
            Reload
            <ContextMenuShortcut className="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘R
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger
              className="flex cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
              inset
            >
              More Tools
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-48">
              <ContextMenuItem className="relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                Save Page As...
                <ContextMenuShortcut className="ml-auto text-xs tracking-widest text-muted-foreground">
                  ⇧⌘S
                </ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem className="relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                Create Shortcut...
              </ContextMenuItem>
              <ContextMenuItem className="relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                Name Window...
              </ContextMenuItem>
              <ContextMenuSeparator className="-mx-1 my-1 h-px bg-border" />
              <ContextMenuItem className="relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                Developer Tools
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator className="-mx-1 my-1 h-px bg-border" />
          <ContextMenuCheckboxItem
            className="relative flex cursor-default select-none items-center justify-between rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            checked
          >
            Show Bookmarks Bar
            <ContextMenuShortcut className="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘⇧B
            </ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            Show Full URLs
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator className="-mx-1 my-1 h-px bg-border" />
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel
              className="py-1.5 text-sm font-semibold text-foreground"
              inset
            >
              People
            </ContextMenuLabel>
            <ContextMenuSeparator className="-mx-1 my-1 h-px bg-border" />
            <ContextMenuRadioItem
              className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              value="pedro"
            >
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem
              className="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              value="colm"
            >
              Colm Tuite
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenuRoot>
    </div>
  </Tailwind>
);
