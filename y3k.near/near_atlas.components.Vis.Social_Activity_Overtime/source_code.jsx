let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/f22d1d23-8993-45ea-9cbb-d27eba5b106d/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const initialState = {
  selectedDateRange: "1Y",
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

const processData = (rawData, dateRange) => {
  const endDate = new Date();
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
  }

  const processedData = rawData.filter((entry) => {
    const entryDate = new Date(entry["DATE"]);
    return entryDate >= startDate && entryDate <= endDate;
  });

  // Sort the processed data by date
  return processedData.sort(
    (a, b) => new Date(a["DATE"]) - new Date(b["DATE"])
  );
};

const dataToDisplay = processData(state.rawData, state.selectedDateRange);

const dates = dataToDisplay.map((entry) => entry["DATE"]);

const POSTS_COUNT = {};
const LIKES_COUNT = {};
const REPLIES_COUNT = {};

dataToDisplay.forEach((entry) => {
  POSTS_COUNT[entry["DATE"]] = entry["POSTS_COUNT"];
  LIKES_COUNT[entry["DATE"]] = entry["LIKES_COUNT"];
  REPLIES_COUNT[entry["DATE"]] = entry["REPLIES_COUNT"];
});

const stacked_options = {
  maintainAspectRatio: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      grid: {
        color: "rgb(41,51,64)", // This will change the gridline color
      },
      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",

      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
      grid: {
        drawOnChartArea: false,
        color: "rgb(41,51,64)", // This will change the gridline color
      },
    },
    y2: {
      type: "linear",
      display: false,
      position: "right",

      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
      grid: {
        drawOnChartArea: false,
        color: "rgb(41,51,64)", // This will change the gridline color
      },
    },
    x: {
      grid: {
        color: "rgb(41,51,64)", // This will change the gridline color
      },
      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
    },
  },
};

const stacked_bar_data = {
  dates,
  datasets: [
    {
      label: "Replies",
      type: "bar",
      data: REPLIES_COUNT,
      backgroundColor: "rgb(0,255,159)",
      yAxisID: "y2",
    },
    {
      label: "Posts",
      type: "line",
      data: POSTS_COUNT,
      backgroundColor: "rgb(250,164,58)",
      yAxisID: "y1",
    },
    {
      label: "Likes",
      type: "bar",
      data: LIKES_COUNT,
      backgroundColor: "rgb(13,131,171)",
      yAxisID: "y",
    },
  ],
};

return (
  <Style>
    <div className="relative text-bg-dark rounded-4 p-3 mb-4">
      <div className="absolute top-0 right-0 flex space-x-2 p-3">
        {["1M", "3M", "YTD", "1Y", "3Y"].map((range) => (
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
      <div className="rounded-4 p-3 mb-4 pt-16">
        {" "}
        {data !== null ? (
          <div>
            <BarEl options={stacked_options} data={stacked_bar_data} />
          </div>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </div>
  </Style>
);
