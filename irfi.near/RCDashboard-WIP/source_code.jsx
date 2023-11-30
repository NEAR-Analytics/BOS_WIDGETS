State.init({
  selectedCommunityAccountMembers: [],
  selectedCommunityAccount: null,
  queryResultIdMAU: null,
  queryResultIdDevActivities: null,
});

const communityAccounts = [
  { text: "Indonesia - indonesiaguild.near", value: "indonesiaguild.near" },
  { text: "Test Account - irfi.near", value: "irfi.near" },
];

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

  State.update({ selectedCommunityAccountMembers: members });

  return members;
};

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

const generateChartCode = (data, valueLabel, label, barColor) => {
  return `
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
};

const doQueryToFlipside = (query, queryResultKey) => {
  // create run (https://docs.flipsidecrypto.com/flipside-api/rest-api)
  const headers = {};
  headers["Content-Type"] = "application/json";
  headers["x-api-key"] = "3638c7b4-6a72-4a1f-a61d-613aa1fc1a9c";

  if (!state.queryResultIdMAU) {
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

    State.update({ [queryResultKey]: queryResultId });
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
            queryRunId: state[queryResultKey],
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
    return result.body.result.rows;
  }
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

  return doQueryToFlipside(query, "queryResultIdMAU");
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

  return doQueryToFlipside(query, "queryResultIdDevActivities");
};

getMembers(state.selectedCommunityAccount);

return (
  <div className="container">
    <h1>Regional Community Dashboard WIP</h1>
    <Widget
      src="near/widget/Select"
      props={{
        label: "Select your regional community account:",
        options: communityAccounts,
        onChange: (value) =>
          State.update({
            selectedCommunityAccount: value.value,
            queryResultIdMAU: null,
            queryResultIdDevActivities: null,
          }),
      }}
    />
    {/* Members: {JSON.stringify(state.selectedCommunityAccountMembers)} */}
    <div>
      <Widget
        src="contribut3.near/widget/Card"
        props={{
          header: <b>Github Activities Members</b>,
          body: (
            <iframe
              className="w-100"
              style={{ height: "300px" }}
              srcDoc={generateChartCode(
                JSON.stringify(
                  generateGithubActivities(
                    state.selectedCommunityAccountMembers
                  )
                ),
                "total_issues_and_pr",
                "Total Issues And PR Activities",
                "rgb(85, 192, 192)"
              )}
            />
          ),
        }}
      />
    </div>
    <div style={{ display: "flex", flexFlow: "row wrap" }}>
      <div style={{ width: "calc(50%)" }}>
        <Widget
          src="contribut3.near/widget/Card"
          props={{
            header: <b>Total Widgets by Members</b>,
            body: (
              <p>
                {getTotalWidgetByMembers(state.selectedCommunityAccountMembers)}
              </p>
            ),
          }}
        />
      </div>
      <div style={{ width: "calc(50%)" }}>
        <Widget
          src="contribut3.near/widget/Card"
          props={{
            header: <b>Placeholder</b>,
            body: <p>1000</p>,
          }}
        />
      </div>
    </div>
    <div>
      <Widget
        src="contribut3.near/widget/Card"
        props={{
          header: <b>Monthly Active Members</b>,
          body: (
            <iframe
              className="w-100"
              style={{ height: "300px" }}
              srcDoc={generateChartCode(
                JSON.stringify(
                  generateMAU(state.selectedCommunityAccountMembers)
                ),
                "mau",
                "MAU (Members)",
                "rgb(192, 85, 85)"
              )}
            />
          ),
        }}
      />
    </div>
    {/*MAU Result: {JSON.stringify(generateMAU(state.selectedCommunityAccountMembers))} */}
  </div>
);
