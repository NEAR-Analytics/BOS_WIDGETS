let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/0c050325-f0fb-4891-be17-7116338b2505/data/latest",
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
    const entryDate = new Date(entry["DAY"]);
    return entryDate >= startDate && entryDate <= endDate;
  });

  // Sort the processed data by date
  return processedData.sort((a, b) => new Date(a["DAY"]) - new Date(b["DAY"]));
};

const dataToDisplay = processData(state.rawData, state.selectedDateRange);

const dates = dataToDisplay.map((entry) => entry["DAY"]);

const TX_1 = {};
const TX_2 = {};
const TX_2_5 = {};
const TX_5 = {};

dataToDisplay.forEach((entry) => {
  TX_1[entry["DAY"]] = entry["TX_1"];
  TX_2[entry["DAY"]] = entry["TX_2"];
  TX_2_5[entry["DAY"]] = entry["TX_2_5"];
  TX_5[entry["DAY"]] = entry["TX_5"];
});

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
      stacked: true,
      grid: {
        color: "rgb(41,51,64)", // This will change the gridline color
        borderColor: "rgb(240,255,240)",
      },
      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
    },
    x: {
      stacked: true,
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
      label: "1 Transactions",
      data: TX_1,
      backgroundColor: "rgb(250,164,58)", // orange
    },
    {
      label: "2 Transactions",
      data: TX_2,
      backgroundColor: "rgb(13,131,171)", // blue
    },
    {
      label: "2-5 Transactions",
      data: TX_2_5,
      backgroundColor: "rgb(0,151,136)", // teal
    },
    {
      label: "5+ Transactions",
      data: TX_5,
      backgroundColor: "rgb(63,81,181)", // indigo
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
        <button className="px-3 py-1 rounded transition-colors duration-200 ease-in bg-gray-800 text-gray-400 hover:bg-gray-700">
          <a
            href="https://api.flipsidecrypto.com/api/v2/queries/0c050325-f0fb-4891-be17-7116338b2505/data/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-50 whitespace-normal break-words block max-w-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </a>
        </button>
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
