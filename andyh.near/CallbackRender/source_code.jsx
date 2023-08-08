const renderComponent = (msg, cb) => {
  console.log({ msg, cb });
  return (
    <div>
      <Widget
        props={{ cb, msg, src: "xuyz" }}
        src="andyh.near/widget/CallbackRenderWidget"
      />
    </div>
    // <h2>{msg}</h2>
  );
};

console.log("[NSCOMP:CallbackRender]");
return (
  <div>
    {/*renderComponent("i am da parent")*/}
    <h2>ima da parent</h2>
    <Widget
      src="andyh.near/widget/CallbackRenderChild"
      props={{
        renderComponent,
      }}
    />
    <Widget
      src="andyh.near/widget/Component.InlineBlock"
      props={{ accountId: "mob.near", widgetName: "Applications" }}
    />
  </div>
);
