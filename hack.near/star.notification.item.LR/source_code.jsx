const { accountId, blockHeight, value } = props;

return (
  <div className="d-flex justify-content-between row">
    <div className="me-2 text-truncate col-3">
      <div className="text-truncate">
        <Widget
          src="mob.near/widget/Profile"
          props={{ accountId, tooltip: true }}
        />
      </div>
    </div>
    <div className="text-nowrap col-8">
      <div
        className="text-truncate text-muted"
        style={{ paddingLeft: "1.8em" }}
      >
        {" "}
        {props.L}
        <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
        ago
      </div>
    </div>
    {props.R}
  </div>
);
