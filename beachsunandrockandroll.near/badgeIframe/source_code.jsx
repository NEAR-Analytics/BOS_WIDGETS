const srcDoc = `
<script type="module"> 
    import mxcn from "https://cdn.jsdelivr.net/npm/mxcn@2.0.0/+esm"
    import {cva} from 'https://cdn.jsdelivr.net/npm/class-variance-authority@0.7.0/+esm'
    
    const badgeVariants = cva(
      "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      {
        variants: {
          variant: {
            default:
              "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
            secondary:
              "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive:
              "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
            outline: "text-foreground",
          },
        },
        defaultVariants: {
          variant: "default",
        },
      }
    )

    window.top.postMessage("loaded", "*");
    window.addEventListener("message", ({ data }) => {
        try {
            event.source.postMessage(mxcn(badgeVariants(data)), "*");
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
    }}
    onMessage={props.output}
  />
);
