const initialState = {
  selectedMetric: "MAU",
  processedData: processedData,
  metric_period: "Monthly",
  project_name: props.project_name || "SailGP",
};

state = State.init(initialState);

function filterByProjectName(arr, project_name) {
  return arr.filter((obj) => obj.PROJECT_NAME === project_name);
}

function sortByActivityDate(arr) {
  return arr.sort(
    (a, b) => new Date(a.ACTIVITY_DATE) - new Date(b.ACTIVITY_DATE)
  );
}

const rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/e69f56e6-e84f-4b96-957c-6d7c5ea75f4a/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

function parseUTCDate(dateString) {
  const [year, month, day] = dateString
    .split("-")
    .map((str) => parseInt(str, 10));
  // Subtract 1 from the month, as JavaScript months are zero-based
  const utcTimestamp = Date.UTC(year, month - 1, day);
  return new Date(utcTimestamp);
}

let Style = styled.div`


                  .bar {
                    transition: fill 0.2s;
                  }

                  .bar:hover {
                    fill: #ffa726;
                  }

                  .bar-chart {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }

                    svg {
                      width: 80%;
                    }

                    rect {
                      shape-rendering: crispEdges;
                      fill: #61dafb;
                      stroke: #333;
                      stroke-width: 1;
                    }


                    `;

const colorGenerator = () => {
  const colors = [
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

  let index = 0;

  return () => {
    if (index >= colors.length) {
      index = 0;
    }

    return colors[index++];
  };
};

function updateProcessedData(filteredSortedData, selectedMetric) {
  const processedData = [];

  filteredSortedData.forEach((datum) => {
    if (!datum.ACTIVITY_DATE) {
      return;
    }

    const activity_date = parseUTCDate(datum.ACTIVITY_DATE);

    const month =
      months[
        parseInt(activity_date.toISOString().slice(0, 10).split("-")[1]) - 1
      ];

    let monthData = processedData.find((data) => data.label === month);

    if (!monthData) {
      monthData = {
        label: month,
        data: {},
        backgroundColor: getBackgroundColor(),
      };
      processedData.push(monthData);
    }

    monthData.data[activity_date.toISOString().slice(0, 10)] =
      datum[selectedMetric];
  });

  return processedData;
}

const finalData = rawData.body;

if (!finalData) {
  return <h1> 🪄 Loading MAGIC 🪄</h1>;
}

const project_name = props.project_name || "SailGP";

const METRIC_NAME = `"${project_name}'s ${state.metric_period}"`;

const filteredData = filterByProjectName(finalData, state.project_name) || [];

const filteredSortedData = sortByActivityDate(filteredData) || [];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// logic start

const getBackgroundColor = colorGenerator();

let processedData = [];

try {
  filteredSortedData.forEach((datum) => {
    if (!datum.ACTIVITY_DATE) {
      return;
    }

    const activity_date = parseUTCDate(datum.ACTIVITY_DATE);

    const month =
      months[
        parseInt(activity_date.toISOString().slice(0, 10).split("-")[1]) - 1
      ];

    let monthData = processedData.find((data) => data.label === month);

    if (!monthData) {
      monthData = {
        label: month,
        data: {},
        backgroundColor: getBackgroundColor(),
      };
      processedData.push(monthData);
    }

    monthData.data[activity_date.toISOString().slice(0, 10)] = datum.MAU;
  });
} catch (err) {
  console.log(err);
}

// logic end

const v_bar_labels = months;

const v_bar_data = {
  v_bar_labels,
  datasets: processedData,
};

const v_bar_options = {
  responsive: true,
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
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "",
    },
  },
};

// ...Other code...

// logic part-3

const header_map = {
  DAU: "Daily Active Accounts",
  MAU: "Monthly Active Accounts",
  ACCTS_CREATED: "Accounts Created",
  NFT_MINTS: "NFT Mints",
  U_MINTERS: "Unique Minters",
};

// 1. Create a function to extract unique project names:
function getUniqueProjectNames(data) {
  const projectNamesSet = new Set();
  data.forEach((item) => {
    if (item.PROJECT_NAME) {
      projectNamesSet.add(item.PROJECT_NAME);
    }
  });
  return [...projectNamesSet];
}

// 2. Get the unique project names from `finalData`:
const uniqueProjectNames = getUniqueProjectNames(finalData);

// 3. Create a handler for the project name dropdown change:
const handleProjectDropdownChange = (e) => {
  // console.log("selectedProject:", e.target.value);
  State.update({
    project_name: e.target.value,
  });
};

const handleDropdownChange = (e) => {
  // console.log("selectedMetric:", e.target.value);
  State.update({
    selectedMetric: e.target.value,
  });
};

const getBarData = () => {
  const { selectedMetric } = state;
  console.log(selectedMetric);
  State.update({ processedData: [] });

  let newProcessedData = updateProcessedData(
    filteredSortedData,
    selectedMetric
  );

  State.update({
    processedData: newProcessedData,
    metric_period: header_map[selectedMetric],
  });

  console.log(newProcessedData);
  console.log("processedData WAA");

  return {
    v_bar_labels,
    datasets: newProcessedData,
  };
};

return (
  <Style>
    <div className="bg-dark container rounded-4 p-3 mb-4">
      {data !== null ? (
        <p>
          <div class="">
            <div class="">
              <div>
                <h2 className="text-white">Metric: {METRIC_NAME}</h2>

                <label
                  htmlFor="metric-dropdown"
                  className="text-white block text-sm font-medium"
                >
                  Select metric:{" "}
                </label>
                <select
                  id="metric-dropdown"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm rounded-md"
                  value={selectedMetric}
                  onChange={handleDropdownChange}
                >
                  <option value="MAU">MAU</option>
                  <option value="DAU">DAU</option>
                  <option value="ACCTS_CREATED">Accounts Created</option>
                  <option value="NFT_MINTS">NFT Mints</option>
                  <option value="U_MINTERS">Unique Minters</option>
                </select>

                <select
                  id="project-dropdown"
                  value={project_name}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm rounded-md"
                  onChange={handleProjectDropdownChange}
                >
                  {uniqueProjectNames.map((name) => (
                    <option
                      key={name}
                      value={name}
                      selected={name === state.project_name}
                    >
                      {name}
                    </option>
                  ))}
                </select>

                <BarEl options={v_bar_options} data={getBarData()} />
              </div>
            </div>
          </div>

          <div></div>
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
