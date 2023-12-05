State.init({
  text: `"b" + "a" + +"a" + "a"`,
});

const Game_Box = () => {
  const code = `
<div>Expression: <pre id="exp" /></div>
<div>Results: <pre id="res" /></div>

<script>
    window.top.postMessage("loaded", "*");
    window.addEventListener("message", (event) => {
        console.log(event);
        const data = event.data;
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
    <iframe
      className="w-50 h-50 mx-auto border"
      srcDoc={code}
      message={{ exp: state.text || "" }}
      onMessage={(res1) => State.update({ res1 })}
    />
  );
};

return (
  <div className="w-100 h-100 d-flex align-items-center">
    <Game_Box />
  </div>
);
