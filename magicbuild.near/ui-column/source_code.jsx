const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
const nested = props.nested || "";
State.init({
  column: null,
});

if (!state.column) {
  State.update({
    column: styled[element]`
    ${styleSheet}`,
  });
}

const Column = state.column;

return <Column class={`col-sm-${nested} ` + styleClass}>{children}</Column>;
