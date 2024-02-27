const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
State.init({
  columns: null,
});

if (!state.columns) {
  State.update({
    columns: styled[element]`
    ${styleSheet}`,
  });
}

const Columns = state.columns;

return <Columns class={"row " + styleClass}>{children}</Columns>;
