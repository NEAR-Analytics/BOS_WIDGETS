const sourceCode = props.sourceCodeBase64
  ? atob(props.sourceCodeBase64)
  : "// Hint: Provide source code via `sourceCodeBase64` prop";
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
    <div class="terminal space shadow">
      <div class="top">
        <div class="btns">
          <span class="circle red"></span>
          <span class="circle yellow"></span>
          <span class="circle green"></span>
        </div>
        <div class="title">NEAR is BOS</div>
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
