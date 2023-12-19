const [inputSourceCode, setInputSourceCode] = useState("");
const [inputSourceCodeLang, setInputSourceCodeLang] = useState("typescript");

if (!props.sourceCodeBase64) {
  return (
    <div>
      <h1>Prettify My Code</h1>
      <p>
        <label>
          <p>Paste your code here:</p>
          <textarea
            cols={60}
            rows={20}
            onChange={(e) => setInputSourceCode(e.target.value)}
          ></textarea>
        </label>
      </p>
      <p>
        <label>
          Programming Language:{" "}
          <input
            type="text"
            value={inputSourceCodeLang}
            onChange={(e) => setInputSourceCodeLang(e.target.value)}
          />
        </label>
      </p>
      {inputSourceCode ? (
        <p>
          <a
            target="_blank"
            href={`/${
              context.widgetSrc
            }?sourceCodeLang=${inputSourceCodeLang}&sourceCodeBase64=${encodeURIComponent(
              btoa(inputSourceCode)
            )}`}
          >
            Share this link
          </a>
        </p>
      ) : null}
    </div>
  );
}

const sourceCode = atob(props.sourceCodeBase64);
const sourceCodeLang = props.sourceCodeLang || "typescript";

const Theme = styled.div`
.terminal {
    border-radius: 5px 5px 0 0;
    position: relative;
    width: 800px;
    height: 634px;
}
.terminal .top {
    background: #242424;
    color: black;
    padding: 5px;
    border-radius: 5px 5px 0 0;
}
.terminal .btns {
    position: absolute;
    top: 5px;
    left: 5px;
}
.terminal .circle {
    width: 12px;
    height: 12px;
    display: inline-block;
    border-radius: 15px;
    margin-left: 2px;
    border-width: 1px;
    border-style: solid;
}
.title{
    text-align: center;
    color: #808080;
    font-weight: 600;
    font-size: 0.9em;
}
.red { background: #EC6A5F; border-color: #D04E42; }
.green { background: #64CC57; border-color: #4EA73B; }
.yellow{ background: #F5C04F; border-color: #D6A13D; }
.terminal .body {
    background: #0d1117;
    color: #7AFB4C;
    padding: 8px;
    overflow: auto;
}
.space {
    margin: 25px;
}
.shadow { box-shadow: 0px 0px 10px rgba(0,0,0,.4)}
`;

return (
  <Theme>
    <div className="terminal space shadow">
      <div className="top">
        <div className="btns">
          <span className="circle red"></span>
          <span className="circle yellow"></span>
          <span className="circle green"></span>
        </div>
        <div className="title">NEAR is BOS</div>
      </div>
      <iframe
        style={{
          height: "600px",
          width: "800px",
          backgroundColor: "#0d1117",
          overflowX: "scroll",
          overflowY: "scroll",
        }}
        srcDoc={`
<style>
html, body, pre, code {
  margin: 0;
}
.hljs {
  overflow-x: unset !important;
}
</style>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

<!-- and it's easy to individually load additional languages -->
<!--script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"></script-->

<pre><code class="language-${sourceCodeLang}">${sourceCode.trim()}</code></pre>
<script>hljs.highlightAll();</script>
`}
      />
    </div>
  </Theme>
);
