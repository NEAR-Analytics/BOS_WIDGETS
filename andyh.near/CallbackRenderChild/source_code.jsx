console.log("[NSCOMP:CallbackRenderChild]");
return (
  <div>
    something really cool is loading:
    {await props.renderComponent("i am the child")}
  </div>
);
// return <div>i am the child</div>;
