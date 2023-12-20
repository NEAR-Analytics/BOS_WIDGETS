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

  let members = [...new Set(following.filter((item) => followers.has(item)))];

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
  return (
    <Widget
      src="contribut3.near/widget/Card"
      props={{
        header: header,
        body: staticDisplay ? (
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

const chartDappUsage = ({ data, header, label }) => {
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
              data: tempData.map(entry => entry.txs)
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

const doQueryToFlipside = (query, queryResultId, dataLabel) => {
  // create run (https://docs.flipsidecrypto.com/flipside-api/rest-api)
  const headers = {};
  headers["Content-Type"] = "application/json";
  headers["x-api-key"] = "f0b8c6e1-573a-4f09-a6f5-ea2d13d6416b";

  if (!queryResultId) {
    const requestResult = fetch("https://api-v2.flipsidecrypto.xyz/json-rpc", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "createQueryRun",
        params: [
          {
            resultTTLHours: 24,
            maxAgeMinutes: 1440,
            sql: query,
            tags: {
              source: "postman-demo",
              env: "test",
            },
            dataSource: "snowflake-default",
            dataProvider: "flipside",
          },
        ],
        id: 1,
      }),
      redirect: "follow",
    });

    const queryResultId = requestResult.body.result.queryRun.id;
    setTimeout(
      doQueryToFlipside.bind(undefined, query, queryResultId, dataLabel),
      400
    );
  } else {
    // get results from query run

    const result = fetch("https://api-v2.flipsidecrypto.xyz/json-rpc", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "getQueryRunResults",
        params: [
          {
            queryRunId: queryResultId,
            format: "json",
            page: {
              number: 1,
              size: 100,
            },
          },
        ],
        id: 1,
      }),
      redirect: "follow",
    });

    if (!result.body.result.rows) {
      setTimeout(
        doQueryToFlipside.bind(undefined, query, queryResultId, dataLabel),
        1000
      );
    } else {
      return State.update({
        [dataLabel]: JSON.stringify(result.body.result.rows),
      });
    }
  }
};

const apiDoQueryToFlipSide = (query, dataLabel) => {
  setTimeout(doQueryToFlipside.bind(undefined, query, null, dataLabel), 100);
};

const generateMAU = (members) => {
  if (members.length === 0) return [];
  const formattedMembers = JSON.stringify(members)
    .replaceAll("[", "(")
    .replaceAll("]", ")")
    .replaceAll('"', "'");

  const query = `
    SELECT
        date_trunc('month', a.block_timestamp) AS "date",
        concat(
            date_part(year, "date"),
            '-',
            date_part(month, "date")
        ) as year_month,
        count(DISTINCT a.tx_signer) AS mau
    FROM
        near.core.fact_transactions a
    WHERE
        a.tx_signer != a.tx_receiver
    AND a.tx_signer IN ${formattedMembers}
    AND "date" > dateadd('month', -12, current_date)
    GROUP BY
        1
    ORDER BY
        1 DESC 
    `;

  return apiDoQueryToFlipSide(query, "mauChartData"); // return doQueryToFlipside(query, "queryResultIdMAU");
};

const generateDAU = (members) => {
  if (members.length === 0) return [];
  const formattedMembers = JSON.stringify(members)
    .replaceAll("[", "(")
    .replaceAll("]", ")")
    .replaceAll('"', "'");

  const query = `
    SELECT
      date_trunc('day', a.block_timestamp) AS "date",
      concat(
        date_part(year, "date"),
        '-',
        date_part(month, "date"),
        '-',
        date_part(day, "date")
      ) as year_month,
      count(DISTINCT a.tx_signer) AS dau
    FROM
      near.core.fact_transactions a
    WHERE
      a.tx_signer != a.tx_receiver
      AND a.tx_signer IN ${formattedMembers}
      AND "date" > dateadd('month', -1, current_date)
    GROUP BY
      1
    ORDER BY
      1 desc
    `;

  apiDoQueryToFlipSide(query, "dauChartData"); // return doQueryToFlipside(query, "queryResultIdMAU");
};

const widgetRank = (members) => {
  const data = Social.get("*/graph/star/**", "final");

  const starCountsByWidget = {};

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

const generateGithubActivities = (members) => {
  if (members.length === 0) return [];
  const formattedMembers = JSON.stringify(members)
    .replaceAll("[", "(")
    .replaceAll("]", ")")
    .replaceAll('"', "'");

  const query = `
    WITH github_accounts AS (
      SELECT signer_id AS account,
      JSON_EXTRACT_PATH_TEXT(profile_data, 'github') AS github_account
      FROM
        near.social.fact_profile_changes
      WHERE
        profile_section = 'linktree'
        AND github_account != ''
        AND account IN ${formattedMembers}
    )
    SELECT
      date_trunc('month', ga.createdat) AS "date",
      concat(
        date_part(year, "date"),
        '-',
        date_part(month, "date")
      ) AS YEAR_MONTH,
      count(*) AS total_issues_and_pr
    FROM
      github_accounts a
      JOIN near.beta.github_activity ga ON a.github_account = ga.author
    GROUP BY
      1
    ORDER BY
      1 DESC;
    `;

  apiDoQueryToFlipSide(query, "githubChartData");
};

const generateTotalLikes = (members) => {
  if (members.length === 0) return [];
  const formattedMembers = JSON.stringify(members)
    .replaceAll("[", "(")
    .replaceAll("]", ")")
    .replaceAll('"', "'");
  const query = `SELECT
    COUNT(*) as total
      FROM
        near.social.fact_decoded_actions
      WHERE
        node = 'index'
        and JSON_EXTRACT_PATH_TEXT(node_data, 'like') != ''
        and signer_id in ${formattedMembers}
  `;

  apiDoQueryToFlipSide(query, "totalLikes");
};

const generateTotalWalletsCreated = (members) => {
  if (members.length === 0) return [];
  const formattedMembers = JSON.stringify(members)
    .replaceAll("[", "(")
    .replaceAll("]", ")")
    .replaceAll('"', "'");
  const query = `select
      count(*) as total
    from
      near.core.fact_receipts
    where
      receiver_id = 'near'
      AND actions:predecessor_id IN ${formattedMembers}
      AND actions:receipt:Action:actions[0]:FunctionCall:method_name = 'create_account'
    ;
  `;

  apiDoQueryToFlipSide(query, "totalWallets");
};

const generateNFTMints = (members) => {
  if (members.length === 0) return [];
  const formattedMembers = JSON.stringify(members)
    .replaceAll("[", "(")
    .replaceAll("]", ")")
    .replaceAll('"', "'");
  const query = `SELECT
        date_trunc('month', block_timestamp) AS "date",
        concat(
          date_part(year, "date"),
          '-',
          date_part(month, "date")
        ) AS YEAR_MONTH,
        COUNT(DISTINCT tx_hash) as total_activity
    FROM
      near.nft.fact_nft_mints
    WHERE (receiver_id IN ${formattedMembers} OR owner_id IN ${formattedMembers})
    GROUP BY 1;
  `;

  apiDoQueryToFlipSide(query, "nftMintsChartData");
};

const generateDappUsage = (members) => {
  if (members.length === 0) return [];
  const formattedMembers = JSON.stringify(members)
    .replaceAll("[", "(")
    .replaceAll("]", ")")
    .replaceAll('"', "'");
  const query = `with lst_top_dApps as (
      select top 20
        INITCAP( PROJECT_NAME) as dApp
        ,count(DISTINCT block_timestamp::date) as "Activity days"
        ,count(DISTINCT tx_hash) as TXs
        ,TXs / "Activity days" as "Transaction per day"
      from near.core.fact_transactions
        join near.core.dim_address_labels on address = TX_RECEIVER
      where label_type='dapp' and tx_signer in ${formattedMembers}
      group by 1
      )
      select * from lst_top_dApps;
  `;

  apiDoQueryToFlipSide(query, "dappUsageChartData");
};

State.update({
  selectedCommunityAccountMembers: getMembers(state.selectedCommunityAccount),
});
if (state.menu === "developer")
  generateGithubActivities(state.selectedCommunityAccountMembers);
if (state.menu === "overview" || state.menu === "dapp")
  generateMAU(state.selectedCommunityAccountMembers);
if (state.menu === "overview")
  generateTotalLikes(state.selectedCommunityAccountMembers);
if (state.menu === "overview" || state.menu === "dapp")
  generateDAU(state.selectedCommunityAccountMembers);
if (state.menu === "overview")
  generateTotalWalletsCreated(state.selectedCommunityAccountMembers);
if (state.menu === "nft")
  generateNFTMints(state.selectedCommunityAccountMembers);
if (state.menu === "dapp")
  generateDappUsage(state.selectedCommunityAccountMembers);

if (state.menu === "all-overview") {
  State.update({
    allMembers: rcDaoMembers.flatMap((rcAccountId) => getMembers(rcAccountId)),
  });
  generateTotalLikes(state.allMembers);
  generateDAU(state.allMembers);
  generateNFTMints(state.allMembers);
  generateMAU(state.allMembers);
  generateGithubActivities(state.allMembers);
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
        List of RCs
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
      <div>
        {chartDappUsage({
          data: state["dappUsageChartData"],
          header: <b>Dapp Usage</b>,
          valueLabel: "txs",
          label: "Total Transactions",
          barColor: "rgb(85, 85, 180)",
        })}
      </div>
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
