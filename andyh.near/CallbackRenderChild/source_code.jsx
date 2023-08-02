console.log({ props });
const component = props.renderComponent("i am the child", () =>
  console.log("all done")
);
return (
  <div>
    something really cool is loading:
    {component}
  </div>
);
