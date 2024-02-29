const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";

return (
  <Widget
    src="magicbuild.near/widget/ui-main"
    props={{
      styleClass: "col " + styleClass,
      styleSheet: styleSheet,
      action: [
        <button class="btn btn-sm btn-primary" onclick="">
          Change
        </button>,
      ],
    }}
  />
);
