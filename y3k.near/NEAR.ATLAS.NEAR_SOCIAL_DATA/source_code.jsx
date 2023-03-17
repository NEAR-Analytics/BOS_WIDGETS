let static_file_param = "NEAR-ATLAS-DATA-NEAR-Social.csv";
// Monthly Active Accounts Example
let rawData = fetch(
  "https://github-near-data-api.vercel.app/api/static_file_param?filename=" +
    static_file_param,
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const METRIC_NAME = "NEAR Social Monthly Active Accounts";

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

function parseUTCDate(dateString) {
  const [month, day, year] = dateString
    .split("/")
    .map((str) => parseInt(str, 10));
  // Subtract 1 from the month, as JavaScript months are zero-based
  const utcTimestamp = Date.UTC(year, month - 1, day);
  return new Date(utcTimestamp);
}

function parseCounts(countsString) {
  if (typeof countsString === "number") {
    return parseInt(countsString);
  } else if (typeof countsString === "string") {
    const dailyString = countsString.replace(",", "").replace(",", "") || "0"; // default to "0" if
    return parseInt(dailyString);
  } else {
    console.log(` ${countsString} is neither a string nor a number`);
  }
  // return countsString.split(",").map((str) => parseInt(str, 10));
}

const getBackgroundColor = colorGenerator();

let processedData = [];
let labels_of_days = [];
let dailyData = [];

try {
  rawData.body.forEach((datum) => {
    if (!datum["Daily_Date"]) {
      return;
    }

    let dailyValue = parseCounts(datum.new_accounts);

    // append to labels_of_days
    if (!labels_of_days.includes(datum["Daily_Date"])) {
      labels_of_days.push(datum["Daily_Date"]);
      dailyData.push(dailyValue);
    }
  });
} catch (err) {
  console.log(err);
}

// console.log(processedData);

// logic part-2

const data = {
  labels: labels_of_days,
  datasets: [
    {
      label: "NEAR Social Monthly Active Accounts",
      data: dailyData,
      backgroundColor: [
        "rgba(255, 26, 104, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(0, 0, 0, 0.2)",
      ],
      borderColor: [
        "rgba(255, 26, 104, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(0, 0, 0, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// config
const config = {
  type: "bar",
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

return (
  <Style>
    <div className="text-bg-light rounded-4 p-3 mb-4">
      {data !== null ? (
        <p>
          <div class="">
            <div class="">
              <div>
                <h3>{METRIC_NAME}</h3>
                <BarEl options={config} data={data} />
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
