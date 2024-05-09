const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const navigationMenuClassname =
  "relative z-10 flex max-w-max flex-1 items-center justify-center";

const NavigationMenu = ({ className, children, ...props }) => (
  <Tailwind>
    <NavigationMenu.Root
      ref="forwardedRef"
      className={className ?? navigationMenuClassname}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenu.Root>
  </Tailwind>
);

const navigationMenuListClassname =
  "group flex flex-1 list-none items-center justify-center space-x-1";

const NavigationMenuList = ({ className, children, ...props }) => (
  <Tailwind>
    <NavigationMenu.List
      ref="forwardedRef"
      className={className ?? navigationMenuListClassname}
      {...props}
    >
      {children}
    </NavigationMenu.List>
  </Tailwind>
);

const NavigationMenuItem = ({ children, ...props }) => (
  <Tailwind>
    <NavigationMenu.Item {...props}>{children}</NavigationMenu.Item>
  </Tailwind>
);

const navigationMenuTriggerClassname =
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50";

const NavigationMenuTrigger = ({ className, children, ...props }) => (
  <Tailwind>
    <NavigationMenu.Trigger
      ref="forwardedRef"
      className={className ?? navigationMenuTriggerClassname}
      {...props}
    >
      {children}{" "}
      <i
        class="bi bi-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      ></i>
    </NavigationMenu.Trigger>
  </Tailwind>
);

const navigationMenuContentClassname =
  "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ";

const NavigationMenuContent = ({ className, children, ...props }) => (
  <Tailwind>
    <NavigationMenu.Content
      ref="forwardedRef"
      className={className ?? navigationMenuContentClassname}
      {...props}
    >
      {children}
    </NavigationMenu.Content>
  </Tailwind>
);

const NavigationMenuLink = ({ children, ...props }) => (
  <Tailwind>
    <NavigationMenu.Link {...props}>{children}</NavigationMenu.Link>
  </Tailwind>
);

const navigationMenuViewportClassname =
  "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]";

const NavigationMenuViewport = ({ className, children, ...props }) => (
  <Tailwind>
    <div className="absolute left-0 top-full flex justify-center">
      <NavigationMenu.Viewport
        className={className ?? navigationMenuViewportClassname}
        ref="forwardedRef"
        {...props}
      >
        {children}
      </NavigationMenu.Viewport>
    </div>
  </Tailwind>
);

const navigationMenuIndicatorClassname =
  "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in";

const NavigationMenuIndicator = ({ className, ...props }) => (
  <Tailwind>
    <NavigationMenu.Indicator
      ref="forwardedRef"
      className={className ?? navigationMenuIndicatorClassname}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenu.Indicator>
  </Tailwind>
);

return {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuClassname,
  navigationMenuListClassname,
  navigationMenuTriggerClassname,
  navigationMenuContentClassname,
  navigationMenuViewportClassname,
  navigationMenuIndicatorClassname,
};
