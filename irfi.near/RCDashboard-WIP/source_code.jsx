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
  selectedCommunityAccount: communityAccounts[0],
});

const getTotalWidgetByMembers = (members) => {
  if (!members) return 0;

  const total = members
    .map((accountId) => {
      return Object.keys(
        Social.keys(`${accountId}/widget/*`, "final", {
          return_type: "BlockHeight",
          values_only: false,
        })[accountId].widget || {}
      ).length;
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

const doQueryToFlipside = (query, queryResultId, dataLabel) => {
  // create run (https://docs.flipsidecrypto.com/flipside-api/rest-api)
  const headers = {};
  headers["Content-Type"] = "application/json";
  headers["x-api-key"] = "07811919-9c82-4e96-8496-9cf378305d22";

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

const widgetRank = () => {
  const data = Social.get("*/graph/star/**", "final");

  const starCountsByWidget = {};

  Object.keys(data).forEach((user) => {
    const userData = data[user];
    const widgetData = userData?.graph?.star;

    if (widgetData) {
      state.selectedCommunityAccountMembers.map((widgetCreator) => {
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

State.update({
  selectedCommunityAccountMembers: getMembers(state.selectedCommunityAccount),
});
generateGithubActivities(state.selectedCommunityAccountMembers);
generateMAU(state.selectedCommunityAccountMembers);
generateTotalLikes(state.selectedCommunityAccountMembers);
generateDAU(state.selectedCommunityAccountMembers);
generateTotalWalletsCreated(state.selectedCommunityAccountMembers);
generateNFTMints(state.selectedCommunityAccountMembers);

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
          queryResultIdMAU: null,
          queryResultIdDevActivities: null,
          totalLikes: null,
          githubChartData: null,
          mauChartData: null,
          dauChartData: null,
          nftMintsChartData: null,
        })
      }
    />
    {/*Members:{" "}
    {JSON.stringify(state.selectedCommunityAccountMembers)
      .replaceAll('"', "'")
      .replaceAll("[", "(")
      .replaceAll("]", ")")} */}
    {chart({
      data: state["githubChartData"],
      header: <b>Github Activities Members</b>,
      valueLabel: "total_issues_and_pr",
      label: "Total Issues And PR Activities",
      barColor: "rgb(85, 192, 192)",
    })}
    <div style={{ display: "flex", flexFlow: "row wrap" }}>
      <div style={{ width: "calc(50%)" }}>
        {chart({
          header: <b>Total Widgets by Members</b>,
          staticDisplay: getTotalWidgetByMembers(
            state.selectedCommunityAccountMembers
          ),
        })}
      </div>
      <div style={{ width: "calc(50%)" }}>
        {chart({
          header: <b>Total Posts by Members</b>,
          staticDisplay: getTotalPostByMembers(
            state.selectedCommunityAccountMembers
          ),
        })}
      </div>
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
        data: state["nftMintsChartData"],
        header: <b>NFT Mints Activity</b>,
        valueLabel: "total_activity",
        label: "NFT Mints Activity",
        barColor: "rgb(85, 85, 180)",
      })}
    </div>

    <div>
      {chart({
        header: <b>Top Widgets</b>,
        staticDisplay: widgetRank(),
      })}
    </div>
  </div>
);
