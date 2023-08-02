const data = props.data;
const onChange = props.onChange;
const height = props.height ?? "500px";

const code = `
<style>
#react-root {
    height: 100vh;
}
</style>
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
<script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
<script src="https://cdn.jsdelivr.net/highlight.js/latest/highlight.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/highlight.js/latest/styles/github.min.css">

<div id="react-root"></div>

<script>
function MarkdownEditor(props) {
    const [value, setValue] = React.useState(props.initialText || "");
    React.useEffect(() => {
        const simplemde = new SimpleMDE({
            element: document.getElementById('markdown-input'),
            autofocus: true,
            renderingConfig: {
                singleLineBreaks: false,
                codeSyntaxHighlighting: true,
            },
            showIcons: ["code", "table"],
        });

        simplemde.codemirror.on('change', () => {
            const content = simplemde.value();
            window.parent.postMessage({ content }, "*");
        });

        setValue(props.initialText || "");
    }, [props.initialText]);

    return React.createElement('textarea', { id: 'markdown-input', value: value });
}

const domContainer = document.querySelector('#react-root');
const root = ReactDOM.createRoot(domContainer);

window.addEventListener("message", (event) => {
    root.render(React.createElement(MarkdownEditor, {
        initialText: event.data.content,
    }));
});
</script>
`;
return (
  <iframe
    className="w-100"
    style={{
      height: height,
    }}
    srcDoc={code}
    message={data.content ?? ""}
    onMessage={(event) => {
      onChange({ content: event.data.content });
    }}
  />
);
