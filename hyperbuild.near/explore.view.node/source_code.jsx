const key = props.key;
const label = props.label;
const node = props.node;
const type = props.type;
const path = props.path;
const setPath = props.setPath;
const history = props.history;
const setHistory = props.setHistory;
const setType = props.setType;
const isRoot = props.isRoot;
const styles = {
  subject: {
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold", // Bold text
    cursor: "pointer",
  },
};

State.init({
  expanded: false,
});
function handleExpand() {
  State.update({ expanded: !state.expanded });
}
function handleInto() {
  // Check if node is an object and not null
  if (node && typeof node === "object") {
    setPath(path);
    setHistory([...history, path]);
    setType(type);
  } else {
    console.error("Invalid node structure");
  }
}
function handleBack() {
  const newPath = history[history.length - 2] || "";
  setPath(newPath);
  setHistory(history.slice(0, -1));
}
// Basic Button Style
const Button = styled.button`
  text-transform: lowercase !important;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  border: 2px outset #333;
  background-color: #f5f5f5;
  cursor: pointer;
  color: #333;
`;
const ChildNode = styled.div`
  margin-left: ${String(path).split("/").length * 4}px;
`;
function renderView() {
  // Root vs Leaf?
  return <Widget src="efiz.near/widget/View" props={{ path, type }} />;
}
function getType() {
  const parts = String(path).split("/");
  if (parts.length === 1) {
    return "account";
  } else if (parts.length === 2) {
    return parts[1];
  } else {
    const standard = parts[1];
    if (standard === "thing") {
      // We're gonna grab the type from the thing itself
    }
    return standard;
  }
}

return (
  <div>
    <div>
      {/** CONTROLLER */}
      {history.length > 1 && isRoot && (
        <Button onClick={handleBack}>back</Button>
      )}
      {isRoot ? (
        <div style={styles?.subject}>{label} (root)</div>
      ) : (
        <div style={styles?.subject}>{path}</div>
      )}
      <Button onClick={handleExpand}>{state.expanded ? "-" : "+"}</Button>
    </div>
    {state.expanded && (
      <div>
        {/** EDGES */}
        {node && typeof node === "object" ? (
          Object.entries(node).map(([key, val]) => (
            <ChildNode>
              <Widget
                src="hyperbuild.near/widget/explore.view.node"
                props={{
                  key,
                  label: key,
                  node: val,
                  type: getType(),
                  path: `${path}/${key}`,
                  setPath: setPath,
                  history,
                  setHistory: setHistory,
                  isRoot: false,
                }}
              />
            </ChildNode>
          ))
        ) : (
          <>
            {/** VIEW */}
            <div>{renderView()}</div>
          </>
        )}
      </div>
    )}
  </div>
);
