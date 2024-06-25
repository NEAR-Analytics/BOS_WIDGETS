if (typeof props.path !== "string") return "send {path} as string in props";

State.init({
  selectedBlockHeight: null,
});

const historyBlocksRequest = Social.keys(`${props.path}`, "final", {
  return_type: "History",
});

if (historyBlocksRequest === null) return "loading...";

const [accountId, typeId, thingId] = props.path.split("/");

let blocksChanges = historyBlocksRequest[accountId]?.[typeId]?.[thingId];

if (props.count) props.count(blocksChanges.length);

if (blocksChanges) blocksChanges = blocksChanges?.sort((a, b) => b - a);

if (!state.selectedBlockHeight) state.selectedBlockHeight = blocksChanges[0];

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

function blockHeightToWidgetRender(blockHeight) {
  const index = blocksChanges.findIndex((el) => el == blockHeight);
  return (
    <Widget
      style={{ minHeight: "200px" }}
      key={blockHeight}
      src={`bozon.near/widget/WidgetHistory.RenderCode`}
      props={{
        pathToWidget: props.path,
        currentBlockHeight: blockHeight,
        prevBlockHeight: blocksChanges[index + 1],
      }}
    />
  );
}

return (
  <div>
    {!blocksChanges ? (
      <div>invalid path</div>
    ) : (
      <div>{blockHeightToWidgetRender(state.selectedBlockHeight)}</div>
    )}
  </div>
);
