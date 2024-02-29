const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
console.log(props.isEditor);
State.init({
  stack: null,
  children: props.children || [],
  isEditor: props.isEditor || true,
  childListSave: [],
});

const collapseWidget = () => {
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
    <button type="button" onClick={collapseWidget}>
      {"Collapse"}
    </button>
    <button type="button" class="btn btn-danger" onClick={updateStateEditor}>
      {"Remove"}
    </button>
    {state.isEditor == true ? (
      <>
        <Widget
          src="magicbuild.near/widget/add-block-button"
          props={{
            selectWidget: (widgetUrl) => {
              const childrenColection = state.children;
              childrenColection.push({
                isEditor: true,
                element: (
                  <Widget
                    src={widgetUrl}
                    props={{
                      children: [],
                      isEditor: state.isEditor,
                    }}
                  />
                ),
              });
              State.update({
                children: childrenColection,
              });
            },
          }}
        />
        {state.children && state.children.map((widget) => widget.element)}
      </>
    ) : (
      state.children && state.children.map((widget) => widget.element)
    )}
  </Stack>
);
