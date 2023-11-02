let query_url_obj = [
  {
    name: "Avalanche",
    url_address:
      "https://api.artemisxyz.com/data/DAU/?artemisIds=avalanche&startDate=2022-01-01&endDate=2023-01-10",
  },
  {
    name: "Ethereum",
    url_address:
      "https://api.artemisxyz.com/data/DAU/?artemisIds=ethereum&startDate=2022-01-01&endDate=2023-01-10",
  },
  {
    name: "NEAR",
    url_address:
      "https://api.artemisxyz.com/data/DAU/?artemisIds=near&startDate=2022-01-01&endDate=2023-01-10",
  },
  {
    name: "Solana",
    url_address:
      "https://api.artemisxyz.com/data/DAU/?artemisIds=solana&startDate=2022-01-01&endDate=2023-01-10",
  },
  {
    name: "Bitcoin",
    url_address:
      "https://api.artemisxyz.com/data/DAU/?artemisIds=bitcoin&startDate=2022-01-01&endDate=2023-01-10",
  },
];

// console.log(updated_url_obj);

let resultObject = {};

// fetch data from url
query_url_obj.forEach((item) => {
  let raw_data = fetch(item.url_address, {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });

  // Assuming the structure is consistent as provided in your example
  if (raw_data.body && raw_data.body.data && raw_data.body.data.artemis_ids) {
    let simplifiedData =
      raw_data.body.data.artemis_ids[item.name.toLowerCase()]; // This will fetch "avalanche" or "bitcoin" or any other name you have
    resultObject[`${item.name.toLowerCase()}:DAU`] = simplifiedData
      ? simplifiedData.DAU
      : [];
  } else {
    resultObject[`${item.name.toLowerCase()}:DAU`] = [];
  }
});

console.log(resultObject);

const initialState = {
  selectedDateRange: "1Y",
  _raw_data: [],
};

state = State.init(initialState);

const handleDateRangeChange = (range) => {
  State.update({
    selectedDateRange: range,
  });
};

const _raw_data = resultObject || [];

State.update({ _raw_data: _raw_data });

// console.log(_raw_data);

let Style = styled.div``;

const darkColors = [
  "rgb(250,164,58)", // Bright Orange (kept unchanged for reference)
  "rgb(0,100,150)", // Darker Ocean Blue
  "rgb(255,0,0)", // Pure Red
  "rgb(0,255,0)", // Pure Green
  "rgb(0,0,255)", // Pure Blue
  "rgb(255,255,0)", // Pure Yellow
  "rgb(200,50,120)", // Deep Pink (different from red and mauve)
  "rgb(0,150,150)", // Dark Teal (between green and blue)
  "rgb(170,170,0)", // Olive (muting down from Soft Gold)
  "rgb(120,0,120)", // Deep Purple (not close to Lavender or Periwinkle)
  "rgb(220,85,85)", // Rust (redder than orange, more muted than red)
  "rgb(0,120,0)", // Dark Green
  "rgb(50,50,150)", // Royal Blue (brighter than Ocean Blue but darker than Light Blue)
  "rgb(170,100,50)", // Earth Brown (muting and darkening the Sandstone)
  "rgb(150,0,200)", // Vibrant Purple (distinct from Lavender and Deep Purple)
];

let colorIndex = 0;
function generateDarkColor() {
  const color = darkColors[colorIndex];
  colorIndex = (colorIndex + 1) % darkColors.length; // Cycle back to 0 if we reach the end
  return color;
}

const processData = (dataObjects, dateRange) => {
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

  const result = {};
  // console.log("dataObjects");
  // console.log(dataObjects);

  Object.entries(dataObjects).forEach(([name, data]) => {
    const processedData = data.filter((entry) => {
      const entryDate = new Date(entry["date"]); // Changed "Date" to "date"
      return entryDate >= startDate && entryDate <= endDate;
    });

    // Here, you can't set properties on a string or an array directly.
    // If you want to associate a color with each name, you'd need a separate structure.
    // dataObj.color = generateDarkColor(); // This line is problematic.

    // Sort the processed data by date
    result[name] = {
      data: processedData.sort(
        (a, b) => new Date(a["Date"]) - new Date(b["Date"])
      ),
      color: generateDarkColor(),
    };
  });

  return result;
};

const dataSetsInfo = processData(state._raw_data, state.selectedDateRange);

const stacked_bar_data = {
  datasets: [],
};

Object.entries(dataSetsInfo).forEach(([name, datasetInfo]) => {
  const DAA = {};

  if (datasetInfo.data) {
    // Check if dataset exists for the given name
    datasetInfo.data.forEach((entry) => {
      DAA[entry["date"]] = entry["val"];
    });

    stacked_bar_data.datasets.push({
      label: name, // Using the 'name' as label
      data: DAA,
      backgroundColor: datasetInfo.color, // Using the color we attached earlier
    });
  }
});

stacked_bar_data.datasets = stacked_bar_data.datasets.map((dataset) => {
  return {
    ...dataset,
    borderColor: dataset.backgroundColor, // Setting the borderColor the same as backgroundColor
  };
});

// Extract dates
if (Object.values(dataSetsInfo).length > 0) {
  stacked_bar_data.dates = Object.values(dataSetsInfo)[0].data.map(
    (entry) => entry["Date"]
  );
}

// console.log("stacked_bar_data");
// console.log(stacked_bar_data);

// stacked_bar_data.dates = dataSetsInfo[0].data.map((entry) => entry["Date"]);

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
        color: "rgb(240,255,240)", // This will change the axis text label color
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
            href="https://api.flipsidecrypto.com/api/v2/queries/c493c7b1-cfcc-4aee-ad79-869b4ed8ca90/data/latest"
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
            <LineEl options={stacked_options} data={stacked_bar_data} />
          </div>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </div>
  </Style>
);
