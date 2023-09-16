const widgetPath = props.widgetPath;

if (typeof widgetPath !== "string")
  return "send {widgetPath} as string in props";

const theme = props.theme;


State.init({
  selectedTab: "code",
  selectedBlockHeight: null,
});

const historyBlocksRequest = Social.keys(`${widgetPath}`, "final", {
  return_type: "History",
});

if (historyBlocksRequest === null) return "loading...";

const [widgetAccountId, _, widgetName] = widgetPath.split("/");

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

const BlockChangesLink = styled.button`
  transition: all .2s ease-in-out;
  &:hover {
    color: ${theme.buttonPrimary} !important;
  }
`;

const renderBlockChangesLink = (blockHeight) => {
  return (
    <BlockChangesLink
      className={`list-group-item list-group-item-action ${
        state.selectedBlockHeight != blockHeight ? "" : "list-group-item-info"
      }`}
      style={{
        backgroundColor: theme.ui,

        color:
          state.selectedBlockHeight != blockHeight
            ? theme.textColor3
            : theme.buttonPrimary,

        borderBottom: `1px ${theme.borderColor} solid`,
      }}
      onClick={() => {
        State.update({ selectedBlockHeight: blockHeight });
      }}
    >
      #{blockHeight} * {getDatastringFromBlockHeight(blockHeight)}
    </BlockChangesLink>
  );
};

function blockHeightToWidgetCode(blockHeight) {
  const index = blocksChanges.findIndex((el) => el == blockHeight);
  return (
    <div class="mb-3">
      <Widget
        key={blockHeight}
        src={`saidulbadhon.near/widget/SearchPage.ComponentDetails-fork.WidgetHistory.History.CodeHistoryCard`}
        props={{
          pathToWidget: widgetPath,
          currentBlockHeight: blockHeight,
          prevBlockHeight: blocksChanges[index + 1],
          copyToClipboard: props.copyToClipboard,
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
        pathToWidget: widgetPath,
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
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
`;

const TabsButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? theme.buttonPrimary : theme.textColor)};

  background: none;
  border: none;
  outline: none;

  transition: all .2s ease-in-out;

  &:hover {
    color: ${theme.buttonPrimary};
  }

  &::after {
    content: '';
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 3px;
    background: #0091FF;
  }
`;

return (
  <div>
    {!blocksChanges ? (
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: theme.textColor3,
        }}
      >
        History for this component does not exist.
      </div>
    ) : (
      <div>
        <div
          class="card mb-3"
          style={{ backgroundColor: theme.backgroundColor }}
        >
          <h3 class="card-header" style={{ color: theme.textColor }}>
            {blocksChanges.length} Commits
          </h3>

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
                style={{ backgroundColor: theme.buttonPrimary }}
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
            Preview
          </TabsButton>
        </Tabs>

        {state.selectedTab == "code" && (
          <div>{blockHeightToWidgetCode(state.selectedBlockHeight)}</div>
        )}

        {state.selectedTab == "render" && (
          <div style={{ backgroundColor: "#FFFFFF", minHeight: 400 }}>
            {blockHeightToWidgetRender(state.selectedBlockHeight)}
          </div>
        )}
      </div>
    )}
  </div>
);
