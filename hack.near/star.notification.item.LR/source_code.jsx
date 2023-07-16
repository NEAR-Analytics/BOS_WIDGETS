const { accountId, blockHeight, value } = props;

return (
  <div className="d-flex justify-content-between">
    <div className="me-2 text-truncate">
      <div className="text-truncate">
        <Widget
          src="mob.near/widget/Profile"
          props={{ accountId, tooltip: true }}
        />
      </div>
    </div>
    <div className="text-nowrap">
      <div
        className="text-truncate text-muted"
        style={{ paddingLeft: "1.8em" }}
      >
        {" "}
        <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
        {props.L}
      </div>
      {props.R}
    </div>
  </div>
);
