const { accountId, blockHeight, value } = props;

return (
  <div className="d-flex justify-content-between row">
    <div className="me-2 text-truncate col-auto">
      <div className="text-truncate">
        {props.R}

        <Widget
          src="mob.near/widget/Profile"
          props={{ accountId, tooltip: true }}
        />
      </div>
    </div>
    <div className="text-nowrap col-auto">
      <div className="text-truncate text-muted">
        {" "}
        {props.L}
        <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
        ago
      </div>
    </div>
  </div>
);
