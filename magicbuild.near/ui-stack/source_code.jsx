State.init({
  styleSheet: props.styleSheet || "",
  styleClass: props.styleClass || "",
  element: props.element || "div",
  children: props.children || [],
  action: [
    {
      label: <i class="bi bi-align-start"></i>,
      eventName: "justify-content-start",
      type: "button",
    },
    {
      label: <i class="bi bi-align-center"></i>,
      eventName: "justify-content-center",
      type: "button",
    },
    {
      label: <i class="bi bi-align-end"></i>,
      eventName: "justify-content-end",
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
          if (eventName == "justify-content-start") {
            State.update({ styleClass: "d-flex justify-content-start" });
          }
          if (eventName == "justify-content-center") {
            State.update({ styleClass: "d-flex justify-content-center" });
          }
          if (eventName == "justify-content-end") {
            State.update({ styleClass: "d-flex justify-content-end" });
          }
          console.log("eventName", eventName);
        },
      }}
    />
  </>
);
