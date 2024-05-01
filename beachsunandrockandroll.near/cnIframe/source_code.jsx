const srcDoc = `
<script type="module"> 
    import mxcn from "https://cdn.jsdelivr.net/npm/mxcn@2.0.0/+esm"
    
    window.top.postMessage("loaded", "*");
    window.addEventListener("message", ({ data }) => {
        try {
            event.source.postMessage(mxcn(data.className), "*");
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
    }}
    onMessage={props.output}
  />
);
