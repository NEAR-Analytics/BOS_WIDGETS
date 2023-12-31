const initialText = props.initialText ?? "# Hello World\n\n";
const clear = props.clearArticleBody ?? false;

const embedCss = props.embedCss || "";

const code = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/react-markdown-editor-lite@1.3.4/lib/index.js" crossorigin></script>
<link rel="stylesheet" href="https://unpkg.com/react-markdown-editor-lite@1.3.4/lib/index.css" />

<style>
${embedCss}
</style>

<div id="react-root"></div>

<script>
function TestReact(props) {
  const [value, setValue] = React.useState(props.initialText || "");
  
  React.useEffect(() => {
    if(props.clear) setValue(props.initialText)
  }, [props.initialText, props.clear])

  return React.createElement(ReactMarkdownEditorLite.default, {
      value,
      view: { menu: true, md: true, html: false },
      canView: { menu: true, md: false, html: false, fullScreen: false, hideMenu: true },
      onChange: ({ text }) => {
        setValue(text);
        window.top.postMessage(text, "*");
      },
      renderHTML: () => {},
      className: "full",
    }); 
}

const domContainer = document.querySelector('#react-root');
const root = ReactDOM.createRoot(domContainer);

window.addEventListener("message", (event) => {
  root.render(React.createElement(TestReact, {
    initialText: event.data.initialText,
    clear: event.data.clear,
  }));
});

</script>
`;

return (
  <iframe
    className="w-100 h-100"
    srcDoc={code}
    message={{ initialText, clear }}
    onMessage={props.onChange}
  />
);
