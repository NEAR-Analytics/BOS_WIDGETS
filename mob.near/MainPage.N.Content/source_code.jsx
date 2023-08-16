const hashtag = props.hashtag;

if (!state || state.hashtag !== hashtag) {
  State.update({
    feedIndex: hashtag ? "hashtag" : context.accountId ? "following" : "all",
    hashtag,
  });
}

const options = [
  {
    id: "following",
    title: "Following",
    disabled: !context.accountId,
  },
  {
    id: "all",
    title: "All Posts",
  },
  {
    id: "menu",
    title: "Menu",
    mobileOnly: true,
  },
];

if (hashtag) {
  options.splice(2, 0, {
    id: "hashtag",
    title: `#${hashtag}`,
  });
}

let accounts = undefined;

if (state.feedIndex === "following") {
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
  .nav-item:not(:has(> .disabled)):hover {
    background: rgba(13, 110, 253, 0.15);
  }
  .nav-link.active {
    border-bottom: 2px solid rgb(13, 110, 253);
  }

  margin: 0 -12px;
  border-bottom: 1px solid #eee;
`;

return (
  <div className="row">
    <Nav className="d-lg-block col-lg-8">
      <ul className="nav nav-pills nav-fill">
        {options.map((option, i) => (
          <li
            className={`nav-item ${option.mobileOnly ? "d-lg-none" : ""}`}
            key={i}
          >
            <button
              className={`nav-link ${
                state.feedIndex === option.id ? "active" : ""
              } ${option.disabled ? "disabled" : ""}`}
              aria-disabled={!!option.disabled}
              onClick={() =>
                !option.disabled && State.update({ feedIndex: option.id })
              }
            >
              {option.title}
            </button>
          </li>
        ))}
      </ul>
    </Nav>
    <div
      className={`${
        state.feedIndex === "menu" ? "d-none" : ""
      } d-lg-block col-lg-8`}
    >
      {context.accountId && (
        <Widget
          key="compose"
          src="mob.near/widget/MainPage.N.Compose"
          props={{}}
        />
      )}
      {state.feedIndex === "hashtag" ? (
        <Widget
          key="hash-feed"
          src="mob.near/widget/Hashtag.N.Feed"
          props={{ hashtag }}
        />
      ) : (
        <Widget
          key="reg-feed"
          src="mob.near/widget/MainPage.N.Feed"
          props={{ accounts }}
        />
      )}
    </div>
    <div
      className={`${
        state.feedIndex !== "menu" ? "d-none" : ""
      } d-lg-block col-lg-4`}
    >
      <Widget src="mob.near/widget/Welcome.RHS" props={props} />
    </div>
  </div>
);
