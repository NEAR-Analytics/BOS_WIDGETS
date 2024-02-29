const element = props.element || "div";
const styleSheet = props.styleSheet || "";
const styleClass = props.styleClass || "";

State.init({
  main: null,
  children: props.children || [],
  action: props.action || "",
  isEditor: props.isEditor || true,
  isRemove: props.isRemove || false,
});
console.log("styleClass", styleClass);
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
      <Main class={styleClass}>
        <div class="d-flex justify-content-between">
          <div>
            {state.action &&
              state.action.map((actionBtn) => (
                <button onClick={runAction}>{actionBtn.label}</button>
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
      </Main>
    )}
  </>
);
