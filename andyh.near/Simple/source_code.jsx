const HelloC = () => <span id="hello-span">hello</span>;
const WorldC = () => (
  <>
    <span id="hello-parent-span">
      <HelloC id="hello-component" />
    </span>
    <h2>world</h2>
  </>
);

return (
  <div id="r">
    <WorldC id="world-component" />
  </div>
);
