const Hello = () => <span id="hello-span">hello</span>;
const World = (props) => (
  <>
    <div id="world-parent-div">
      <span id="world-parent-span">{props.renderComponent()}</span>
    </div>
    <h2 id="world-h2">world</h2>
    <div id="markdown">{props.rendermd()}</div>
  </>
);

return (
  <div id="r">
    <World
      id="world-component"
      rendercomponent={() => <Hello id="hello-render-component" />}
      rendermd={() => <Widget src="andyh.near/Markdown" />}
    />
  </div>
);
