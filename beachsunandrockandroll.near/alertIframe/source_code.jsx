const { baseAlert, variantDefault } = VM.require(
  "beachsunandrockandroll.near/widget/alert"
);

const srcDoc = `
<script type="module"> 
    import mxcn from "https://cdn.jsdelivr.net/npm/mxcn@2.0.0/+esm"
    import { cva } from 'https://cdn.jsdelivr.net/npm/class-variance-authority@0.7.0/+esm'
    
    const alertVariants = cva(
        "${baseAlert}",
        {
          variants: {
            variant: {
              default: "${variantDefault}",
              destructive:
                "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
            },
          },
          defaultVariants: {
            variant: "default",
          },
        }
    )

    window.addEventListener("message", ({ data }) => {
        try {
            event.source.postMessage(mxcn(alertVariants(data)), "*");
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
