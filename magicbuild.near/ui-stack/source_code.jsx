const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";

State.init({
  stack: null,
  children: props.children || [],
  isEditor: props.isEditor || true,
  isRemove: props.isRemove || false,
});

const updateStateEditor = () => {
  State.update({
    isEditor: !state.isEditor,
  });
};
const removeChildren = () => {
  State.update({
    isRemove: !state.isRemove,
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
  <>
    {state.isRemove ? (
      ""
    ) : (
      <Stack class={"col " + styleClass}>
        <button type="button" onClick={updateStateEditor}>
          {"Collapse"}
        </button>
        <button type="button" class="btn btn-danger" onClick={removeChildren}>
          {"Remove"}
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
                      props={{
                        children: [],
                        isEditor: state.isEditor,
                      }}
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
    )}
  </>
);
