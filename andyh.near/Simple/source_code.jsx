const Hello = () => <span id="hello-span">hello</span>;
const World = (props) => (
  <>
    <div id="world-parent-div">
      <span id="world-parent-span">{props.renderComponent()}</span>
    </div>
    <h2 id="world-h2">world</h2>
  </>
);

return (
  <div id="r">
    <World
      id="world-component"
      renderComponent={() => <Hello id="hello-render-component" />}
    />
  </div>
);
