const initialText = "# Hello World\n\n";
State.init({
  m: initialText,
});

const code = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/react-markdown-editor-lite@1.3.4/lib/index.js" crossorigin></script>
<link rel="stylesheet" href="https://unpkg.com/react-markdown-editor-lite@1.3.4/lib/index.css" />


<div id="react-root"></div>

<script>
function TestReact(props) {
  const [value, setValue] = React.useState(props.forceClear ? "" : props.initialText || "");
  return React.createElement(ReactMarkdownEditorLite.default, {
      value,
      view: { menu: true, md: true, html: false },
      canView: { menu: true, md: false, html: false, fullScreen: false, hideMenu: true },
      onChange: ({ text }) => {
        props.forceClear && props.stateUpdate({ clearArticleBody: false })
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
    initialText: event.data,
  }));
});

</script>
`;

return (
  <div>
    <iframe
      className="w-100"
      style={{ height: "300px" }}
      srcDoc={code}
      message={initialText}
      onMessage={(m) => State.update({ m })}
    />
    <Markdown text={state.m} />
  </div>
);
