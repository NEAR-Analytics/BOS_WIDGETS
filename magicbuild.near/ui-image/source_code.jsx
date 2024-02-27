const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
State.init({
  imageUI: null,
});

if (!state.imageUI) {
  State.update({
    imageUI: styled[element]`
    ${styleSheet}`,
  });
}

const ImageUI = state.imageUI;

return <ImageUI class={styleClass}>{children}</ImageUI>;
