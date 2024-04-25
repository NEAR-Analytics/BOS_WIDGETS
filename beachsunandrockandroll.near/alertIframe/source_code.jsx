const srcDoc = `
<script type="module"> 
    import mxcn from "https://cdn.jsdelivr.net/npm/mxcn@2.0.0/+esm"
    import {cva} from 'https://cdn.jsdelivr.net/npm/class-variance-authority@0.7.0/+esm'
    
    const alertVariants = cva(
        "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
        {
          variants: {
            variant: {
              default: "bg-background text-foreground",
              destructive:
                "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
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
            event.source.postMessage(mxcn(alertVariants(data)), "*");
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
