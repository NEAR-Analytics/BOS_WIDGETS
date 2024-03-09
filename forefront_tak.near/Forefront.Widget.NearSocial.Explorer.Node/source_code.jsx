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
const themeColor = props.themeColor;

State.init({
  expanded: false,
});

function handleExpand() {
  State.update({ expanded: !state.expanded });
}

function handleInto() {
  setPath(path);
  setHistory([...history, path]);
  setType(type);
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
  border: 2px outset ${themeColor?.nodes?.borderColor || "#333"};
  border-radius: 10px;
  background-color: ${themeColor?.nodes?.backgroundColor || "#f5f5f5"};
  cursor: pointer;
  color: ${themeColor?.nodes?.color || "#333"};
  ${{ ...themeColor?.overrideNodeStyles }}
`;

const ChildNode = styled.div`
  margin-left: ${path.split("/").length * 4}px
`;

function renderView() {
  // Root vs Leaf?
  return <Widget src="lord1.near/widget/View" props={{ path, type }} />;
}

function getType() {
  const parts = path.split("/");
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
        <div style={themeColor?.subject}>{label}</div>
      ) : (
        <Button onClick={handleExpand}>{state.expanded ? "-" : "+"}</Button>
      )}
      <Button onClick={handleInto}>{label}</Button>
    </div>
    {state.expanded && (
      <div>
        {/** EDGES */}
        {node && typeof node === "object" ? (
          Object.entries(node).map(([key, val]) => (
            <ChildNode>
              <Widget
                src="lord1.near/widget/Node"
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
                  themeColor: themeColor,
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
