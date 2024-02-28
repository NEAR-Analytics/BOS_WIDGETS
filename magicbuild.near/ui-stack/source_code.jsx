const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
State.init({
  stack: null,
  children: props.children || "",
});

if (!state.stack) {
  State.update({
    stack: styled[element]`
    ${styleSheet}`,
  });
}

const Stack = state.stack;

return (
  <Stack class={"col " + styleClass}>
    <Widget
      src="magicbuild.near/widget/add-block-button"
      props={{
        selectWidget: (widgetUrl) => {
          State.update({
            children: <Widget src={widgetUrl} />,
          });
        },
      }}
    />
    {state.children}
  </Stack>
);
