const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
const nested = props.nested || "2";
const type = props.type || "sm";
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

return (
  <Column class={`col-${type}-${nested} ` + styleClass}>{children}</Column>
);
