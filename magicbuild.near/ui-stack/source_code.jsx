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
  props.isEditor = false;
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
              const id = Date.now();
              const block = {
                [id]: (
                  <Widget
                    src={widgetUrl}
                    props={{
                      children: [],
                      isEditor: state.isEditor,
                    }}
                  />
                ),
              };
              Object.assign(blockList, block);
              State.update({
                children: childrenColection,
              });
            },
          }}
        />
        {Object.keys(state.children).map(
          (blockId, index) => state.children[blockId]
        )}
      </>
    ) : (
      <>
        {Object.keys(state.children).map(
          (blockId, index) => state.children[blockId]
        )}
      </>
    )}
  </Stack>
);
