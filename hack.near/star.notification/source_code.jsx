const { value } = props;

return (
  <div className="mb-3">
    {value.type === "star" || value.type === "unstar" ? (
      <Widget src="hack.near/widget/star.notification.item" props={props} />
    ) : (
      <div>
        Unknown notification:{" "}
        <span className="font-monospace">{JSON.stringify(value)}</span>
      </div>
    )}
  </div>
);
