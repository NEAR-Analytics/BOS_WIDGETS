const fetchResult = fetch(
  "https://storage.googleapis.com/databricks-near-query-runner/output/near_bos_active_users_signups_daily.json"
);
if (!fetchResult.ok) {
  return "failed to fetch data";
}
const parsed = JSON.parse(fetchResult.body);
const data = parsed.data.sort(
  (a, b) => a.collected_for_day - b.collected_for_day
);
const colsToShow = [
  "mau",
  "dau",
  "wau",
  "number_signups",
  "n_signups_7d",
  "n_signups_30d",
  "retained_30d",
];

/*return <div>{JSON.stringify(data)}</div>;*/

const option = {
  title: {
    text: "NEAR BOS Active Accounts and Signups",
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
    data: data.map((r) => new Date(r.collected_for_day).toLocaleDateString()),
  },
  yAxis: {
    type: "value",
  },
  series: colsToShow.map((col) => ({
    name: col,
    type: "line",
    data: data.map((r) => r[col]),
  })),
};

return (
  <div>
    <Widget
      src={`nearpavel.near/widget/EChart`}
      props={{ definition: option }}
    />
  </div>
);
