console.log({ props });
const component = props.renderComponent("i am the child", () =>
  console.log("all done")
);
const overlaid = <h2>overlaid!!</h2>;
return (
  <div>
    something really cool is loading:
    {component}
    <OverlayTrigger>{overlaid}</OverlayTrigger>
  </div>
);
