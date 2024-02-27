const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
State.init({
  paragraph: null,
});

if (!state.paragraph) {
  State.update({
    paragraph: styled[element]`
    ${styleSheet}`,
  });
}

const Paragraph = state.paragraph;

return <Paragraph class={styleClass}>{children}</Paragraph>;
