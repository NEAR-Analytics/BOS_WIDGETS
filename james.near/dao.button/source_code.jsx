if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

return (
  <button
    href={`/james.near/widget/LatestWidgets?accountId=${accountId}`}
    className="btn btn-outline-light rounded-5"
  >
    Widgets
  </button>
);
