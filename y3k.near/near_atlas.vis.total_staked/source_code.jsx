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

const data = rawData.body || [];

let Style = styled.div`
                `;

//console.log(rawData);
// data available

const total_staked = {};

const sortedData = data.sort(
  (a, b) => new Date(a["Date"]) - new Date(b["Date"])
);

sortedData.map((entry) => {
  total_staked[entry["Date"]] = entry["Staked Supply"];
});

const dates = data.map((entry) => entry["Date"]);

const area_chart_data = {
  dates,
  datasets: [
    {
      type: "line",
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
    <div className="text-bg-dark rounded-4 p-3 mb-4">
      {data !== null ? (
        <p>
          <LineEl data={area_chart_data} options={stacked_options} />
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
