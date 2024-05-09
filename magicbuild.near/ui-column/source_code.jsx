const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
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

return <Column class={`col ` + styleClass}>{children}</Column>;
