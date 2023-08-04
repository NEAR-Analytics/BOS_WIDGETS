const fetchResult = fetch(
  "https://storage.googleapis.com/databricks-near-query-runner/output/near_bos_monthly_active_developers_ec.json"
);
if (!fetchResult) {
  return "Loading data...";
}
if (!fetchResult.ok) {
  return "Failed to fetch data";
}
const parsed = JSON.parse(fetchResult.body);
const dataset = parsed.data
  .sort((a, b) => a.collected_for_day - b.collected_for_day)
  .map((row) => ({
    "Full Time": row.full_time,
    "Part Time": row.part_time,
    "One Time": row.one_time,
    "Monthly Active": row.mau,
    Date: new Date(row.collected_for_day).toISOString().substring(0, 10),
  }));

//return <div>{JSON.stringify(data)}</div>;
const colsToShow = ["Full Time", "Part Time", "One Time", "Monthly Active"];
const definition = {
  title: {
    text: "NEAR BOS Active Developers",
    subtext: `Executed by ${parsed.executed_by} at ${new Date(
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
