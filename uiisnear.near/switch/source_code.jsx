const switchClassname =
  "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-uin-primary data-[state=unchecked]:bg-input";

const SwitchRoot = ({ className, children, ...props }) => (
  <Switch.Root
    ref="forwardedRef"
    className={className ?? switchClassname}
    {...props}
  >
    <Switch.Thumb
      className={
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      }
    >
      {children}
    </Switch.Thumb>
  </Switch.Root>
);

return { Switch: SwitchRoot, switchClassname };
