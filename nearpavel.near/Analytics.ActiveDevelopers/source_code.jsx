const fetchResult = fetch(
  "https://storage.googleapis.com/databricks-near-query-runner/output/near_bos_monthly_active_developers_ec.json"
);
if (!fetchResult.ok) {
  return "failed to fetch data";
}
const parsed = JSON.parse(fetchResult.body);
const data = parsed.data.sort(
  (a, b) => a.collected_for_day - b.collected_for_day
);

const option = {
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
    data: [
      "full_time_devs",
      "part_time_devs",
      "one_time_devs",
      "monthly_active_devs",
    ],
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
  series: [
    {
      name: "full_time_devs",
      type: "line",
      stack: "Total",
      data: data.map((r) => r.full_time_devs),
    },
    {
      name: "part_time_devs",
      type: "line",
      stack: "Total",
      data: data.map((r) => r.part_time_devs),
    },
    {
      name: "one_time_devs",
      type: "line",
      stack: "Total",
      data: data.map((r) => r.one_time_devs),
    },
    {
      name: "monthly_active_devs",
      type: "line",
      data: data.map((r) => r.monthly_active_devs),
    },
  ],
};

return (
  <div>
    <Widget
      src={`nearpavel.near/widget/EChart`}
      props={{ definition: option }}
    />
  </div>
);
