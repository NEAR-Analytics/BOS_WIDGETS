const Hello = () => <span id="hello-span">hello</span>;
const World = () => (
  <>
    <div id="world-parent-div">
      <span id="world-parent-span">
        <Hello id="hello-component" />
      </span>
    </div>
    {/*<h2 id="world-h2">world</h2>*/}
  </>
);

return (
  <div id="r">
    <World id="world-component" />
  </div>
);
