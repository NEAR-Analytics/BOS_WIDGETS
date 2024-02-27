const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
State.init({
  cover: null,
});

if (!state.cover) {
  State.update({
    cover: styled[element]`
    ${styleSheet}`,
  });
}

const Cover = state.cover;

return <Cover class={styleClass}>{children}</Cover>;
