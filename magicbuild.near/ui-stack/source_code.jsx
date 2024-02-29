const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";

State.init({
  stack: null,
  children: props.children || [],
  isEditor: props.isEditor,
});

const updateStateEditor = () => {
  State.update({
    isEditor: !state.isEditor,
  });
};

if (!state.stack) {
  State.update({
    stack: styled[element]`
    ${styleSheet}`,
  });
}

const Stack = state.stack;
// when user render how to get element without add button ?
return (
  <Stack class={"col " + styleClass}>
    <button type="button" onClick={updateStateEditor}>
      {"Collapse"}
    </button>
    {state.isEditor == true ? (
      <>
        <Widget
          src="magicbuild.near/widget/add-block-button"
          props={{
            selectWidget: (widgetUrl) => {
              const childrenColection = state.children;
              childrenColection.push({
                id: Date.now(),
                widgetUrl: widgetUrl,
                isEditor: true,
              });
              State.update({
                children: childrenColection,
              });
            },
          }}
        />
        {state.children &&
          state.children.map((widget) => (
            <Widget
              src={widget.widgetUrl}
              props={{ isEditor: widget.isEditor }}
            />
          ))}
      </>
    ) : (
      state.children &&
      state.children.map((widget) => (
        <Widget src={widget.widgetUrl} props={{ isEditor: widget.isEditor }} />
      ))
    )}
  </Stack>
);
