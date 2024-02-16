if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

const connectEdge = Social.keys(
  `${context.accountId}/graph/connect/${props.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${props.accountId}/graph/connect/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = connectEdge === null || inverseEdge === null;
const isConnected = Object.keys(connectEdge || {}).length > 0;
const isInverse = Object.keys(inverseEdge || {}).length > 0;

const type = connect ? "undo" : "connect";

const data = {
  graph: { connect: { [props.accountId]: isConnected ? null : "" } },
  index: {
    graph: JSON.stringify({
      key: "connect",
      value: {
        type,
        accountId: props.accountId,
      },
    }),
    notify: JSON.stringify({
      key: props.accountId,
      value: {
        type,
      },
    }),
  },
};

const Wrapper = styled.div`
  .connect-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #fbfcfd;
    border: 1px solid #d7dbdf;
    color: #006adc !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ecedee;
      text-decoration: none;
      outline: none;
    }

    i {
      color: #7e868c;
    }

    .bi-16 {
      font-size: 16px;
    }
  }
`;

return (
  <Wrapper className={props.className}>
    <CommitButton
      onCommit={() => {
        props.onCommit();
      }}
      onClick={() => {
        props.onClick();
      }}
      disabled={loading}
      className="connect-button"
      data={data}
    >
      {isConnected && <i className="bi-16 bi bi-check"></i>}
      {isConnected ? "Connected" : "Connect"}
    </CommitButton>
  </Wrapper>
);
