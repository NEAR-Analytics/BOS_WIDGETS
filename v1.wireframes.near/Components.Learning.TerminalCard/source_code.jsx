/* -------------------------------------------------------------------------- */
/*
 __        ___           __                               
 \ \      / (_)_ __ ___ / _|_ __ __ _ _ __ ___   ___  ___ 
  \ \ /\ / /| | '__/ _ \ |_| '__/ _` | '_ ` _ \ / _ \/ __|
   \ V  V / | | | |  __/  _| | | (_| | | | | | |  __/\__ \
    \_/\_/  |_|_|  \___|_| |_|  \__,_|_| |_| |_|\___||___/

  =========================================================
  * Wireframes - v1.0.0
  =========================================================
  * Product Page: https://wireframes.design
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

                                                                                 */
/* -------------------------------------------------------------------------- */
const text = props.text || "";
const state = props.state || "";

const code = `
  <style>
  html, body, #container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    max-height:80vh;
    min-height:40vh;
    margin: 0;
    padding: 0;
  }
  </style>
  <div id="container"></div>
  <script src="https://unpkg.com/monaco-editor@latest/min/vs/loader.js"></script>
  <script>
  require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' }});
  window.MonacoEnvironment = { getWorkerUrl: () => proxy };
  let proxy = URL.createObjectURL(new Blob(['self.MonacoEnvironment = {baseUrl: "https://unpkg.com/monaco-editor@latest/min/" };importScripts("https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js")'], { type: 'text/javascript' }));
  
  let code;
  let editor;
  window.addEventListener("message", (e) => {
      try { 
        code = JSON.parse(e.data).code 
        if (editor) {
          editor.getModel().setValue(code)
          document.body.style.opacity = 1;
        }
      } catch {}
  })
  
  require(["vs/editor/editor.main"], function () {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: false,
          noSyntaxValidation: false,
          noSuggestionDiagnostics: false,
          diagnosticCodesToIgnore: [1108],
      });  
  
      editor = monaco.editor.create(document.getElementById('container'), {
        value: ${JSON.stringify(text)}, // Set your default code here,
        fixedOverflowWidgets: true,
        language: 'javascript',
        width: '100%',
        fontSize: 16,
        theme: 'vs-dark',
        readOnly: true,  
      });
  
      editor.getModel().onDidChangeContent(e => {
        parent.postMessage(editor.getModel().getValue(), "*")
      })
  
      if (code) {
        document.body.style.opacity = 1;
        editor.getModel().setValue(code)
      }
  });
  </script>
  `;

const StyledPre = styled.pre`
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.6;
  margin-bottom: 0.6em;
  max-width: 100%;

  display: flex;
  word-wrap: break-word;
  height: 50vh;
  max-width: 80vw;
  margin: auto;
  max-height: 80vh;
  min-height: 20vh;
  position: relative;
`;

const PreComponent = ({ children }) => {
  return <StyledPre>{children}</StyledPre>;
};

return (
  <>
    <PreComponent>
      <iframe
        srcDoc={code}
        style={{
          width: "100%",
          position: "absolute",
          top: "0",
          height: "calc(100vh)",
          zIndex: 1,
        }}
      />
      {state.script == null && openScript(true)}
    </PreComponent>
  </>
);
