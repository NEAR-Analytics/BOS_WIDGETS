const Hello = () => <span>hello</span>;
const World = () => (
  <>
    <span id="hello-parent-span">
      <Hello />
    </span>
    world
  </>
);

return (
  <div id="r">
    <World id="world-component" />
  </div>
);
