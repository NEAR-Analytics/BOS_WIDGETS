const baseToogle =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground";

const variantDefault = "bg-transparent";

const sizeDefault = "h-9 px-3";

const toogleClassname = `${baseToogle} ${variantDefault} ${sizeDefault}`;

const ToggleRoot = ({ className, variant, size, ...props }) => (
  <Toggle.Root
    ref="forwardedRef"
    className={className ?? toogleClassname}
    {...props}
  />
);

return {
  Toggle: ToggleRoot,
  baseToogle,
  variantDefault,
  sizeDefault,
  toogleClassname,
};
