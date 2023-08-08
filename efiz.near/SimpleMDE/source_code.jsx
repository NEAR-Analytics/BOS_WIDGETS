/**
 * iframe embedding a SimpleMDE component
 * https://github.com/sparksuite/simplemde-markdown-editor
 */
const data = props.data;
const onChange = props.onChange;
const height = props.height ?? "500px";

function togglePreview() {
  State.update({ showPreview: !state.showPreview });
}
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
        // edit options here
        const simplemde = new SimpleMDE({
            element: document.getElementById("markdown-input"),
            autofocus: true,
            renderingConfig: {
                singleLineBreaks: false,
                codeSyntaxHighlighting: true,
            },
            toolbar: ["heading", "bold", "italic", "quote", "code", "link", "unordered-list", "ordered-list",
                {
                    name: "custom",
                    action: function customFunction(editor){
                        
                        const cursorPos = editor.codemirror.getCursor();
                        const lineText = editor.codemirror.getLine(cursorPos.line);
                        if (lineText.trim() === "") {
                            editor.codemirror.replaceRange('- [ ] ', cursorPos);
                        } else {
                            editor.codemirror.replaceRange('\\n - [ ] ', cursorPos);
                        }
                    },
                    className: "fa fa-star",
                    title: "Custom Button",
                },
                {
                    name: 'upload',
                    action: () => this.showDialogUpload(),
                    className: 'fa fa-upload',
                    title: 'Upload File',
                },
                {
                    name: 'table',
                    action: SimpleMDE.drawTable,
                    className: 'fa fa-table',
                    title: 'Insert Table',
                },
                {
                    name: 'preview',
                    action: () => {window.parent.postMessage({ handler: "preview" }, "*")},
                    className: 'fa fa-eye no-disable',
                    title: 'Toggle Preview',
                }, {
                    name: 'side-by-side',
                    action: SimpleMDE.toggleSideBySide,
                    className: 'fa fa-columns no-disable ',
                    title: 'Toggle Side by Side',
                }, {
                    name: 'fullscreen',
                    action: SimpleMDE.toggleFullScreen,
                    className: 'fa fa-arrows-alt no-disable',
                    title: 'Toggle Fullscreen',
                }   
            ],
        });

        simplemde.codemirror.on('change', () => {
            const content = simplemde.value();
            window.parent.postMessage({ handler: "update", content }, "*");
            setValue(simplemde.value());
        });

        setValue(props.initialText || "");
    }, []);

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
  <>
    {state.showPreview ? (
      <Widget
        src="efiz.near/widget/SocialMarkdown"
        props={{ text: data.content }}
      />
    ) : (
      <iframe
        className="w-100"
        style={{
          height: height,
        }}
        srcDoc={code}
        message={data.content ?? ""}
        onMessage={(e) => {
          console.log(e.handler);
          switch (e.handler) {
            case "update": {
              onChange(event.content);
            }
            case "preview": {
              togglePreview();
            }
          }
        }}
      />
    )}
  </>
);
