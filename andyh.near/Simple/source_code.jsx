const Hello = () => <span id="hello-span">hello</span>;
const World = () => (
  <>
    <span id="hello-parent-span">
      <Hello id="hello-component" />
    </span>
    <h2>world</h2>
  </>
);

return (
  <div id="r">
    <World id="world-component" />
  </div>
);
