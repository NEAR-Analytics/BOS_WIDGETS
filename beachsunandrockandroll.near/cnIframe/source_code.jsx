const ClassnameConf = ({ className, output }) => {
  const srcDoc = `
    <script type="module"> 
      import mxcn from "https://cdn.jsdelivr.net/npm/mxcn@2.0.0/+esm"
        
      window.addEventListener("message", ({ data }) => {
        try {
          event.source.postMessage(mxcn(data.className), "*");
        } catch (e) {}
      }, false);
    </script>
  `;

  return (
    <iframe
      className="d-none"
      srcDoc={srcDoc}
      message={{ className }}
      onMessage={output}
    />
  );
};

return { ClassnameConf };
