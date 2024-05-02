const { baseBadge, variantDefault } = VM.require(
  "beachsunandrockandroll.near/widget/badge"
);

const srcDoc = `
<script type="module"> 
    import mxcn from "https://cdn.jsdelivr.net/npm/mxcn@2.0.0/+esm"
    import {cva} from 'https://cdn.jsdelivr.net/npm/class-variance-authority@0.7.0/+esm'
    
    const badgeVariants = cva(
      "${baseBadge}",
      {
        variants: {
          variant: {
            default:
              "${variantDefault}",
            secondary:
              "border-transparent bg-secondary text-secondary-foreground hover:opacity-80",
            destructive:
              "border-transparent bg-destructive text-destructive-foreground shadow hover:opacity-80",
            outline: "text-foreground",
          },
        },
        defaultVariants: {
          variant: "default",
        },
      }
    )

    window.addEventListener("message", ({ data }) => {
        try {
            event.source.postMessage(mxcn(badgeVariants(data)), "*");
        } catch (e) {}
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
