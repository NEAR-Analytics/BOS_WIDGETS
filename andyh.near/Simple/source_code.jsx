const Hello = () => <span id="hello-span">hello</span>;
const World = () => (
  <>
    <div id="hello-parent-div">
      <span id="hello-parent-span">
        <Hello id="hello-component" />
      </span>
    </div>
    <h2>world</h2>
  </>
);

return (
  <div id="r">
    <World id="world-component" />
  </div>
);
