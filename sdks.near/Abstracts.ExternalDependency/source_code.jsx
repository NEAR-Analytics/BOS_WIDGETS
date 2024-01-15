const $ = VM.require("sdks.near/widget/Loader");
const { IframeDependency } = $("@sdks/abstracts");

return (props) => {
    const code = `
        <script type="text/javascript" src="https://unpkg.com/${props.package}"></script>
        <script type="text/javascript">
            window.top.postMessage(${props.name}, "*");
        </script>
   `;
  return <IframeDependency code={code} onUpdate={props.onCreate} />;
};
