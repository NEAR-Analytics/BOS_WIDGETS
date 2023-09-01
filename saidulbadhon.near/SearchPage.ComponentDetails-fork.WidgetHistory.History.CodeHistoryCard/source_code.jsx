State.init({});

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

let CodeWrapper = styled.div`
& > pre > div {
  margin: 0px !important;
}

& > pre {
  margin: 0px !important;
  border-radius: 0px 0px 5px 5px;
}
`;

return (
  <div className="card border-primary">
    <div className="card-header">
      <small class="text-muted">
        <div class="row justify-content-between">
          <div class="col-4 d-flex frex-row justify-content-start align-items-center">
            <div class="p-2">changes in block #{props.currentBlockHeight}</div>

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

          <div class="col-7 d-flex justify-content-end align-items-center">
            {getDatastringFromBlockHeight(props.currentBlockHeight)}

            <button
              style={{ marginLeft: 8 }}
              data-toggle="tooltip"
              data-placement="top"
              title="Copy Widget"
              onClick={() => {
                const currentCode = Social.get(
                  `${props.pathToWidget}`,
                  props.currentBlockHeight
                );

                // const prevCode = props.prevBlockHeight
                //   ? Social.get(`${props.pathToWidget}`, props.prevBlockHeight)
                //   : undefined;

                props?.copyToClipboard && props?.copyToClipboard(currentCode);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                fill="#FFF"
                style={{marginRight:4}}
              >
                <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" />
              </svg>

            Revert Change
            </button>
          </div>
        </div>
      </small>
    </div>

    <CodeWrapper>
      <Widget
        src={`bozon.near/widget/WidgetHistory.CodeHistory`}
        props={{
          pathToWidget: props.pathToWidget,
          currentBlockHeight: props.currentBlockHeight,
          prevBlockHeight: props.prevBlockHeight,
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
        }}
      />
    </CodeWrapper>
  </div>
);
