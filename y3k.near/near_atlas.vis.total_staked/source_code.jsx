let static_file_param = "near_supply_staking.csv";
// Monthly Active Accounts Example
// Monthly Active Accounts Example
let rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/d9b8ce55-84eb-4497-a824-ae7c738052da/data/latest",
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

const data = rawData.body || [];
State.update({ rawData: data });

let Style = styled.div`
                `;

//console.log(rawData);
// data available

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
    case "10Y":
      startDate.setFullYear(endDate.getFullYear() - 10);
      break;
  }

  const processedData = rawData.filter((entry) => {
    const entryDate = new Date(entry["Date"]);
    return entryDate >= startDate && entryDate <= endDate;
  });

  // Sort the processed data by date
  return processedData.sort(
    (a, b) => new Date(a["Date"]) - new Date(b["Date"])
  );
};

const dataToDisplay = processData(state.rawData, state.selectedDateRange);

const dates = dataToDisplay.map((entry) => entry["Date"]);
const total_staked = {};

dataToDisplay.forEach((entry) => {
  total_staked[entry["Date"]] = entry["Staked Supply"];
});

const area_chart_data = {
  dates,
  datasets: [
    {
      type: "bar",
      fill: true,
      label: "Total Staked",
      borderWidth: 2,

      borderColor: "#fbaf53",
      backgroundColor: "rgb(250,164,58)",
      data: total_staked,
    },
  ],
};

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
      grid: {
        color: "rgb(41,51,64)", // This will change the gridline color
        borderColor: "rgb(240,255,240)",
      },
      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
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

return (
  <Style>
    <div className="relative text-bg-dark rounded-4 p-3 mb-4">
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
      <div className="rounded-4 p-3 mb-4 pt-16">
        {data !== null ? (
          <p>
            <BarEl data={area_chart_data} options={stacked_options} />
          </p>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </div>
  </Style>
);
