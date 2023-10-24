const currentPill = props.currentNavPill ?? "";
const authorForWidget = "marketplacebos.near";
const accountId = props.accountId ?? context.accountId;

return (
  <div className="navbar navbar-expand-md border-bottom mb-3">
    <div className="container-fluid">
      <a
        className="navbar-brand text-decoration-none"
        href={`#/${authorForWidget}/widget/Index`}
      >
        {"My Favorites"}
      </a>
      <div className="d-none d-md-block">
        <Widget src="marketplacebos.near/widget/YourProfile" />
      </div>
    </div>
  </div>
);
