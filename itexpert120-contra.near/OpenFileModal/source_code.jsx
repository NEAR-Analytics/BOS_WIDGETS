const onOpenFile = props.onOpenFile;

State.init({
  path: "",
});

return (
  <div>
    <div className="mb-3">
      <label htmlFor="path">Path</label>
      <input
        name="path"
        id="path"
        value={state.path}
        onChange={(e) => State.update({ path: e.target.value })}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="blockHeight">Block Height</label>
      <input
        name="blockHeight"
        id="blockHeight"
        value={state.blockHeight}
        onChange={(e) => State.update({ blockHeight: e.target.value })}
      />
    </div>
    <button onClick={() => onOpenFile(state.path, parseInt(state.blockHeight))}>
      Open File
    </button>
  </div>
);
