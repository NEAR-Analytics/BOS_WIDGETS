// Proxy API - https://github.com/emarai/api-rcdashboard
const API_URL = "https://vercel-express-blond.vercel.app/api/run";

const getMembers = (accountId) => {
  if (!accountId) return [];

  let followers = new Set(
    Object.keys(
      Social.keys(`*/graph/follow/${accountId}`, "final", {
        return_type: "BlockHeight",
        values_only: true,
      }) || {}
    )
  );

  let following = Object.keys(
    Social.keys(
      `${accountId}/graph/follow/*`,
      "final",
      {
        return_type: "BlockHeight",
        values_only: true,
      } || {}
    )?.[accountId]?.graph?.follow || {}
  );

  let members = [];
  if (accountId == "rc-dao.near") {
    members = following;
  } else {
    members = [...new Set(following.filter((item) => followers.has(item)))];
  }
  // The RC account is part of members
  members.push(accountId);

  return members;
};

const rcDaoMembers = getMembers("rc-dao.near");
const communityAccounts = rcDaoMembers;

State.init({
  selectedCommunityAccountMembers: [],
  selectedCommunityAccount: null,
  menu: "all-rc",
  allMembers: [],
});

const getWidgetsCount = (accountId) => {
  return Object.keys(
    Social.keys(`${accountId}/widget/*`, "final", {
      return_type: "BlockHeight",
      values_only: false,
    })[accountId].widget || {}
  ).length;
};

const getTotalWidgetByMembers = (members) => {
  if (!members) return 0;

  const total = members
    .map((accountId) => {
      return getWidgetsCount(accountId);
    })
    .reduce((a, b) => a + b, 0);
  return total;
};

const getTotalPostByMembers = (members) => {
  if (!members) return 0;

  const total = members
    .map((accountId) => {
      return Object.keys(
        Social.keys(`${accountId}/post/*`, "final", {
          return_type: "BlockHeight",
          values_only: false,
        })[accountId].post || {}
      ).length;
    })
    .reduce((a, b) => a + b, 0);
  return total;
};

const widgetDisplay = (members) => {
  return members.map((member) => {
    if (getWidgetsCount(member) > 0) {
      return (
        <Widget src="mob.near/widget/Widgets" props={{ accountId: member }} />
      );
    }
  });
};

const chart = ({
  data,
  header,
  valueLabel,
  label,
  barColor,
  staticDisplay,
}) => {
  const srcDoc = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<canvas id="myChart" style="position: relative; height:80vh; width:80vw"></canvas>

<script>
async function fetchData() {

const sortedData = ${data}.sort((a, b) => {
  return new Date(a["year_month"]) - new Date(b["year_month"]);
});

const ${valueLabel} = {};

sortedData.map((entry) => {
  ${valueLabel}[entry["year_month"]] = entry["${valueLabel}"];
});

const dates = sortedData.map((entry) => entry["year_month"]);


  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: dates,
          datasets: [
   {
      label: "${label}",
      data: ${valueLabel},
        backgroundColor: "${barColor}",
      },
          ]
      },
      options: {
  scales: {
      y: {
        stacked: true,
        grid: {
          color: "rgba(255, 0, 0, 0.2)", // This will change the gridline color
          borderColor: "rgb(240,255,240)",
        },
        ticks: {
          color: "rgb(0,0,0)", // This will change the axis text label color
        },
      },
      x: {
        stacked: true,
        grid: {
          color: "rgba(255, 0, 0, 0.2)", // This will change the gridline color
        },
        ticks: {
          color: "rgb(0,0,0)", // This will change the axis text label color
        },
      },
    },
      }
  });
}

fetchData();
</script>
`;
  // handle data null from flipside
  if (data == "null") {
    return (
      <Widget
        src="contribut3.near/widget/Card"
        props={{
          header: header,
          body: (
            <div style={{ margin: "auto" }}>
              Data not found. Empty data from flipside.
            </div>
          ),
        }}
      />
    );
  }
  return (
    <Widget
      src="contribut3.near/widget/Card"
      props={{
        header: header,
        body:
          staticDisplay != undefined ? (
            <div style={{ margin: "auto" }}>{staticDisplay}</div>
          ) : data ? (
            <iframe
              className="w-100"
              style={{ height: "300px" }}
              srcDoc={srcDoc}
            />
          ) : (
            <div style={{ margin: "auto" }}>
              <Widget src="flashui.near/widget/Loading" props={{}} />
            </div>
          ),
      }}
    />
  );
};

const chartDappUsage = ({ data, header, valueLabel, label, barColor }) => {
  const srcDoc = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<canvas id="myChart" style="position: relative; height:80vh; width:80vw"></canvas>

<script>
async function fetchData() {

const tempData = ${data};

const title = tempData.map((entry) => entry["dapp"]);


  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: title,
          datasets: [
          {
              label: "${label}",
              data: tempData.map(entry => entry["${valueLabel}"]),
              backgroundColor: "${barColor}"
          }
          ]
      }
  });
}

fetchData();
</script>
`;
  return (
    <Widget
      src="contribut3.near/widget/Card"
      props={{
        header: header,
        body: data ? (
          <iframe
            className="w-100"
            style={{ height: "750px" }}
            srcDoc={srcDoc}
          />
        ) : (
          <div style={{ margin: "auto" }}>
            <Widget src="flashui.near/widget/Loading" props={{}} />
          </div>
        ),
      }}
    />
  );
};

const chartDappTimeline = ({ data, header }) => {
  const srcDoc = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<canvas id="myChart" style="position: relative; height:80vh; width:80vw"></canvas>

<script>
async function fetchData() {

const tempData = ${data};

const sortedData = tempData.sort((a, b) => {
      return new Date(a["date"]) - new Date(b["date"]);
    });

    const dates = Array.from(new Set(sortedData.map((entry) => entry["date"])));

    const dapps = Array.from(new Set(sortedData.map((entry) => entry["dapp"])));
    const datasets = dapps.map((dapp) => {
      return {
        label: dapp,
        data: dates.map((date) => {
          return (
            sortedData.find(
              (entry) => entry["date"] == date && entry["dapp"] == dapp
            )?.txs || 0
          );
        }),
      };
    });

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dates.map(date => new Date(date).toLocaleDateString()),
        datasets: datasets,
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
}

fetchData();
</script>
`;
  return (
    <Widget
      src="contribut3.near/widget/Card"
      props={{
        header: header,
        body: data ? (
          <iframe
            className="w-100"
            style={{ height: "750px" }}
            srcDoc={srcDoc}
          />
        ) : (
          <div style={{ margin: "auto" }}>
            <Widget src="flashui.near/widget/Loading" props={{}} />
          </div>
        ),
      }}
    />
  );
};

const widgetRank = (members) => {
  const data = Social.get("*/graph/star/**", "final");

  const starCountsByWidget = {};

  if (data)
    Object.keys(data).forEach((user) => {
      const userData = data[user];
      const widgetData = userData?.graph?.star;

      if (widgetData) {
        members.map((widgetCreator) => {
          const widgetList = widgetData[widgetCreator]?.widget;

          if (widgetList) {
            Object.keys(widgetList).forEach((widgetName) => {
              const widgetPath = `${widgetCreator}/widget/${widgetName}`;

              if (!starCountsByWidget[widgetPath]) {
                starCountsByWidget[widgetPath] = 0;
              }

              if (typeof widgetList[widgetName] !== "undefined") {
                starCountsByWidget[widgetPath]++;
              }
            });
          }
        });
      }
    });

  const rankedWidgets = Object.entries(starCountsByWidget)
    .filter(([widgetName, totalStars]) => typeof totalStars !== "undefined")
    .sort((a, b) => b[1] - a[1]);

  if (rankedWidgets.length == 0) {
    return <p>Widgets created by members have not been starred.</p>;
  }
  return (
    <div>
      <h3>Top Widgets by Members</h3>
      <ol>
        {rankedWidgets.map(([widgetPath, totalStars], index) => {
          const [widgetCreator, _, widgetName] = widgetPath.split("/");
          return (
            <li key={widgetPath}>
              <a href={`/near/widget/ComponentDetailsPage?src=${widgetPath}`}>
                {widgetName}
              </a>{" "}
              ({totalStars} stars) by{" "}
              <Widget
                src="mob.near/widget/N.ProfileLine"
                props={{ accountId: widgetCreator, hideAccountId: true }}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
};

function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function fetchRetry(url, delay, tries, stateKey) {
  function onError(err) {
    console.log("err", err);
    let triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }
    return wait(delay).then(() => fetchRetry(url, delay, triesLeft));
  }
  return asyncFetch(url).then((result) => {
    if (result.ok === true) {
      return State.update({ [stateKey]: JSON.stringify(result.body) });
    } else {
      onError(result.body);
    }
  });
}

const generateMAU = (accountId) => {
  const queryParams = `account_id=${accountId}&stats_type=mau`;
  fetchRetry(`${API_URL}?${queryParams}`, 1000, 10, "mauChartData");
};

const generateDAU = (accountId) => {
  const queryParams = `account_id=${accountId}&stats_type=dau`;
  fetchRetry(`${API_URL}?${queryParams}`, 1000, 10, "dauChartData");
};

const generateGithubActivities = (accountId) => {
  const queryParams = `account_id=${accountId}&stats_type=github_activities`;
  fetchRetry(`${API_URL}?${queryParams}`, 1000, 10, "githubChartData");
};

const generateTotalLikes = (accountId) => {
  const queryParams = `account_id=${accountId}&stats_type=total_likes`;
  fetchRetry(`${API_URL}?${queryParams}`, 1000, 10, "totalLikes");
};

const generateTotalWalletsCreated = (accountId) => {
  const queryParams = `account_id=${accountId}&stats_type=total_wallets_created`;
  fetchRetry(`${API_URL}?${queryParams}`, 1000, 10, "totalWallets");
};

const generateNFTMints = (accountId) => {
  const queryParams = `account_id=${accountId}&stats_type=nft_mints`;
  fetchRetry(`${API_URL}?${queryParams}`, 1000, 10, "nftMintsChartData");
};

const generateDappUsage = (accountId) => {
  const queryParams = `account_id=${accountId}&stats_type=dapp_usage`;
  fetchRetry(`${API_URL}?${queryParams}`, 1000, 10, "dappUsageChartData");
};

const generateDappTimeline = (accountId) => {
  const queryParams = `account_id=${accountId}&stats_type=dapp_timeline`;
  fetchRetry(`${API_URL}?${queryParams}`, 1000, 10, "dappTimelineChartData");
};

const generateDappVolume = (accountId) => {
  const queryParams = `account_id=${accountId}&stats_type=dapp_volume`;
  fetchRetry(`${API_URL}?${queryParams}`, 1000, 10, "dappVolumeChartData");
};

State.update({
  selectedCommunityAccountMembers: getMembers(state.selectedCommunityAccount),
});
if (state.menu === "developer")
  generateGithubActivities(state.selectedCommunityAccount);
if (state.menu === "overview" || state.menu === "dapp")
  generateMAU(state.selectedCommunityAccount);
if (state.menu === "overview")
  generateTotalLikes(state.selectedCommunityAccount);
if (state.menu === "overview" || state.menu === "dapp")
  generateDAU(state.selectedCommunityAccount);
if (state.menu === "overview")
  generateTotalWalletsCreated(state.selectedCommunityAccount);
if (state.menu === "nft") generateNFTMints(state.selectedCommunityAccount);
if (state.menu === "dapp") {
  generateDappUsage(state.selectedCommunityAccount);
  generateDappTimeline(state.selectedCommunityAccount);
  generateDappVolume(state.selectedCommunityAccount);
}
if (state.menu === "all-overview") {
  State.update({
    allMembers: rcDaoMembers.flatMap((rcAccountId) => getMembers(rcAccountId)),
  });
  generateTotalLikes("rc-dao.near");
  generateDAU("rc-dao.near");
  generateNFTMints("rc-dao.near");
  generateMAU("rc-dao.near");
  generateGithubActivities("rc-dao.near");
}

return (
  <div className="container">
    <h1>Regional Community Dashboard WIP</h1>
    <Typeahead
      placeholder="Select your regional community account:"
      options={communityAccounts}
      value={state.selectedCommunityAccount}
      onChange={(value) =>
        State.update({
          selectedCommunityAccount: value,
          menu: "overview",
          queryResultIdMAU: null,
          queryResultIdDevActivities: null,
          totalLikes: null,
          githubChartData: null,
          mauChartData: null,
          dauChartData: null,
          nftMintsChartData: null,
          dappUsageChartData: null,
          dappTimelineChartData: null,
          dappVolumeChartData: null,
          totalWallets: null,
        })
      }
    />
    {/* Menu */}
    <div className="m-1">
      <button
        onClick={() => State.update({ menu: "all-rc" })}
        disabled={
          state.selectedCommunityAccount !== null || state.menu === "all-rc"
        }
        hidden={state.selectedCommunityAccount !== null}
      >
        All Regional Communities
      </button>
      <button
        onClick={() => State.update({ menu: "all-overview" })}
        disabled={
          state.selectedCommunityAccount !== null ||
          state.menu === "all-overview"
        }
        hidden={state.selectedCommunityAccount !== null}
      >
        Overview Stats
      </button>
      <button
        onClick={() =>
          State.update({ menu: "all-rc", selectedCommunityAccount: null })
        }
        hidden={state.selectedCommunityAccount === null}
      >
        🏠
      </button>
      <button
        onClick={() => State.update({ menu: "overview" })}
        disabled={
          state.selectedCommunityAccount === null || state.menu === "overview"
        }
        hidden={state.selectedCommunityAccount === null}
      >
        Overview
      </button>
      <button
        onClick={() => State.update({ menu: "developer" })}
        disabled={
          state.selectedCommunityAccount === null || state.menu === "developer"
        }
        hidden={state.selectedCommunityAccount === null}
      >
        Developer Activities
      </button>
      <button
        onClick={() => State.update({ menu: "widget-list" })}
        disabled={
          state.selectedCommunityAccount === null ||
          state.menu === "widget-list"
        }
        hidden={state.selectedCommunityAccount === null}
      >
        Widget List
      </button>
      <button
        onClick={() => State.update({ menu: "dapp" })}
        disabled={
          state.selectedCommunityAccount === null || state.menu === "dapp"
        }
        hidden={state.selectedCommunityAccount === null}
      >
        Dapp Activities
      </button>
      <button
        onClick={() => State.update({ menu: "nft" })}
        disabled={
          state.selectedCommunityAccount === null || state.menu === "nft"
        }
        hidden={state.selectedCommunityAccount === null}
      >
        NFT Mints
      </button>
      <button
        onClick={() => State.update({ menu: "members" })}
        disabled={
          state.selectedCommunityAccount === null || state.menu === "members"
        }
        hidden={state.selectedCommunityAccount === null}
      >
        Members List
      </button>
    </div>
    {state.selectedCommunityAccount === null &&
      state.menu === "all-overview" &&
      state.allMembers.length > 1 && (
        <div>
          <Widget
            src="nearhorizon.near/widget/InfoSegment"
            props={{
              title: "Info",
              description: `These statistics are all from accounts that are members from regional communities.`,
            }}
          />
          <div>
            {chart({
              data: state["mauChartData"],
              header: <b>Monthly Active Members</b>,
              valueLabel: "mau",
              label: "MAU (members)",
              barColor: "rgb(192, 85, 85)",
            })}
          </div>
          <div>
            {chart({
              data: state["dauChartData"],
              header: <b>Daily Active Members</b>,
              valueLabel: "dau",
              label: "DAU (members)",
              barColor: "rgb(140, 85, 85)",
            })}
          </div>
          <div>
            {chart({
              header: <b>Total Posts by All Members</b>,
              staticDisplay: getTotalPostByMembers(state.allMembers),
            })}
          </div>

          <div>
            {chart({
              header: <b>Total Likes by Members</b>,
              staticDisplay: JSON.parse(state["totalLikes"])[0]["total"],
            })}
          </div>
          <div>
            {chart({
              header: <b>Total Widgets by All Members</b>,
              staticDisplay: getTotalWidgetByMembers(state.allMembers),
            })}
          </div>
          <div>
            {chart({
              data: state["nftMintsChartData"],
              header: <b>NFT Mints Activity</b>,
              valueLabel: "total_activity",
              label: "NFT Mints Activity",
              barColor: "rgb(85, 85, 180)",
            })}
          </div>
          <div>
            {chart({
              data: state["githubChartData"],
              header: <b>Github Activities Members</b>,
              valueLabel: "total_issues_and_pr",
              label: "Total Issues And PR Activities",
              barColor: "rgb(85, 192, 192)",
            })}
          </div>
          <div>
            {chart({
              header: <b>Top Widgets</b>,
              staticDisplay: widgetRank(state.allMembers),
            })}
          </div>
        </div>
      )}

    {state.selectedCommunityAccount === null && state.menu === "all-rc" && (
      <Widget src="rc-dao.near/widget/com.rank" props={{}} />
    )}

    {state.menu === "members" && (
      <div>
        {chart({
          header: <b>Members</b>,
          staticDisplay: state.selectedCommunityAccountMembers && (
            <Widget
              src="indonesiaguild.near/widget/CRM"
              props={{ members: state.selectedCommunityAccountMembers }}
            />
          ),
        })}
      </div>
    )}

    {state.menu === "developer" && (
      <>
        {chart({
          data: state["githubChartData"],
          header: <b>Github Activities Members</b>,
          valueLabel: "total_issues_and_pr",
          label: "Total Issues And PR Activities",
          barColor: "rgb(85, 192, 192)",
        })}
        <div>
          {chart({
            header: <b>Total Widgets by Members</b>,
            staticDisplay: getTotalWidgetByMembers(
              state.selectedCommunityAccountMembers
            ),
          })}
        </div>
      </>
    )}

    {state.menu === "overview" && (
      <>
        <Widget
          src="nearhorizon.near/widget/InfoSegment"
          props={{
            title: "Info",
            description: `Members are those who receive a followback from ${state.selectedCommunityAccount}`,
          }}
        />
        <div>
          {chart({
            header: <b>Total Posts by Members</b>,
            staticDisplay: getTotalPostByMembers(
              state.selectedCommunityAccountMembers
            ),
          })}
        </div>
        <div style={{ display: "flex", flexFlow: "row wrap" }}>
          <div style={{ width: "calc(50%)" }}>
            {chart({
              header: <b>Total Likes by Members</b>,
              staticDisplay: JSON.parse(state["totalLikes"])[0]["total"],
            })}
          </div>
          <div style={{ width: "calc(50%)" }}>
            {chart({
              header: <b>Total Wallets Created by Members</b>,
              staticDisplay: JSON.parse(state["totalWallets"])[0]["total"],
            })}
          </div>
        </div>
      </>
    )}
    {state.menu === "dapp" && (
      <>
        <div>
          {chartDappTimeline({
            data: state["dappTimelineChartData"],
            header: (
              <b>
                Popular dApps in terms of number of interactions on a weekly
                basis
              </b>
            ),
          })}
        </div>
        <div>
          {chartDappUsage({
            data: state["dappUsageChartData"],
            header: <b>Interaction statistics with dapps (txs)</b>,
            valueLabel: "txs",
            label: "Total Transactions",
            barColor: "rgb(85, 85, 180)",
          })}
        </div>
        <div>
          {chartDappUsage({
            data: state["dappUsageChartData"],
            header: <b>Activity Days</b>,
            valueLabel: "activity days",
            label: "Activity Days",
            barColor: "rgb(85, 192, 192)",
          })}
        </div>
        <div>
          {chartDappUsage({
            data: state["dappUsageChartData"],
            header: <b>Transaction per Day</b>,
            valueLabel: "transaction per day",
            label: "Transaction per Day",
            barColor: "rgb(85, 192, 192)",
          })}
        </div>
        <div>
          {chartDappUsage({
            data: state["dappVolumeChartData"],
            header: <b>Dapp Volume in NEAR</b>,
            valueLabel: "volume_near",
            label: "Volume in NEAR",
            barColor: "rgb(85, 85, 180)",
          })}
        </div>
      </>
    )}

    {state.menu === "widget-list" && (
      <div>{widgetDisplay(state.selectedCommunityAccountMembers)}</div>
    )}
    {(state.menu === "dapp" || state.menu === "overview") && (
      <>
        <div>
          {chart({
            data: state["mauChartData"],
            header: <b>Monthly Active Members</b>,
            valueLabel: "mau",
            label: "MAU (members)",
            barColor: "rgb(192, 85, 85)",
          })}
        </div>
        <div>
          {chart({
            data: state["dauChartData"],
            header: <b>Daily Active Members</b>,
            valueLabel: "dau",
            label: "DAU (members)",
            barColor: "rgb(140, 85, 85)",
          })}
        </div>
      </>
    )}
    {state.menu === "nft" && (
      <div>
        {chart({
          data: state["nftMintsChartData"],
          header: <b>NFT Mints Activity</b>,
          valueLabel: "total_activity",
          label: "NFT Mints Activity",
          barColor: "rgb(85, 85, 180)",
        })}
      </div>
    )}
    {state.menu === "developer" && (
      <div>
        {chart({
          header: <b>Top Widgets</b>,
          staticDisplay: widgetRank(state.selectedCommunityAccountMembers),
        })}
      </div>
    )}
  </div>
);
