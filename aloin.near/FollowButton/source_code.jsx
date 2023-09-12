if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

const followEdge = Social.keys(
  `${context.accountId}/graph/follow/${props.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${props.accountId}/graph/follow/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = followEdge === null || inverseEdge === null;
const isFollowing = Object.keys(followEdge || {}).length > 0;
const isInverse = Object.keys(inverseEdge || {}).length > 0;

const type = follow ? "unfollow" : "follow";

const data = {
  graph: { follow: { [props.accountId]: "" } },
  index: {
    graph: JSON.stringify({
      key: "follow",
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
  .follow-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  .name {
    font-weight: 600;
    font-size: 12px;
  }
  .follow-blue {
    color: #006ADC !important;
  }
  .follow-button {
    display: 'flex'
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 5px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
  
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      color: #7E868C;
    }

    .bi-16 {
      font-size: 16px;
    }
  }
`;

return (
  <Wrapper className={props.className}>
    <div className="follow-wrap">
      <Widget
        src={"mob.near/widget/ProfileImage"}
        props={{ accountId: props.accountId }}
      />
      <div className="name">{props.accountId}</div>
      {!isFollowing ? (
        <CommitButton
          disabled={loading || isFollowing}
          className="follow-button follow-blue"
          data={data}
        >
          {isInverse ? "Connect Back" : "Connect"}
        </CommitButton>
      ) : (
        <CommitButton disabled={true} className="follow-button">
          Already Connected <i className="bi-16 bi bi-check" />
        </CommitButton>
      )}
    </div>
  </Wrapper>
);
