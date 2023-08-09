const code = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<canvas id="myChart" style="position: relative; height:80vh; width:80vw"></canvas>

<script>

async function fetchData() {
  let response = await fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/c493c7b1-cfcc-4aee-ad79-869b4ed8ca90/data/latest",
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
  return new Date(a["DAY"]) - new Date(b["DAY"]);
});

const NEW_MAAS = {};
const RETURNING_MAAS = {};

data.map((entry) => {
  NEW_MAAS[entry["DAY"]] = entry["NEW_MAAS"];
  RETURNING_MAAS[entry["DAY"]] = entry["RETURNING_MAAS"];
});

// console.log(data);
// console.log(RETURNING_MAAS);

const dates = data.map((entry) => entry["DAY"]);

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: dates,
          datasets: [
   {
      label: "New MAAs",
      data: NEW_MAAS,
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Returning MAAs",
      data: RETURNING_MAAS,
      backgroundColor: "rgb(255, 99, 132)",
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
