/*
---props---

widgetPath: string,
count(count: number)?: function,

*/
const Container = styled.div`
.card-header{
    background: rgba(26,46,51,0.3);
    color:#fff;
}
.list-group-item{
    background: rgba(26,46,51,0.25);
    border: 0.5px solid rgba(255,255,255,0.3);
    color: #fff;
}
.list-group-item-info.list-group-item-action:hover, .list-group-item-info.list-group-item-action:focus{
    background:#304352;
    color: #fff;
}
`;

if (typeof props.widgetPath !== "string")
  return "send {widgetPath} as string in props";

State.init({
  selectedTab: "code",
  selectedBlockHeight: null,
});

const historyBlocksRequest = Social.keys(`${props.widgetPath}`, "final", {
  return_type: "History",
});

if (historyBlocksRequest === null) return "loading...";

const [widgetAccountId, _, widgetName] = props.widgetPath.split("/");

let blocksChanges =
  historyBlocksRequest[widgetAccountId]?.["widget"]?.[widgetName];

if (props.count) props.count(blocksChanges.length);

if (blocksChanges) blocksChanges = blocksChanges?.sort((a, b) => b - a);

if (!state.selectedBlockHeight) state.selectedBlockHeight = blocksChanges[0];

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

const renderBlockChangesLink = (blockHeight) => {
  return (
    <div>
      <button
        className={`list-group-item list-group-item-action ${
          state.selectedBlockHeight != blockHeight ? "" : "list-group-item-info"
        }`}
        onClick={() => {
          State.update({ selectedBlockHeight: blockHeight });
        }}
      >
        #{blockHeight} * {getDatastringFromBlockHeight(blockHeight)}
      </button>
    </div>
  );
};

function blockHeightToWidgetCode(blockHeight) {
  const index = blocksChanges.findIndex((el) => el == blockHeight);
  return (
    <div class="mb-3">
      <Widget
        key={blockHeight}
        src={`bozon.near/widget/WidgetHistory.CodeHistoryCard`}
        props={{
          pathToWidget: props.widgetPath,
          currentBlockHeight: blockHeight,
          prevBlockHeight: blocksChanges[index + 1],
        }}
      />
    </div>
  );
}

function blockHeightToWidgetRender(blockHeight) {
  const index = blocksChanges.findIndex((el) => el == blockHeight);
  return (
    <Widget
      style={{ minHeight: "200px" }}
      key={blockHeight}
      src={`bozon.near/widget/WidgetHistory.RenderCode`}
      props={{
        pathToWidget: props.widgetPath,
        currentBlockHeight: blockHeight,
        prevBlockHeight: blocksChanges[index + 1],
      }}
    />
  );
}

//styles forked from calebjacob.near/widget/Activity
const Tabs = styled.div`
  display: flex;
  padding: 0 12px;
  height: 54px;
  border-bottom: 2px solid #1E373D;
`;

const TabsButton = styled.button`
 font-weight: 500;
  font-size: 16px;
  padding: 0 12px;
  position: relative;
  color: #fff;
  background: none;
  border: none;
  outline: none;
  &::after {
    content: '';
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 4px;
    background: #00FFD1;
  }
`;

return (
  <Container>
    {!blocksChanges ? (
      <div>incorrent widget path</div>
    ) : (
      <div>
        <div div class="card mb-3">
          <h3 class="card-header">{blocksChanges.length} Commits</h3>

          <div class="list-group">
            {blocksChanges
              .slice(0, 5)
              .map((height) => renderBlockChangesLink(height))}

            <div class="collapse" id="collapseExample">
              {blocksChanges
                .slice(5)
                .map((height) => renderBlockChangesLink(height))}
            </div>

            {blocksChanges.length > 5 && (
              <button
                class="list-group-item active"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Show all
              </button>
            )}
          </div>
        </div>

        <Tabs>
          <TabsButton
            type="button"
            onClick={() =>
              State.update({
                selectedTab: "code",
              })
            }
            selected={state.selectedTab == "code"}
          >
            Code
          </TabsButton>

          <TabsButton
            type="button"
            onClick={() =>
              State.update({
                selectedTab: "render",
              })
            }
            selected={state.selectedTab == "render"}
          >
            Render
          </TabsButton>
        </Tabs>

        {state.selectedTab == "code" && (
          <div>{blockHeightToWidgetCode(state.selectedBlockHeight)}</div>
        )}

        {state.selectedTab == "render" && (
          <div>{blockHeightToWidgetRender(state.selectedBlockHeight)}</div>
        )}
      </div>
    )}
  </Container>
);
