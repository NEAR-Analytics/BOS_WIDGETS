/**
 */
const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
`;
// add nice header
const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
let accountId = props.accountId ?? "qualityq3.near";
let qualityTracker = "qualityq3.near";
let startOfQuarterFollowers = props.startOfQuarterFollower ?? 47; // 47; // to keep track of followers
let builderTarget = props.builderTarget ?? 50;

/**WIDGET CALCULATION */
const accountWidgetCount = [];
let numberOfBuildersWhoDeployed = 0;

let accounts = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (accounts === null) {
  return "Loading...";
}

accounts = Object.entries(accounts[accountId].graph.follow || {});
accounts.sort((a, b) => b[1] - a[1]);

for (let i = 0; i < accounts.length; ++i) {
  let accountId = accounts[i][0];
  let widgets = Social.get(`${accountId}/widget/*`, "final", {
    return_type: "BlockHeight",
    values_only: true,
  });
  let widgetCount = 0;
  if (widgets) {
    widgetCount = Object.keys(widgets).length;
    numberOfBuildersWhoDeployed++;
  }
  accountWidgetCount.push({
    accountId: accountId,
    count: widgetCount,
  });
}

const accountWidgetSort = accountWidgetCount.sort((a, b) => b.count - a.count);
const numAccounts = accountWidgetSort.length;
accountWidgetSort = accountWidgetSort.slice(0, limit);
console.log(accountWidgetSort);
// add number of accounts with no widget
const totalWidgetCount = accountWidgetCount.reduce(
  (sum, account) => sum + account.count,
  0
);

const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
const qualityFollowing = Social.keys(
  `${qualityTracker}/graph/follow/*`,
  "final",
  {
    return_type: "BlockHeight",
    values_only: true,
  }
);
const qualityBuilderCount = qualityFollowing
  ? Object.keys(following[qualityTracker].graph.follow || {}).length
  : null;

const currentBuilderCount = following
  ? Object.keys(following[accountId].graph.follow || {}).length
  : null;
const Flex = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

    @media (max-width: 900px) {
    flex-direction: column;
    gap: var(--section-gap);
    }
`;

const Container = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
`;
const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #6CE89F;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }
`;
const Wrapper = styled.div`
  --section-gap: 42px;
  padding-top: 42px;

  @media (max-width: 1160px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

return (
  <div>
    <div className="row p-2">
      <Widget
        src="hackerhouse.near/widget/ProgressBar"
        props={{
          infoTitle: "Q3 Builders Who Shipped Quality",
          numerator: numberOfBuildersWhoDeployed,
          total: builderTarget,
        }}
      />
    </div>
    <h3 className="m-2">Q3 BOS Builders Who Shipped QUality</h3>
    {accountWidgetCount.map((rank, index) => {
      let accountId = rank.accountId;
      return (
        <div className="d-flex m-2" key={accountId}>
          <div className="me-4" style={{ width: "45%" }}>
            <Widget
              src="banyanq3.near/widget/AccountProfileCard"
              props={{ accountId }}
            />
          </div>
          <div className="d-flex flex-column" style={{ width: "30%" }}>
            <div>
              Rank:
              <span
                style={{
                  backgroundColor: "black",
                  borderRadius: "5px",
                  padding: "5px",
                  color: "white",
                }}
              >
                {index + 1}
              </span>
            </div>
            <div>
              Widgets:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {rank.count}
              </span>
            </div>
          </div>
        </div>
      );
    })}
    <br />
  </div>
);
