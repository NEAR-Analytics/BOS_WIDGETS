const accountId = props.accountId ?? context.accountId ?? "";

const buildersEdge = Social.keys(
  `${context.accountId}/badge/builder/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${accountId}/badge/builder/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = buildersEdge === null || inverseEdge === null;
const isBuilder = Object.keys(buildersEdge || {}).length > 0;
const isInverse = Object.keys(inverseEdge || {}).length > 0;

const type = badge ? "revoke" : "assign";

// dawnkelly.near/badge/builder/accounts/${accountId}

const data = {
  badge: {
    builder: {
      [accountId]: isBuilder ? null : "",
    },
  },
  index: {
    graph: JSON.stringify({
      key: "badge",
      value: {
        type,
        accountId,
      },
    }),
    notify: JSON.stringify({
      key: accountId,
      value: {
        type,
      },
    }),
  },
};

const Wrapper = styled.div`
  .badge-button {
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
      className="badge-button"
      data={data}
    >
      {isBuilder && <i className="bi-16 bi bi-check"></i>}
      {isBuilder ? "Revoke" : isInverse ? "Accept Badge" : "Assign Badge"}
    </CommitButton>
  </Wrapper>
);
