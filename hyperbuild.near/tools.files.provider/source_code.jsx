const path = props.path || context.accountId;
if (!path) return <p>Please login.</p>;
const getSecretKey = () => {
  const accountId = context.accountId;
  if (!accountId) {
    return null;
  }
  const registeredPublicKey = Social.get(
    `${accountId}/private_message/public_key`
  );
  const savedSecretKeyBase64 = Storage.privateGet("secretKey");

  if (savedSecretKeyBase64 === null || registeredPublicKey === null) {
    return null;
  }

  return savedSecretKeyBase64;
};

const savedSecretKeyBase64 = getSecretKey();
if (!savedSecretKeyBase64) {
  return "Enter a Secret Key or Password to unlock your files.";
}
State.init({
  layout: "LIST",
  path,
  history: [path],
  currentHistoryIndex: 0,
  showPreview: false,
  selectedPath: "",
  filesSource: "BOS_IPFS",
  decryptSk: new Uint8Array(Buffer.from(savedSecretKeyBase64, "base64")), // Convert base64 to Uint8Array
});
function isNearAccount(str) {
  return typeof str === "string" && str.endsWith(".near");
}
function setPath(v) {
  const updatedHistory = state.history
    .slice(0, state.currentHistoryIndex + 1)
    .concat(v);
  const parts = v.split("/");
  const lastPart = parts[parts.length - 1];
  if (isNearAccount(lastPart)) {
    v = lastPart;
  }
  State.update({
    path: v,
    history: updatedHistory,
    currentHistoryIndex: updatedHistory.length - 1,
  });
}
function setFilesSource(source) {
  State.update({
    filesSource: source,
  });
  console.log("File source set to:", state.filesSource);
}
function goBack() {
  // Check if we can go back
  if (state.currentHistoryIndex > 0) {
    const newIndex = state.currentHistoryIndex - 1;
    State.update({
      currentHistoryIndex: newIndex,
      path: state.history[newIndex],
    });
  }
}
function goForward() {
  // Check if we can go forward
  if (state.currentHistoryIndex < state.history.length - 1) {
    const newIndex = state.currentHistoryIndex + 1;
    State.update({
      currentHistoryIndex: newIndex,
      path: state.history[newIndex],
    });
  }
}
function setSelectedPath(v) {
  State.update({ selectedPath: v });
}
function setHistory(v) {
  State.update({ history: v });
}
function setLayout(v) {
  State.update({ layout: v });
}
function togglePreview() {
  State.update({ showPreview: !state.showPreview });
}
const Children = props.Children;
return (
  <Children
    setPath={setPath}
    setFilesSource={setFilesSource}
    setHistory={setHistory}
    setLayout={setLayout}
    showPreview={state.showPreview}
    togglePreview={togglePreview}
    selectedPath={state.selectedPath}
    setSelectedPath={setSelectedPath}
    path={state.path}
    layout={state.layout}
    goBack={goBack}
    goForward={goForward}
    decryptSk={state.decryptSk} // Ensure decryptSk is passed here
  />
);
