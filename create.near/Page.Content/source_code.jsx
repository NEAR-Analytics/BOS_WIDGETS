const hashtag = "abc";

if (!state || state.hashtag !== hashtag) {
  State.update({
    feedIndex: hashtag ? 2 : context.accountId ? 0 : 1,
    hashtag,
  });
}

const options = [
  {
    title: "Your Network",
    disabled: !context.accountId,
  },
];

if (hashtag) {
  options.push({
    title: `#${hashtag}`,
  });
}

let accounts = undefined;

if (state.feedIndex === 0) {
  const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");
  if (graph !== null) {
    accounts = Object.keys(graph[context.accountId].graph.follow || {});
    accounts.push(context.accountId);
  } else {
    accounts = [];
  }
}

return (
  <>
    {context.accountId && (
      <div>
        <div className="mb-3">
          <Widget src="create.near/widget/Page.Header" />
        </div>
      </div>
    )}
    <ul className="nav nav-pills mb-3">
      {options.map((option, i) => (
        <li className="nav-item" key={i}>
          <button
            className={`nav-link ${state.feedIndex === i ? "active" : ""} ${
              option.disabled ? "disabled" : ""
            }`}
            aria-disabled={!!option.disabled}
            onClick={() => !option.disabled && State.update({ feedIndex: i })}
          >
            {option.title}
          </button>
        </li>
      ))}
    </ul>
    {state.feedIndex === 2 ? (
      <Widget src="create.near/widget/Hashtag.Feed" props={{ hashtag }} />
    ) : (
      <Widget src="create.near/widget/Page.Feed" props={{ accounts }} />
    )}
  </>
);
