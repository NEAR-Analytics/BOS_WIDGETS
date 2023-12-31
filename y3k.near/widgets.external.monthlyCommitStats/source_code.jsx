const code = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<canvas id="myChart" style="position: relative; height:80vh; width:80vw"></canvas>

<script>

async function fetchData() {
  let response = await fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/557a8f29-833f-45ae-bcae-89f251698b8f/data/latest",
    {
      subscribe: true,
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );
  
  let data = await response.json();
  
const sortedData = data.sort((a, b) => {
  return new Date(a["YEAR_MONTH"]) - new Date(b["YEAR_MONTH"]);
});

const COMMITS_COUNT = {};

data.map((entry) => {
  COMMITS_COUNT[entry["YEAR_MONTH"]] = entry["COMMITS_COUNT"];
});

const dates = data.map((entry) => entry["YEAR_MONTH"]);
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: dates,
          datasets: [
   {
       label: "COMMITS_COUNT",
      data: COMMITS_COUNT,
        backgroundColor: "rgb(75, 192, 192)",
      },
          ]
      },
      options: {
  scales: {
      y: {
        stacked: true,
        grid: {
          color: "rgba(255, 0, 0, 0.2)", // This will change the gridline color
          borderColor: "rgb(240,255,240)",
        },
        ticks: {
          color: "rgb(0,0,0)", // This will change the axis text label color
        },
      },
      x: {
        stacked: true,
        grid: {
          color: "rgba(255, 0, 0, 0.2)", // This will change the gridline color
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
    <iframe className="w-100" style={{ height: "300px" }} srcDoc={code} />
  </div>
);
