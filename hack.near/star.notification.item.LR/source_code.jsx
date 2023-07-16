const { accountId, blockHeight, value } = props;

return (
  <div className="d-flex justify-content-between row">
    <div className="me-2 text-truncate col-auto">
      <div className="text-truncate">
        <Widget
          src="mob.near/widget/Profile"
          props={{ accountId, tooltip: true }}
        />
      </div>
      {props.R}
    </div>
    <div className="text-nowrap col-auto">
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
  </div>
);
