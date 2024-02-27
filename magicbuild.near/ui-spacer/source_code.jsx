const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
State.init({
  spacer: null,
});

if (!state.spacer) {
  State.update({
    spacer: styled[element]`
    ${styleSheet}`,
  });
}

const Spacer = state.spacer;

return <Spacer class={styleClass}>{children}</Spacer>;
