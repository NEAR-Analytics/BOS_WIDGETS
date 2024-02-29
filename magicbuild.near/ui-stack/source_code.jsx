State.init({
  styleSheet: props.styleSheet || "",
  styleClass: props.styleClass || "",
  element: props.element || "div",
  children: props.children || [],
  action: [
    {
      label: <i class="bi bi-align-start"></i>,
      eventName: "algin-start",
      type: "button",
    },
    {
      label: <i class="bi bi-align-center"></i>,
      eventName: "align-center",
      type: "button",
    },
    {
      label: <i class="bi bi-align-end"></i>,
      eventName: "algin-end",
      type: "button",
    },
  ],
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
