const { baseButton, variantDefault, sizeDefault } = VM.require(
  "beachsunandrockandroll.near/widget/button"
);

const srcDoc = `
<script type="module"> 
    import mxcn from "https://cdn.jsdelivr.net/npm/mxcn@2.0.0/+esm"
    import {cva} from 'https://cdn.jsdelivr.net/npm/class-variance-authority@0.7.0/+esm'
    
    const buttonVariants = cva(
      "${baseButton}",
      {
        variants: {
          variant: {
            default: "${variantDefault}",
            destructive:
              "bg-destructive text-destructive-foreground hover:opacity-90",
            outline:
              "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary:
              "bg-secondary text-secondary-foreground hover:bg-secondary hover:opacity-80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
          },
          size: {
            default: "${sizeDefault}",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
          },
        },
        defaultVariants: {
          variant: "default",
          size: "default",
        },
      }
    )

    window.addEventListener("message", ({ data }) => {
        try {
            event.source.postMessage(mxcn(buttonVariants(data)), "*");
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
