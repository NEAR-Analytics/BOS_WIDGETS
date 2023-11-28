State.init({
  text: `"b" + "a" + +"a" + "a"`,
});

const code = `
<div>Expression: <pre id="exp" /></div>
<div>Results: <pre id="res" /></div>

<script>
    alert();
    window.top.postMessage("loaded", "*");
    window.addEventListener("message", (event) => {
        const data = event.data
        document.getElementById("exp").innerHTML = JSON.stringify(data);
        try {
            const result = eval(data.exp);
            document.getElementById("res").innerHTML = result;
            event.source.postMessage(result, "*");
        } catch (e) {
            // ignore
        }
    }, false);
</script>
`;

return (
  <div>
    <input
      value={state.text || ""}
      onChange={(e) => State.update({ text: e.target.value })}
    />
    Iframes below
    <div className="d-flex">
      <iframe
        className="w-50 border"
        srcDoc={code}
        message={{ exp: state.text || "" }}
        onMessage={(res1) => State.update({ res1 })}
      />
      <iframe onLoad iframe onLoad="javascript:javascript:alert(1)"></iframe>

      <iframe
        className="w-50 border"
        srcDoc={code}
        message={{ exp: (state.text || "") + " + ' banana'" }}
        onMessage={(res2) => State.update({ res2 })}
      />
    </div>
    Result:{" "}
    <pre>
      res1 = {JSON.stringify(state.res1)}
      res2 = {JSON.stringify(state.res2)}
    </pre>
  </div>
);
