const children = props.children;
const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
State.init({
  group: null,
});

if (!state.group) {
  State.update({
    group: styled[element]`
    ${styleSheet}`,
  });
}

const Group = state.group;

return <Group class={"container " + styleClass}>{children}</Group>;
