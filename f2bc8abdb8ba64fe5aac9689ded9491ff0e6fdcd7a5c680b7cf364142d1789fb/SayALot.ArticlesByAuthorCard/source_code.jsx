const { author, quantity, filter, handleFilterArticles } = props;

const CardContainer = styled.a`
    color: black;
    font-size: 16px;
    line-height: 19.2px;
    font-family: inherit;
    box-shadow: 0px 0px 30px 0px #0000000D;
    cursor: pointer;
    with: fit-content;
    min-width: 18rem;
    display: flex;
    flex-wrap: nowrap;

    &:hover {
        color: white;
        text-decoration: none;
        background: linear-gradient(90deg, rgba(147,51,234,1) 0%, rgba(79,70,229,1) 100%);
    }
`;

const inner = (
  <div className="d-flex flex-row mx-1">
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        metadata,
        accountId,
        widgetName,
        style: {
          height: "2.5em",
          width: "2.5em",
          minWidth: "2.5em",
          overflow: "hidden",
        },
        className: "me-2 rounded-pill",
      }}
    />
  </div>
);

return (
  <div className="col-sm-12 col-lg-6 col-xl-4 gy-3">
    <CardContainer
      className="card h-100 p-3"
      onClick={() => handleFilterArticles(filter)}
    >
      {props.tooltip ? (
        <Widget
          src="mob.near/widget/Profile.OverlayTrigger"
          props={{ accountId, children: inner }}
        />
      ) : (
        inner
      )}
      <span>{quantity} articles</span>
    </CardContainer>
  </div>
);
