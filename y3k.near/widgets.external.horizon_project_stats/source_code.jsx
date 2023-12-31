const header_map = {
  DAA: "Daily Active Accounts",
  MAA: "Monthly Active Accounts",
  MVT: "Monthly Average Transactions",
  DVT: "Daily Average Transactions",
};

const stateJSON = JSON.stringify({
  selectedMetric: header_map[props.selectedMetric] || header_map["MAA"],
  project_name: props.project_name || "near",
});

const generateIframeCode = (stateJSON) => `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


<canvas id="myChart" style="position: relative; height:80vh; width:80vw"></canvas>

<script>





const initialState = JSON.parse('${stateJSON}');
console.log(initialState)



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

const getBackgroundColor = colorGenerator();


function filterByProjectName(arr, project_name) {
  return arr.filter((obj) => obj.PROJECT_NAME === project_name);
}

function sortByActivityDate(arr) {
  return arr.sort(
    (a, b) => new Date(a.ACTIVITY_DATE) - new Date(b.ACTIVITY_DATE)
  );
}



function parseUTCDate(dateString) {
  const [year, month, day] = dateString
    .split("-")
    .map((str) => parseInt(str, 10));
  // Subtract 1 from the month, as JavaScript months are zero-based
  const utcTimestamp = Date.UTC(year, month - 1, day);
  return new Date(utcTimestamp);
}
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


function updateProcessedData(filteredSortedData, selectedMetric) {
  const processedData = [];

  filteredSortedData.forEach((datum) => {
    if (!datum.ACTIVITY_DATE) {
      return;
    }

    const activity_date = parseUTCDate(datum.ACTIVITY_DATE);
    const isoDate = activity_date.toISOString().slice(0, 10);
    const month =
      months[
        parseInt(isoDate.split("-")[1]) - 1
      ];

    let monthData;

    // Check if the selectedMetric is DAA or DVT, and include dates accordingly
    if (selectedMetric === "DAA" || selectedMetric === "DVT") {
      monthData = processedData.find((data) => data.label === isoDate); // Using the ISO date as the label
      if (!monthData) {
        monthData = {
          label: isoDate, // Using the ISO date as the label
          data: {},
          backgroundColor: getBackgroundColor(),
        };
        processedData.push(monthData);
      }
    } else {
      monthData = processedData.find((data) => data.label === month);
      if (!monthData) {
        monthData = {
          label: month,
          data: {},
          backgroundColor: getBackgroundColor(),
        };
        processedData.push(monthData);
      }
    }

    monthData.data[isoDate] = datum[selectedMetric];
  });

  return processedData;
}




async function fetchData() {

  let response = await fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/367eedd4-b79d-4cf8-929a-178bbcb0a4e4/data/latest",
    {
        subscribe: true,
        method: "GET",
        headers: {
        Accept: "*/*",
        },
    }
    );
  
let data = await response.json();

const filteredData = filterByProjectName(data, initialState.project_name) || [];
const filteredSortedData = sortByActivityDate(filteredData) || [];




let newProcessedData = updateProcessedData(
  filteredSortedData,
  initialState.selectedMetric
);

console.log(initialState.selectedMetric)

newProcessedData = sortByActivityDate(newProcessedData) || [];
console.log("newProcessedData")
console.log(newProcessedData)

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: months,
          datasets: newProcessedData
      },
      options: {
  scales: {
      y: {
        stacked: true,
        grid: {
        color: "rgb(41,51,64)", // This will change the gridline color
        borderColor: "rgb(240,255,240)",
        },
        ticks: {
          color: "rgb(0,0,0)", // This will change the axis text label color
        },
      },
      x: {
        stacked: true,
        grid: {
        color: "rgb(41,51,64)", // This will change the gridline color
        },
        ticks: {
          color: "rgb(0,0,0)", // This will change the axis text label color
        },
      },
    },
      }
  });
}

fetchData();

</script>

`;

return (
  <div>
    <iframe
      iframeResizer
      className="w-100"
      style={{ height: "300px" }}
      srcDoc={generateIframeCode(stateJSON)} // Use the function to generate the code
    />
  </div>
);
