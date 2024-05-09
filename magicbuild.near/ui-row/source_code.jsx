const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
State.init({
  row: null,
});

if (!state.row) {
  State.update({
    row: styled[element]`
    ${styleSheet}`,
  });
}

const Row = state.row;

return <Row class={"row " + styleClass}>{children}</Row>;
