const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
State.init({
  code: null,
});

if (!state.code) {
  State.update({
    code: styled[element]`
    ${styleSheet}`,
  });
}

const Code = state.code;

return <Code class={styleClass}>{children}</Code>;
