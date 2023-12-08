const SERIES_TITLE = props.SERIES_TITLE || "Onchain African";

let rawData = fetch(
  "https://raw.githubusercontent.com/NEAR-Analytics/NEAR-Social/main/data/output_snoopy_pipeline_benchmark.json",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const parsedData = JSON.parse(rawData.body);

// Filtering to get series where is_new_account is false
let jsObject = parsedData.data.filter(
  (item) => item.series_title === SERIES_TITLE
);

if (SERIES_TITLE == "BENCHMARK") {
  // Filtering to get series where is_new_account is false
  jsObject = parsedData.data;
}

// console.log("jsObject", jsObject);

// const jsObject = JSON.parse(rawData.body);

// // Filtering to get series where is_new_account is true
// const seriesNewAccount = jsObject.data.filter(
//   (item) => item.is_new_account === true
// );

// // Filtering to get series where is_new_account is false
// const seriesExistingAccount = jsObject.data.filter(
//   (item) => item.is_new_account === false
// );
// console.log("Series with New Accounts:", seriesNewAccount);
// console.log("Series with Existing Accounts:", seriesExistingAccount);

// Calculate total accounts
const totalAccounts = jsObject.length;

// Function to aggregate the data and calculate percentage
const aggregateData = (data, is_new_account) => {
  const count = data.filter(
    (item) => item.is_new_account === is_new_account
  ).length;
  const percentage =
    totalAccounts > 0 ? ((count / totalAccounts) * 100).toFixed(2) : 0;
  return [count, parseFloat(percentage)];
};

// Creating the series
const series = [
  {
    data: [aggregateData(jsObject, true)[1]], // percentage of new accounts
    type: "bar",
    stack: "a",
    name: "New Accounts",

    label: {
      show: true,
      formatter: "{c}%",
    },
  },
  {
    data: [aggregateData(jsObject, false)[1]], // percentage of existing accounts
    type: "bar",
    stack: "a",
    name: "Existing Accounts",

    label: {
      show: true,
      formatter: "{c}%",
    },
  },
];

const stackInfo = {};
for (let i = 0; i < series[0].data.length; ++i) {
  for (let j = 0; j < series.length; ++j) {
    const stackName = series[j].stack;
    if (!stackName) {
      continue;
    }
    if (!stackInfo[stackName]) {
      stackInfo[stackName] = {
        stackStart: [],
        stackEnd: [],
      };
    }
    const info = stackInfo[stackName];
    const data = series[j].data[i];
    if (data && data !== "-") {
      if (info.stackStart[i] == null) {
        info.stackStart[i] = j;
      }
      info.stackEnd[i] = j;
    }
  }
}
for (let i = 0; i < series.length; ++i) {
  const data = series[i].data;
  const info = stackInfo[series[i].stack];
  for (let j = 0; j < series[i].data.length; ++j) {
    // const isStart = info.stackStart[j] === i;
    const isEnd = info.stackEnd[j] === i;
    const topBorder = isEnd ? 20 : 0;
    const bottomBorder = 0;
    data[j] = {
      value: data[j],
      itemStyle: {
        borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder],
      },
    };
  }
}

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

const definition = {
  legend: {},

  grid: {
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // Use axis to trigger tooltip
      type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  xAxis: {
    type: "category",
    data: [SERIES_TITLE],
  },
  yAxis: {
    type: "value",
  },
  series: series,
};

return (
  <div>
    <Widget src={`nearpavel.near/widget/EChart`} props={{ definition }} />
  </div>
);
