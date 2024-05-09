State.init({
  styleSheet: props.styleSheet || "",
  styleClass: props.styleClass || "",
  element: props.element || "div",
  children: props.children || [],
  action: [{ label: "Change", eventName: "A" }],
});

const updateState = (e) => {};

return (
  <>
    <Widget
      src="magicbuild.near/widget/ui-main"
      props={{
        styleClass: "col " + state.styleClass,
        styleSheet: state.styleSheet,
        children: state.children,
        action: state.action,
        runAction: (eventName) => {
          console.log("eventName", eventName);
        },
      }}
    />
  </>
);
