const { baseToggle, variantDefault, sizeDefault } = VM.require(
  "beachsunandrockandroll.near/widget/toggle"
);

const srcDoc = `
<script type="module"> 
    import mxcn from "https://cdn.jsdelivr.net/npm/mxcn@2.0.0/+esm"
    import {cva} from 'https://cdn.jsdelivr.net/npm/class-variance-authority@0.7.0/+esm'
    
    const toggleVariants = cva(
      "${baseToggle}",
      {
        variants: {
          variant: {
            default: "${variantDefault}",
            outline:
              "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
          },
          size: {
            default: "${sizeDefault}",
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
