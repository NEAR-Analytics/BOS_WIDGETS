const srcDoc = `
<script type="module"> 
    import mxcn from "https://cdn.jsdelivr.net/npm/mxcn@2.0.0/+esm"
    import {cva} from 'https://cdn.jsdelivr.net/npm/class-variance-authority@0.7.0/+esm'
    
    const toggleVariants = cva(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
      {
        variants: {
          variant: {
            default: "bg-transparent",
            outline:
              "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
          },
          size: {
            default: "h-9 px-3",
            sm: "h-8 px-2",
            lg: "h-10 px-3",
          },
        },
        defaultVariants: {
          variant: "default",
          size: "default",
        },
      }
    );

    window.top.postMessage("loaded", "*");
    window.addEventListener("message", ({ data }) => {
        try {
            event.source.postMessage(mxcn(toggleVariants(data)), "*");
        } catch (e) {
            // ignore
        }
    }, false);
</script>
`;

return (
  <iframe
    className="d-none"
    srcDoc={srcDoc}
    message={{
      className: props.className,
      variant: props.variant,
      size: props.size,
    }}
    onMessage={props.output}
  />
);
