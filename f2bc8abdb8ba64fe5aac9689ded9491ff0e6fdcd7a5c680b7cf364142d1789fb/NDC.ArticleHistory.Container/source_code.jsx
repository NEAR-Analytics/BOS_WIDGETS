const {
  pathToCurrentArticle,
  pathToPrevArticle,
  currentBlockHeight,
  prevBlockHeight,
  widgets,
} = props;

const authorForWidget = "testwiki.near";

State.init({});

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

return (
  <div className="card border-primary">
    <div className="card-header">
      <small class="text-muted">
        <div class="row justify-content-between">
          <div class="col-4 d-flex frex-row justify-content-start align-items-center">
            <div class="p-2">changes in block #{currentBlockHeight}</div>

            <OverlayTrigger
              placement="auto"
              overlay={<Tooltip>count inserted lines</Tooltip>}
            >
              <span class="badge text-bg-success p-2 me-1 align-self-center">
                {state.lineCountInserted}
              </span>
            </OverlayTrigger>

            <OverlayTrigger
              placement="auto"
              overlay={<Tooltip>count deleted lines</Tooltip>}
            >
              <span class="badge text-bg-danger p-2 me-1 align-self-center">
                {state.lineCountDeleted}
              </span>
            </OverlayTrigger>
          </div>
          <div class="col-4 d-flex justify-content-end align-items-center">
            {getDatastringFromBlockHeight(currentBlockHeight)}
          </div>
        </div>
      </small>
    </div>
    <Widget
      src={widgets.articleHistory.secondContainer}
      props={{
        pathToCurrentArticle: pathToCurrentArticle,
        pathToPrevArticle: pathToPrevArticle,
        currentBlockHeight: currentBlockHeight,
        prevBlockHeight: prevBlockHeight,
        findUniqueResult: (
          lineCountDeleted,
          lineCountInserted,
          lineCountCurrentCode,
          lineCountPrevCode,
          allLineCount
        ) => {
          if (
            state.lineCountDeleted === undefined ||
            state.lineCountInserted === undefined
          )
            State.update({ lineCountDeleted, lineCountInserted });
        },
        widgets,
      }}
    />
  </div>
);
