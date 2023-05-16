const styledComponent = {
  width: "100vw",
  height: "100vw",
  background: "grey",
};

const stylesIframe = {
  width: "500px",
  height: "500px",
};

return (
  <div style={styledComponent}>
    <iframe
      src="https://signax.myhubs.net/Sb24GJq?embed_token=6302c47e2ab0442952098d31fce554bc"
      style={stylesIframe}
      allow="microphone; camera; vr; speaker;"
    ></iframe>
  </div>
);
