const { target, poker, blockHeight } = props;
return (
  <div className="mb-2">
    <span className="fs-4">
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{
          accountId: target,
          hideName: true,
          hideAccountId: true,
          tooltip: true,
        }}
      />
      <span role="img" aria-label="poked" title="poked">
        👈
      </span>
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{
          accountId: poker,
          hideName: true,
          hideAccountId: true,
          tooltip: true,
        }}
      />
    </span>
    <span className="text-muted">
      <Widget
        src="mob.near/widget/TimeAgo"
        props={{ blockHeight: blockHeight }}
      />
    </span>
  </div>
);
