const fetchResult = fetch(
  "https://storage.googleapis.com/databricks-near-query-runner/output/near_bos_user_activity_weekly.json"
);
if (!fetchResult) {
  return "Loading data...";
}
if (!fetchResult.ok) {
  return "Failed to fetch data";
}
const parsed = JSON.parse(fetchResult.body);
//const data = parsed.data.sort((a, b) => a._week - b._week);
const groupedByWeek = parsed.data.reduce(
  (result, row) => ({
    ...result,
    [row._week]: {
      n_posts: result[row._week].n_posts + row.n_posts,
      n_likes: result[row._week].n_likes + row.n_likes,
      n_comments: result[row._week].n_comments + row.n_comments,
      n_follows: result[row._week].n_follows + row.n_follows,
      n_widget_writes: result[row._week].n_widget_writes + row.n_widget_writes,
    },
  }),
  {}
);
const dataset = Object.keys(groupedByWeek)
  .map((_week) => ({
    _week: Number(_week),
    weekOf: new Date(Number(_week)).toISOString().substring(0, 10),
    ...groupedByWeek[_week],
  }))
  .sort((a, b) => a._week - b._week);

const colsToShow = [
  "n_posts",
  "n_likes",
  "n_comments",
  "n_follows",
  "n_widget_writes",
];

//return <div>{JSON.stringify(dataset)}</div>;

const option = {
  title: {
    text: "NEAR BOS Weekly User Activity",
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
    left: "5%",
    right: "4%",
    bottom: "5%",
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
    data: dataset.map((r) => r.weekOf),
    name: "Week Of",
    nameLocation: "center",
    nameGap: 25,
  },
  yAxis: {
    type: "value",
    name: "Number of Users",
    nameLocation: "center",
    nameGap: 45,
  },
  series: colsToShow.map((col) => ({
    name: col,
    type: "line",
    data: dataset.map((r) => r[col]),
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
