const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";

State.init({
  stack: null,
  children: props.children || [],
  isEditor: props.isEditor || true,
});
const updateStateEditor =
  props.selectWidget ??
  (() => {
    State.update({ isEditor: !state.isEditor });
  });

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
      {"off"}
    </button>
    {state.isEditor == true ? (
      <>
        <Widget
          src="magicbuild.near/widget/add-block-button"
          props={{
            selectWidget: (widgetUrl) => {
              const childrenColection = state.children;
              childrenColection.push(
                <Widget
                  src={widgetUrl}
                  props={{ children: ["123123"], isEditor: state.isEditor }}
                />
              );
              State.update({
                children: childrenColection,
              });
            },
          }}
        />
        {state.children && state.children.map((widget) => widget)}
      </>
    ) : (
      state.children && state.children.map((widget) => widget)
    )}
  </Stack>
);
