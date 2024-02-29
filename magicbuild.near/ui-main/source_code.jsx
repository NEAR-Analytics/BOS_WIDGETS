const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";
const isEditor = props.isEditor || true;

State.init({
  main: null,
  children: props.children || [],
  action: props.action || "",
  isRemove: props.isRemove || false,
});
const runAction = props.runAction ?? (() => {});
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
if (!state.main) {
  State.update({
    main: styled[element]`
    ${styleSheet}`,
  });
}

const Main = state.main;

return (
  <>
    {state.isRemove ? (
      ""
    ) : (
      <>
        <div class="d-flex justify-content-between">
          <div>
            {state.action &&
              state.action.map((actionBtn) => (
                <button
                  type="button"
                  class="btn btn-sm btn-info"
                  onClick={() => runAction(actionBtn.eventName)}
                >
                  {actionBtn.label}
                </button>
              ))}
          </div>

          <div>
            <button
              type="button"
              class="btn btn-sm  btn-light"
              onClick={updateStateEditor}
            >
              {state.isEditor ? (
                <i class="bi bi-caret-down-fill"></i>
              ) : (
                <i class="bi bi-caret-right-fill"></i>
              )}
            </button>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              onClick={removeChildren}
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
        <Main class={styleClass}>
          {isEditor == true ? (
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
        </Main>
      </>
    )}
  </>
);
