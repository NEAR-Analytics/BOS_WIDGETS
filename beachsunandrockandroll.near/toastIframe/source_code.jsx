const srcDoc = `
<script type="module"> 
    import mxcn from "https://cdn.jsdelivr.net/npm/mxcn@2.0.0/+esm"
    import {cva} from 'https://cdn.jsdelivr.net/npm/class-variance-authority@0.7.0/+esm'
    
    const toastVariants = cva(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
        {
          variants: {
            variant: {
              default: "border bg-background text-foreground",
              destructive:
                "destructive group border-destructive bg-destructive text-destructive-foreground",
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
            event.source.postMessage(mxcn(toastVariants(data)), "*");
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
