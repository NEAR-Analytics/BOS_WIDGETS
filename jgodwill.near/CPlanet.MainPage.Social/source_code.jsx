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
    title: "CDAOs Feed",
  },
  {
    title: "Followed DAOs",
    disabled: !context.accountId,
  },
];

if (hashtag) {
  options.push({
    title: `#${hashtag}`,
  });
}

let accounts = undefined;

  const getFollowedDAOs = (accountId) => {
  let following = Social.keys(`${context.accountId}/graph/follow/*`, "final", {
    return_type: "BlockHeight",
  });

  if (following === null) return null;

  following = Object.keys(following[accountId].graph.follow || {}).filter(
    (account) => account.endsWith(".sputnik-dao.near"),
  );
  return following;
};

if (state.feedIndex === 2) {
  const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");



const following = getFollowedDAOs(props.accountId ?? context.accountId ?? "");
  if (graph !== null) {
    // accounts = Object.keys(graph[context.accountId].graph.follow || {});
    // accounts.push(context.accountId);
    accounts = [...following];
  } else {
    accounts = [];
  }
}

if (state.feedIndex === 1) {
  const response = fetch(
    "https://raw.githubusercontent.com/GenaDrop/genadrop-bos-widgets/main/data/cdao-daos.json"
  );
  const daos = response.ok && JSON.parse(response.body);
  accounts = [...daos.daos];
  console.log(accounts);
}

const CPlanetFont = styled.div`
*, *::before, *::after{
  font-family: Helvetica Neue;
  box-sizing: border-box;
}
`;

const Nav = styled.div`
  .nav-pills {
    background: #fbfbfb;
    font-weight: 500;
    --bs-nav-pills-border-radius: 0;
    --bs-nav-link-color: #B0B0B0;
    --bs-nav-pills-link-active-color: #000;
    --bs-nav-pills-link-active-bg: #fbfbfb;
    --bs-nav-link-padding-y: 0.75rem;
    border-bottom: 1px solid #eee;
    padding-top: 3px;
  }
  .nav-link.active {
    border-bottom: 3px solid #000;
    font-weight: 600;
  }

  .nav-item:hover {
    background: rgba(0, 0, 0, 0.15);
    *{color: #000 !important;}
  }

  margin: 0 -12px;
`;

const SocialWrapper = styled.div`
    display: flex;
    flex-direction:row;
    gap: 2rem;
    .rhs, .lhs{
        width: 360px;
        padding: 16px 24px 476px 24px; 
        border: 1px solid #EFEFEF;
        background: #F8F8F8;
    }
    .mid{
        flex: 1;
    }
`;

return (
  <CPlanetFont>
    <SocialWrapper>
      <div className="rhs">
        <Widget src="jgodwill.near/widget/People" props={{}} />
      </div>
      <div className="mid">
        {context.accountId && (
          <div className="mb-3">
            <Widget
              src="jgodwill.near/widget/CPlanet.MainPage.Compose"
              props={{}}
            />
          </div>
        )}
        <Nav>
          <ul className="nav nav-pills nav-fill mb-3">
            {options.map((option, i) => (
              <li className="nav-item" key={i}>
                <button
                  className={`nav-link ${
                    state.feedIndex === i ? "active" : ""
                  } ${option.disabled ? "disabled" : ""}`}
                  aria-disabled={!!option.disabled}
                  onClick={() =>
                    !option.disabled && State.update({ feedIndex: i })
                  }
                >
                  {option.title}
                </button>
              </li>
            ))}
          </ul>
        </Nav>
        {state.feedIndex === 3 ? (
          <Widget src="mob.near/widget/Hashtag.Feed" props={{ hashtag }} />
        ) : (
          <Widget
            src="jgodwill.near/widget/CPlanet.MainPage.Feed"
            props={{ accounts }}
          />
        )}
      </div>
      <div className="lhs"></div>
    </SocialWrapper>
  </CPlanetFont>
);
