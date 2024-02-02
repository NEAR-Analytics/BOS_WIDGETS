const accountId = props.accountId;

if (!accountId) {
  return "";
}

return (
  <a
    href={`/james.near/widget/LatestWidgets?accountId=${accountId}`}
    className="btn btn-outline-light rounded-5"
  >
    Widgets
  </a>
);
