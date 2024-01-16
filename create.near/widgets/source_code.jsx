const accountId = props.accountId ?? context.accountId ?? "devs.near";

let data = Social.keys(`${accountId}/widget/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (!data) {
  return "Loading";
}

data = Object.entries(data[accountId].widget ?? {});
data.sort((a, b) => b[1] - a[1]);

const creatorId = props.creatorId ?? context.accountId ?? "devs.near";
const widgetName = props.widgetName ?? "DAO.Members";

const GRAPHQL_ENDPOINT = "https://near-queryapi.api.pagoda.co";
const STORE = "storage.googleapis.com";
const BUCKET = "databricks-near-query-runner";
const BASE_URL = `https://${STORE}/${BUCKET}/output/near_bos_component_details/component_rpc_loads`;
const dataset = `${BASE_URL}/${creatorId}/widget/${widgetName}`;

const DESC_MAX_WORDS = 15;
const DEPENDANCY_MAX = 5;

const [isLoadingRpcImpressions, setLoadingRpcImpressions] = useState(true);
const [componentImpressionsData, setComponentImpressionsData] = useState({
  impressions: undefined,
  weekly_chart_data_config: undefined,
  executed_at: undefined,
});
const [developerSince, setDeveloperSince] = useState(undefined);
const [numberOfComponentsPublished, setNumberOfComponentsPublished] =
  useState(0);
const [showAllDependencies, setShowAllDependencies] = useState(false);

const indexerQueries = `
  query GetWidgetCount {
   eduohe_near_nearcon_2023_widget_activity_feed_widget_activity_aggregate(
      where: {account_id: {_eq: "${creatorId}"}}
    ) {
      aggregate {
        count(distinct: true, columns: widget_name)
      }
    }
  }
  query GetDeveloperSince {
  eduohe_near_nearcon_2023_widget_activity_feed_widget_activity_aggregate(
      where: {account_id: {_eq: "${creatorId}"}}
    ) {
      aggregate {
        min {
          block_timestamp
        }
      }
    }
  }
`;

const normalizeMarkdown = (text) => {
  // convert headers to normal text (remove # symbols)
  text = text.replace(/^#+\s*/gm, "");
  // convert bold and italic to normal text (remove * and _ symbols)
  text = text.replace(/(\*\*|__)(.*?)\1/g, "$2");
  text = text.replace(/(\*|_)(.*?)\1/g, "$2");
  // remove links
  text = text.replace(/\[(.*?)\]\(.*?\)/g, "$1");
  // remove images
  text = text.replace(/!\[(.*?)\]\(.*?\)/g, "$1");
  return text.trim();
};

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

const computeWeekLabel = (weekDateString) => {
  let startDate = new Date(weekDateString);
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  let label = `${formatDate(startDate)} - ${formatDate(endDate)}`;
  return label;
};

const getComponentImpressions = () => {
  try {
    const url = `${dataset}.json`;
    const res = fetch(url);
    if (res.ok) {
      const parsedResults = JSON.parse(res.body);
      const weekly_chart_data = parsedResults.data.rpc_loads
        .sort((a, b) => new Date(a.week) - new Date(b.week))
        .map((row) => ({
          "RPC Impressions": row.number_of_rpc_loads,
          Week: computeWeekLabel(row.week),
        }));

      const weekly_chart_data_config = {
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        grid: {
          left: "3%",
          right: "4%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: weekly_chart_data.map((r) => r.Week),
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        yAxis: {
          type: "value",
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        series: [
          {
            name: "Number of Views",
            type: "line",
            smooth: true,
            data: weekly_chart_data.map((r) => r["RPC Impressions"]),
            areaStyle: {},
            color: "#59e691",
            showSymbol: false,
          },
        ],
      };
      setLoadingRpcImpressions(false);
      setComponentImpressionsData({
        impressions: parsedResults.data.total_rpc_loads,
        weekly_chart_data_config,
        executed_at: parsedResults.executed_at,
      });
    }
  } catch (error) {
    console.error(
      "Error on fetching component impression data: ",
      error.message
    );
  }
};

function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(`${GRAPHQL_ENDPOINT}/v1/graphql`, {
    method: "POST",
    headers: { "x-hasura-role": "eduohe_near" },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
}

const Sidebar = styled.div`
  > div {
    padding-bottom: 32px;
    border-bottom: 1px solid #eceef0;
    margin-bottom: 32px;

    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
      margin-bottom: 0;
    }
  }

  @media (max-width: 995px) {
    grid-row: 1;
  }
`;

const SideBarContainer = styled.div`
  @media (max-width: 995px) {
    margin-top: 10px;
  }
`;

const SmallTitle = styled.h3`
  color: #687076;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 20px;
  text-transform: uppercase;

  @media (max-width: 770px) {
    margin-bottom: 16px;
  }
`;

const Bio = styled.div`
  color: #11181c;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 15px;
  margin-top: 20px;

  > *:last-child {
    margin-bottom: 15 !important;
  }

  @media (max-width: 900px) {
    margin-bottom: 15px;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};

  i {
    margin-right: 4px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid #eceef0;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
`;

const StatsBadge = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Icon = styled.i`
  font-size: 15px;
  fill: currentColor;
  padding-right: 5px;
`;

const StatsText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: "#11181C";
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  border-radius: 12px;
`;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 450px) {
    flex-direction: row;
  }
`;

const Graph = styled.div`
  display: flex;
  margin-top: -24px;
  @media (min-width: 450px) {
    margin-left: 30px;
  }
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const code = Social.get(`${creatorId}/widget/${widgetName}`);
const dependencyMatch =
  code && code.matchAll(/<Widget[\s\S]*?src=.*?"(.+)"[\s\S]*?\/>/g);
let dependencySources = [...(dependencyMatch || [])]
  .map((r) => r[1])
  .filter((r) => !!r);
dependencySources = dependencySources.filter(
  (r, i) => dependencySources.indexOf(r) === i && r !== "(.+)"
);

const accountProfileDescription =
  Social.getr(`${creatorId}/profile`).description ?? "";

if (accountProfileDescription) {
  const text = normalizeMarkdown(accountProfileDescription).split(" ");
  accountProfileDescription = text.slice(0, DESC_MAX_WORDS);
  if (text.length >= DESC_MAX_WORDS) {
    accountProfileDescription.push("...");
  }
  accountProfileDescription = accountProfileDescription.join(" ");
}

if (isLoadingRpcImpressions) {
  getComponentImpressions();
}

useEffect(() => {
  fetchGraphQL(indexerQueries, "GetWidgetCount", {}).then((result) => {
    if (result.status === 200 && result.body) {
      if (result.body.errors) {
        console.log("GetWidgetCount error:", result.body.errors);
        return;
      }
      let data = result.body.data;
      if (data) {
        const noComponents =
          data
            .eduohe_near_nearcon_2023_widget_activity_feed_widget_activity_aggregate
            .aggregate.count;
        setNumberOfComponentsPublished(noComponents);
      }
    }
  });
}, []);

useEffect(() => {
  fetchGraphQL(indexerQueries, "GetDeveloperSince", {}).then((result) => {
    if (result.status === 200 && result.body) {
      if (result.body.errors) {
        console.log("GetDeveloperSince error:", result.body.errors);
        return;
      }
      let data = result.body.data;
      if (
        data &&
        data.eduohe_near_nearcon_2023_widget_activity_feed_widget_activity_aggregate
      ) {
        const developerSince =
          data
            .eduohe_near_nearcon_2023_widget_activity_feed_widget_activity_aggregate
            .aggregate.min.block_timestamp;
        setDeveloperSince(developerSince);
      }
    }
  });
}, []);

const widgets = data.map((p, i) => {
  const widgetName = `${p[0]}`;
  return (
    <div className="d-flex flex-row justify-content-between" key={i}>
      <h5 className="m-3 mt-5">
        <a href={`#/${creatorId}/widget/${widgetName}`}>
          {p[0] || <i>widget</i>}
        </a>
      </h5>
      <Sidebar>
        <SideBarContainer>
          <Container>
            <GraphContainer>
              <div
                className="ms-3"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Text small style={{ marginBottom: "10px" }}>
                  Views
                </Text>
                <Text medium bold style={{ marginBottom: "10px" }}>
                  {componentImpressionsData.impressions ?? "..."}
                </Text>
              </div>
              <div
                className="ms-3"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Text small style={{ marginBottom: "10px" }}>
                  Updated
                </Text>
                <Text medium bold style={{ marginBottom: "10px" }}>
                  <Widget
                    src="mob.near/widget/TimeAgo@97556750"
                    props={{ keyPath: `${creatorId}/widget/${widgetName}` }}
                  />
                  ago
                </Text>
              </div>
              {componentImpressionsData.weekly_chart_data_config && (
                <Graph>
                  <Widget
                    src="near/widget/Chart"
                    props={{
                      definition:
                        componentImpressionsData.weekly_chart_data_config,
                      width: "180px",
                      height: "100px",
                    }}
                  />
                </Graph>
              )}
            </GraphContainer>
          </Container>
        </SideBarContainer>
      </Sidebar>
    </div>
  );
});

return (
  <div className="col">
    <div className="card h-100">
      <div className="card-header d-flex flex-row justify-content-between">
        <div className="mt-3 mb-3 ms-2">
          <Widget src="mob.near/widget/Profile" props={{ accountId }} />{" "}
        </div>
        <Container>
          <Stats>
            <StatsBadge>
              <Icon className="ph ph-code" />
              <span className="badge rounded-pill bg-secondary">
                {numberOfComponentsPublished
                  ? numberOfComponentsPublished + " published"
                  : "..."}
              </span>
            </StatsBadge>
            <StatsBadge>
              <Icon className="bi bi-calendar" />
              <span className="badge rounded-pill bg-secondary">
                {developerSince ? (
                  <Widget
                    key="foo"
                    src="near/widget/TimeAgo"
                    props={{
                      alwaysRelative: true,
                      blockTimestamp: developerSince,
                    }}
                  />
                ) : (
                  <span>...</span>
                )}
              </span>
            </StatsBadge>
          </Stats>
        </Container>
      </div>
      <div className="card-body">{widgets}</div>
    </div>
  </div>
);
