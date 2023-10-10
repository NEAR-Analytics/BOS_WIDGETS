let query_url_obj = [
  { name: "Arbitrum", url_address: "063aa6d1-6425-4c45-ae43-a0a8b1580743" },
  { name: "Avalanche", url_address: "6f62699a-4975-4980-a2e5-136b1e6eb29f" },
  { name: "Axelar", url_address: "cdca6f7d-cdff-4d43-8418-3492b44099ef" },
  { name: "Base", url_address: "07f5dd25-8523-4017-948d-cec708979e92" },
  { name: "BSC", url_address: "58ffb8a5-820b-4490-8997-619118984620" },
  { name: "Ethereum", url_address: "4d12f850-b3de-4612-b4ae-2ed957a2b9f8" },
  { name: "Flow", url_address: "493e882a-981d-494f-baca-e939c822aeaa" },
  { name: "Gnosis", url_address: "5855ca27-8ee8-4a67-86f0-86b3a279b913" },
  { name: "NEAR", url_address: "5dc651e6-1d80-46ee-aa34-b6b811723de6" },
  { name: "Optimism", url_address: "affe91b4-2cb6-4337-8be6-c7d8f284c800" },
  { name: "Osmosis", url_address: "d1400695-b255-432b-af20-55a26610cf2b" },
  { name: "Polygon", url_address: "0d808d42-aa49-4a48-96af-b2cea5f0d843" },
  { name: "Sei", url_address: "16c8f742-bd9b-4ac7-92bf-6bf861f2967a" },
  { name: "Solana", url_address: "5bd0204a-3229-4866-89c8-248e935d6d6a" },
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
  "rgb(250,164,58)", // Bright Orange
  "rgb(13,131,171)", // Ocean Blue
  "rgb(255,85,85)", // Light Red
  "rgb(85,255,85)", // Light Green
  "rgb(85,85,255)", // Light Blue
  "rgb(255,255,85)", // Bright Yellow
  "rgb(240,130,130)", // Soft Pink
  "rgb(130,240,240)", // Aqua
  "rgb(240,240,130)", // Soft Gold
  "rgb(130,130,240)", // Periwinkle
  "rgb(200,100,150)", // Mauve
  "rgb(150,200,100)", // Olive Green
  "rgb(100,150,200)", // Sky Blue
  "rgb(200,150,100)", // Sandstone
  "rgb(150,100,200)", // Lavender
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
