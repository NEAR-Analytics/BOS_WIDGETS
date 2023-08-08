/**
 * iframe embedding a SimpleMDE component
 * https://github.com/sparksuite/simplemde-markdown-editor
 */

function defaultOnChange(content) {
  console.log(content);
}

const data = props.data;
const onChange = props.onChange ?? defaultOnChange;
const height = props.height ?? "450";
const fontFamily = props.fontFamily ?? "Arial, sans-serif";
const fontSize = props.fontSize ?? "14px";

State.init({
  iframeHeight: height,
});

// SIMPLE MDE CONFIG //
const autoFocus = props.autoFocus ?? true;
const renderingConfig = JSON.stringify(
  props.renderingConfig ?? {
    singleLineBreaks: false,
    codeSyntaxHighlighting: true,
  }
);

// Add or remove toolbar items
// For adding unique items, configure the switch-case below
const toolbarConfig = JSON.stringify(
  props.toolbar ?? [
    "heading",
    "bold",
    "italic",
    "|", // adding | creates a divider in the toolbar
    "quote",
    "code",
    "link",
    "image",
    "mention",
    "reference",
    "unordered-list",
    "ordered-list",
    "checklist",
    "table",
    "horizontal-rule",
  ]
);

const code = `
<style>
#react-root {
    font-family: ${fontFamily};
    font-size: ${fontSize}; 
    overflow: "hidden"
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
        const generateToolbarItems = () => {
            return ${toolbarConfig}.map((item) => {
                switch(item) {
                    // CONFIGURE CUSTOM IMPLEMENTATIONS HERE
                    case "checklist": {
                        function handleChecklist(editor) {
                            const cursorPos = editor.codemirror.getCursor();
                            const lineText = editor.codemirror.getLine(cursorPos.line);
                            if (lineText.trim() === "") {
                                editor.codemirror.replaceRange(" - [ ] ", cursorPos);
                            } else {
                                editor.codemirror.replaceRange("\\n - [ ] ", cursorPos);
                            }
                        }
                        return {
                            name: "checklist",
                            action: handleChecklist,
                            className: "fa fa-check-square",
                            title: "Insert Checklist"
                        }
                    }
                    case "mention": {
                        function handleMention(editor) {
                            const cursorPos = editor.codemirror.getCursor();
                            editor.codemirror.replaceRange("@", cursorPos);
                        }
                        return {
                            name: "mention",
                            action: handleMention,
                            className: "fa fa-at",
                            title: "Insert Mention"
                        }
                    }
                    case "reference": {
                        function handleReference(editor) {
                            const cursorPos = editor.codemirror.getCursor();
                            editor.codemirror.replaceRange("bos://", cursorPos);
                        }
                        return {
                            name: "reference",
                            action: handleReference,
                            className: "fa fa-external-link-square",
                            title: "Reference Thing"
                        }
                    }
                    case "image": {
                        // TODO: convert to upload to IPFS
                        return {
                            name: "image",
                            action: SimpleMDE.drawImage,
                            className: "fa fa-picture-o",
                            title: "Insert Image"
                        }
                    }
                    default: {
                        return item;
                    }
                }
            });
        };
        
        const simplemde = new SimpleMDE({
            element: document.getElementById("markdown-input"),
            autofocus: ${autoFocus},
            renderingConfig: ${renderingConfig},
            toolbar: generateToolbarItems(),
            initialValue: value,
        });

        const updateIframeHeight = () => {
            const iframeHeight = document.body.scrollHeight;
            window.parent.postMessage({ handler: "resize", height: iframeHeight }, "*");
        };

        simplemde.codemirror.on('change', () => {
            const content = simplemde.value();
            window.parent.postMessage({ handler: "update", content }, "*");
            updateIframeHeight();
        });
    }, []);

    return React.createElement('textarea', { id: 'markdown-input', value: value, onChange: setValue });
}

const domContainer = document.querySelector('#react-root');
const root = ReactDOM.createRoot(domContainer);

window.addEventListener("message", (event) => {
    root.render(React.createElement(MarkdownEditor, {
        initialText: event.data.content }));
});
</script>
`;
return (
  <iframe
    className="w-100"
    style={{
      height: `${state.iframeHeight}px`,
    }}
    srcDoc={code}
    message={data.content ?? ""}
    onMessage={(e) => {
      switch (e.handler) {
        case "update": {
          onChange(e.content);
        }
        case "resize": {
          State.update({ iframeHeight: e.height + 20 });
        }
      }
    }}
  />
);
