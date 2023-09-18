let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/ee206acf-1c90-4f14-823d-1c279dd78995/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const initialState = {
  selectedDateRange: "1M",
  rawData: [],
};

state = State.init(initialState);

const handleDateRangeChange = (range) => {
  State.update({
    selectedDateRange: range,
  });
};

const data = raw_data.body || [];
State.update({ rawData: data });

let Style = styled.div`
`;
// logic start

const COLORS = [
  "rgb(255, 99, 132)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(255, 159, 64)",
  "rgb(54, 162, 235)",
  "rgb(201, 203, 207)",
  "rgb(255, 205, 86)",
  "rgb(255, 99, 71)",
  "rgb(147, 112, 219)",
  "rgb(0, 128, 128)",
  "rgb(100, 149, 237)",
  "rgb(127, 255, 0)",
];

const processData = (rawData, dateRange) => {
  const endDate = new Date(); // current date
  let startDate = new Date();

  switch (dateRange) {
    case "1M":
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case "3M":
      startDate.setMonth(endDate.getMonth() - 3);
      break;
    case "YTD":
      startDate = new Date(endDate.getFullYear(), 0, 1); // start of the year
      break;
    case "1Y":
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    case "3Y":
      startDate.setFullYear(endDate.getFullYear() - 3);
      break;
    case "10Y":
      startDate.setFullYear(endDate.getFullYear() - 10);
      break;
  }

  const sortedData = rawData.sort(
    (a, b) => new Date(a["DATE"]) - new Date(b["DATE"])
  );
  return rawData.filter((entry) => {
    const entryDate = new Date(entry["DATE"]);
    return entryDate >= startDate && entryDate <= endDate;
  });
};

const generateDatasets = (processedData) => {
  const groupedByChain = {};

  // Group data by the 'CHAIN' field
  processedData.forEach((entry) => {
    if (!groupedByChain[entry.CHAIN]) {
      groupedByChain[entry.CHAIN] = [];
    }
    groupedByChain[entry.CHAIN].push(entry);
  });

  // Now create a dataset for each unique 'CHAIN' value
  return Object.keys(groupedByChain).map((chainName, index) => {
    const sortedChainData = groupedByChain[chainName].sort((a, b) => {
      return new Date(a["DATE"]) - new Date(b["DATE"]);
    });

    return {
      label: chainName,
      data: sortedChainData.map((entry) => ({
        x: entry.DATE,
        y: entry.TXNS,
      })),
      backgroundColor: COLORS[index % COLORS.length],
      borderColor: COLORS[index % COLORS.length],
      fill: false,
      type: "line",
    };
  });
};

const dataToDisplay = processData(state.rawData, state.selectedDateRange);
const datasets = generateDatasets(dataToDisplay);

const dates = dataToDisplay.map((entry) => entry["DATE"]);

// styles
const maxYValue = Math.max(...dataToDisplay.map((d) => d.TXNS));

let maxMilestone;
if (maxYValue <= 20e3) {
  maxMilestone = 20e3;
} else if (maxYValue <= 100e3) {
  maxMilestone = 100e3;
} else if (maxYValue <= 200e3) {
  maxMilestone = 200e3;
} else if (maxYValue <= 400e3) {
  maxMilestone = 400e3;
} else if (maxYValue <= 1e6) {
  maxMilestone = 1e6;
} else {
  maxMilestone = 2e6;
}
let yTicks;

switch (maxMilestone) {
  case 20e3:
    yTicks = [0, 10e3, 20e3];
    break;
  case 100e3:
    yTicks = [0, 20e3, 40e3, 100e3];
    break;
  case 200e3:
    yTicks = [0, 100e3, 200e3];
    break;
  case 400e3:
    yTicks = [0, 200e3, 400e3];
    break;
  case 1e6:
    yTicks = [0, 400e3, 1e6];
    break;
  case 2e6:
    yTicks = [0, 1e6, 2e6];
    break;
}

const stacked_options = {
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
  scales: {
    y: {
      stacked: false,
      grid: {
        color: "rgb(41,51,64)", // This will change the gridline color
        borderColor: "rgb(240,255,240)",
      },
      ticks: {
        callback: (value) => {
          if (value >= 1e6) {
            return value / 1e6 + "m";
          } else if (value >= 1e3) {
            return value / 1e3 + "k";
          } else {
            return value;
          }
        },
        color: "rgb(240,255,240)",
        autoSkip: false, // ensures all ticks are shown
        maxTicksLimit: 8, // Adjust if necessary
        suggestedMin: 0,
        suggestedMax: 2e6,
        stepSize: 10e3, // this determines the difference between consecutive tick marks
      },
    },
    x: {
      stacked: false,
      grid: {
        color: "rgb(41,51,64)", // This will change the gridline color
      },
      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
    },
  },
};

const chartConfig = {
  dates,
  datasets: datasets,
};
return (
  <Style>
    <div className="relative text-bg-dark container">
      <div className="absolute top-0 right-0 flex space-x-2 p-3">
        {["1M", "3M", "YTD", "1Y", "3Y", "10Y"].map((range) => (
          <button
            key={range}
            onClick={() => handleDateRangeChange(range)}
            className={`px-3 py-1 rounded transition-colors duration-200 ease-in ${
              state.selectedDateRange === range
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
      {data !== null ? (
        <div className="rounded-4 p-3 mb-4 pt-16">
          {" "}
          {/* Added pt-16 here for padding-top */}
          <div className="">
            <BarEl options={stacked_options} data={chartConfig} />
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
