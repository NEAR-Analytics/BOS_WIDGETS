const hashtag = props.hashtag;

const options = [
  {
    title: "ABC",
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
    <div className="mb-3">
      <Widget src="create.near/widget/Page.Header" />
    </div>
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
    <Widget src="create.near/widget/ABC.Feed" props={{ hashtag }} />
  </>
);
