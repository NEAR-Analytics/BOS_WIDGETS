let query_url_obj = [
  { name: "Arbitrum", url_address: "7548f19b-d7cb-4fb2-8ed1-75ffefebae15" },
  { name: "Avalanche", url_address: "278d4896-0e1a-4697-9551-f12529567920" },
  { name: "Axelar", url_address: "9ebbfd40-82f3-432f-a321-a20f721eb422" },
  { name: "Base", url_address: "61ccca7a-7ac7-4582-9036-555e34d6adcf" },
  { name: "Bitcoin", url_address: "07283929-e901-4f7d-b2fc-09dc60208438" },
  { name: "BSC", url_address: "63ef97f1-0b06-4278-8117-b0307986ea72" },
  { name: "Ethereum", url_address: "7c3aca82-c59a-40fe-8724-d6494ecaa26e" },
  { name: "Flow", url_address: "97332a17-7c1d-4c98-bc84-6e5708a89362" },
  { name: "Gnosis", url_address: "2c70775d-2b28-41f1-a433-09b7b014fcee" },
  { name: "NEAR", url_address: "929c5e31-1d31-4612-a4f1-eed2ae04af02" },
  { name: "Optimism", url_address: "2d27ae0a-2dcf-430d-9e6f-03e49d2357a1" },
  { name: "Osmosis", url_address: "c96898d0-677b-4ae4-820c-a45ee86f1199" },
  { name: "Polygon", url_address: "171c5bf3-a695-4b95-9fcf-ced70ba18be3" },
  { name: "Sei", url_address: "4cc1b6a1-0582-441d-8f1e-ae893e656325" },
  { name: "Solana", url_address: "936a3f9a-caa4-4609-9c14-7dbfd04e4a03" },
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
            <BarEl options={stacked_options} data={stacked_bar_data} />
          </div>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </div>
  </Style>
);
