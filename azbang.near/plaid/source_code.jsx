State.init({
  origin: "",
});

const src = `
<script>
const origin = document.location.ancestorOrigins[0];
window.top.postMessage(origin, "*")
</script>
`;

return (
  <div>
    <p>
      {state.origin}/{context.widgetSrc}
    </p>
    <a href={`http://localhost:3000?`}>Connect bank</a>

    <iframe
      style={{ display: "none" }}
      onMessage={(origin) => {
        console.log(origin);
        State.update({ origin });
      }}
      srcDoc={src}
    ></iframe>
  </div>
);
