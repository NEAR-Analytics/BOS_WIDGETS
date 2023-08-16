const hashtag = props.hashtag;

if (!state || state.hashtag !== hashtag) {
  State.update({
    feedIndex: hashtag ? 2 : context.accountId ? 0 : 1,
    hashtag,
  });
}

const options = [
  {
    title: "Following",
    disabled: !context.accountId,
  },
  {
    title: "All Posts",
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

const Nav = styled.div`
  .nav-pills {
    font-weight: 500;
    --bs-nav-pills-border-radius: 0;
    --bs-nav-pills-link-active-color: var(--bs-nav-link-color);
    --bs-nav-pills-link-active-bg: rgba(13, 110, 253, 0.1);
  }
  .nav-item:hover {
    background: rgba(13, 110, 253, 0.15);
  }

  border-bottom: 1px solid #eee;
`;

return (
  <>
    <Nav>
      <ul className="nav nav-pills nav-fill">
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
    </Nav>
    {context.accountId && (
      <Widget src="mob.near/widget/MainPage.N.Compose" props={{}} />
    )}
    {state.feedIndex === 2 ? (
      <Widget src="mob.near/widget/Hashtag.N.Feed" props={{ hashtag }} />
    ) : (
      <Widget src="mob.near/widget/MainPage.N.Feed" props={{ accounts }} />
    )}
  </>
);
