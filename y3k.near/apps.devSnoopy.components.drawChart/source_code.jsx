const fetchResult = fetch(
  "https://storage.googleapis.com/databricks-near-query-runner/output/total_fast_auth_by_date.json"
);

if (!fetchResult) {
  return "Loading data...";
}
if (!fetchResult.ok) {
  return "Failed to fetch data";
}

const parsed = JSON.parse(fetchResult.body);
const dataset = parsed.data
  .sort((a, b) => a.start_of_the_week - b.start_of_the_week)
  .map((row) => ({
    "Total Fast Auth Accounts": row.total_fast_auth_acounts,
    Date: new Date(row.start_of_the_week).toISOString().substring(0, 10),
  }));

const colsToShow = ["Total Fast Auth Accounts"];
const definition = {
  title: {
    text: "Bar: Fast Auth Accounts by Date",
    subtext: `Executed by NEAR Data Platform at ${new Date(
      parsed.executed_at
    ).toLocaleString()}`,
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: colsToShow,
    top: "50",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    top: "100",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: dataset.map((r) => r.Date),
  },
  yAxis: {
    type: "value",
  },
  series: colsToShow.map((col) => ({
    name: col,
    type: "bar",
    data: dataset.map((r) => r[col]),
  })),
};

const definition2 = {
  title: {
    text: "Line: Fast Auth Accounts by Date 2nd chart",
    subtext: `Executed by NEAR Data Platform at ${new Date(
      parsed.executed_at
    ).toLocaleString()}`,
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: colsToShow,
    top: "50",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    top: "100",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: dataset.map((r) => r.Date),
  },
  yAxis: {
    type: "value",
  },
  series: colsToShow.map((col) => ({
    name: col,
    type: "line",
    data: dataset.map((r) => r[col]),
  })),
};

return (
  <div>
    <Widget src={`nearpavel.near/widget/EChart`} props={{ definition }} />
  </div>
);
