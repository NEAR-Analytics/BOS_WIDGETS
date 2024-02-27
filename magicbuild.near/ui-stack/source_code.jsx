const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
State.init({
  stack: null,
});

if (!state.stack) {
  State.update({
    stack: styled[element]`
    ${styleSheet}`,
  });
}

const Stack = state.stack;

return <Stack class={"col " + styleClass}>{children}</Stack>;
