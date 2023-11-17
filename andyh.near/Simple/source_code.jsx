const Hello = () => <span id="hello-span">hello</span>;
const World = () => (
  <>
    <div id="hello-parent-div">
      <span id="hello-parent-span">
        <Hello id="hello-component" />!<span>subspan!</span>
      </span>
    </div>
    <h2>world</h2>
  </>
);

return (
  <div id="r">
    <Hello id="hello-root-component" />
    <World id="world-component" />
    <World id="world-component-2" />
  </div>
);
