const hashtag = props.hashtag;

if (!state || state.hashtag !== hashtag) {
  State.update({
    feedIndex: hashtag ? 1 : context.accountId ? 0 : 1,
    hashtag,
  });
}

const options = [
  {
    title: "All Posts",
  },
  {
    title: "DAOs Feed",
  },
  {
    title: "My Feed",
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

const CPlanetFont = styled.div`
*, *::before, *::after{
  font-family: Helvetica Neue;
  box-sizing: border-box;
}
`;

return (
  <CPlanetFont>
    {context.accountId && (
      <div className="mb-3">
        <Widget
          src="jgodwill.near/widget/CPlanet.MainPage.Compose"
          props={{}}
        />
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
      <Widget src="mob.near/widget/Hashtag.Feed" props={{ hashtag }} />
    ) : (
      <Widget
        src="jgodwill.near/widget/CPlanet.MainPage.Feed"
        props={{ accounts }}
      />
    )}
  </CPlanetFont>
);
