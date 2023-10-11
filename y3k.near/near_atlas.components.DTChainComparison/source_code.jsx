let query_url_obj = [
  { name: "Arbitrum", url_address: "792225e3-f606-4d19-b99b-6957013105c0" },
  { name: "Avalanche", url_address: "6069b95f-3a7f-4103-b729-f88fb2aaab36" },
  { name: "Axelar", url_address: "f9b18156-5a72-4e4f-88f1-ac2af5cb40e5" },
  { name: "Base", url_address: "3e85f75b-b685-4601-8652-cf0f428d8581" },
  { name: "Bitcoin", url_address: "567aaa02-c60b-43a2-8354-5b6dbfa35ff2" },
  { name: "BSC", url_address: "438ad14f-d1a2-44d6-a3ab-65f1521c702b" },
  { name: "Ethereum", url_address: "71d58a08-af9f-4203-b0f8-e88d1a7c6c9e" },
  { name: "Flow", url_address: "9a41fa07-24b0-4824-9bb4-821a05d527ef" },
  { name: "Gnosis", url_address: "0d8670e1-c3c0-4126-814a-42b1ebaac84e" },
  { name: "NEAR", url_address: "929c5e31-1d31-4612-a4f1-eed2ae04af02" },
  { name: "Optimism", url_address: "c7f9455c-23ea-4539-a4b3-734d075981c9" },
  { name: "Osmosis", url_address: "eb069a78-abe6-45de-9af8-8b399bc5c5c5" },
  { name: "Polygon", url_address: "39eb7c48-cf52-4f62-9a48-7919ce474da0" },
  { name: "Sei", url_address: "33fc6fd5-2451-41c0-ad4d-d7a442faca71" },
  { name: "Solana", url_address: "2fd5b627-ddee-4699-8fa1-9e7037584b2b" },
];

//  add dynamic parameters to url
let query_url =
  "https://api.flipsidecrypto.com/api/v2/queries/PLACEHOLDER/data/latest";

// Create a new array with updated items
let updated_url_obj = query_url_obj.map((item) => {
  return {
    ...item,
    url_address: query_url.replace("PLACEHOLDER", item.url_address),
  };
});

// console.log(updated_url_obj);

let resultObject = {};

// fetch data from url
updated_url_obj.forEach((item) => {
  let raw_data = fetch(item.url_address, {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  // Note: without using async/await or .then(), you won't get the body directly
  // so you may need additional handling here.
  resultObject[item.name] = raw_data.body || [];
});

// console.log(resultObject);

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
  // console.log("dataObjects")
  // console.log(dataObjects)

  Object.entries(dataObjects).forEach(([name, data]) => {
    const processedData = data.filter((entry) => {
      const entryDate = new Date(entry["Date"]);
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
      DAA[entry["Date"]] = entry["Values"];
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
