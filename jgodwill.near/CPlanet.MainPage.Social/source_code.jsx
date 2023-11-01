const hashtag = props.hashtag;

if (!state || state.hashtag !== hashtag) {
  State.update({
    feedIndex: hashtag ? 1 : context.accountId ? 0 : 1,
    hashtag,
  });
}

const options = [
  {
    title: "C Constellation",
  },
  {
    title: "CDAO Feed",
  },
  {
    title: "DAOs Feed",
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
    (account) => account.endsWith(".sputnik-dao.near")
  );
  return following;
};

if (state.feedIndex === 1) {
  // const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");

  // const following = getFollowedDAOs(props.accountId ?? context.accountId ?? "");
  // if (graph !== null) {
  //   // accounts = Object.keys(graph[context.accountId].graph.follow || {});
  //   // accounts.push(context.accountId);
  //   accounts = [...following];
  //   console.log(accounts);
  // } else {
  //   accounts = [];
  // }
  accounts = ["creativesdao.sputnik-dao.near"];
}

if (state.feedIndex === 2) {
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
    .daos{
      .title-section{
        display: flex;
        justify-content: space-between;
        align-items: center;
          h3{
            font-size: 24px;
            font-style: normal;
            font-weight: 900;
            line-height: 120%
          }
        .all{
          color: #B0B0B0;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 100%; /* 16px */
        }
      }
    }
`;

const communities = [
  "marmaj.sputnik-dao.near",
  "daorecords.sputnik-dao.near",
  "vibes.sputnik-dao.near",
];

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
      <div className="lhs">
        <div className="daos">
          <div className="title-section">
            <h3>Featured DAOs</h3>
            <a
              href="#/agwaze.near/widget/CPlanet.index?tab=community"
              className="all"
              onClick={() => props.update({ tab: "community" })}
            >
              Show more (59)
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.13672 1C4.20751 1 5.92918 1 8.99997 1V9"
                  stroke="#B0B0B0"
                  stroke-width="1.3478"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.99883 1L1 8.7377"
                  stroke="#B0B0B0"
                  stroke-width="1.3478"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
          {communities.map((data, index) => (
            <div key={index}>
              <Widget
                props={{
                  daoId: data,
                  onButtonClick: () =>
                    props.update({ tab: "daoProfile", daoId: data }),
                }}
                src="jgodwill.near/widget/CPlanet.FeaturedDAO.Card"
              />
            </div>
          ))}
        </div>
      </div>
    </SocialWrapper>
  </CPlanetFont>
);
