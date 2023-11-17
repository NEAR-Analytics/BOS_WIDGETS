const HelloC = () => <span id="hello-span">hello</span>;
const WorldC = () => (
  <>
    <div id="hello-parent-div">
      <span id="hello-parent-span">
        <HelloC id="hello-component" />!
      </span>
    </div>
    <h2>world</h2>
  </>
);

return (
  <div id="r">
    <WorldC id="world-component" />
  </div>
);
