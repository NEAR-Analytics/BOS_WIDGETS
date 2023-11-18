const Hello = () => <span id="hello-span">hello</span>;
const World = () => (
  <div id="world-root">
    <div id="world-parent-div">
      <span id="world-parent-span">
        <Hello id="hello-component" />
      </span>
    </div>
    {/*<h2 id="world-h2">world</h2>*/}
  </div>
);

return (
  <div id="r">
    <World id="world-component" />
  </div>
);
