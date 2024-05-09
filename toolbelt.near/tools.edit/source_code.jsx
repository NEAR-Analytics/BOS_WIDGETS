const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to edit your homepage";
}

const toolbelt = context.accountId
  ? Social.get(`${context.accountId}/settings/commons.build/tools`)
  : undefined;

if (toolbelt === null) {
  return "";
}

const defaultTools = [
  "devs.near/widget/Feed",
  "hyperfiles.near/widget/app",
  "everycanvas.near/widget/index",
  "video.every.near/widget/app",
];

const settingTools = toolbelt && JSON.parse(toolbelt);

if (state.tools === undefined) {
  const tools = settingTools ?? defaultTools;
  State.update({ tools });
}

const move = (fromIndex, toIndex) => {
  const updatedTools = [...state.tools];
  const [removedTool] = updatedTools.splice(fromIndex, 1);
  updatedTools.splice(toIndex, 0, removedTool);

  State.update({ tools: updatedTools });
};

const openButton = ({ widgetPath: src, onHide }) => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        State.update((prevState) => ({
          tools: [src, ...prevState.tools],
        }));
        onHide();
      }}
    >
      <i className="bi bi-plus-lg" />
    </button>
  );
};

return (
  <div className="m-2">
    <div className="d-flex flex-row justify-content-between">
      <div className="mt-4">
        <h1>
          <b>Your Toolbelt</b>
        </h1>
      </div>
      <Widget
        src="toolbelt.near/widget/tools.view"
        props={{ tools: state.tools }}
      />
    </div>
    <hr />
    <div className="d-flex flex-row justify-content-between">
      <h3 className="m-2">Customize</h3>
      <div className="m-1">
        {settingTools &&
          JSON.stringify(state.tools) !== JSON.stringify(settingTools) && (
            <button
              className="ms-2 btn btn-outline-secondary"
              onClick={() => State.update({ tools: settingTools })}
            >
              Revert
            </button>
          )}
        {JSON.stringify(state.tools) !== JSON.stringify(defaultTools) && (
          <button
            className="ms-2 btn btn-outline-secondary float-end"
            onClick={() => State.update({ tools: defaultTools })}
          >
            Reset
          </button>
        )}
        <CommitButton
          data={{
            settings: {
              "commons.build": { tools: JSON.stringify(state.tools) },
            },
          }}
        >
          Save
        </CommitButton>
      </div>
    </div>
    <div className="m-2 mt-3">
      <Widget
        src="mob.near/widget/Welcome.RHS.Editor.ComponentSearch"
        props={{ extraButtons: openButton }}
      />
    </div>
    <br />
    {state.tools.map((tool, index) => (
      <div
        key={index}
        className="d-flex flex-row justify-content-between border rounded-4 p-3 mb-3"
      >
        <div>
          <div className="font-monospace mb-3">
            <a href={`/${tool}`}>{tool}</a>
          </div>
          <button
            className="btn btn-sm btn-primary"
            title="Move Up"
            disabled={index === 0}
            onClick={() => move(index, index - 1)}
          >
            <i className="bi bi-chevron-up" />
          </button>
          <button
            className="btn btn-sm btn-primary ms-1"
            title="Move Down"
            disabled={index + 1 === state.tools.length}
            onClick={() => move(index, index + 1)}
          >
            <i className="bi bi-chevron-down" />
          </button>
          <button
            className="btn btn-sm btn-danger ms-3"
            title="Remove"
            onClick={() => move(index, undefined)}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div>
          <Widget src="toolbelt.near/widget/tool.stars" props={{ src: tool }} />
        </div>
      </div>
    ))}
  </div>
);
