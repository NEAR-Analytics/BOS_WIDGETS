// cloned from abhishekanirudhan.near/widget/NEAR.ATLAS.TOTAL_SUPPLY

let static_file_param = "near_supply_staking.csv";
// Monthly Active Accounts Example
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

const data = rawData.body || [];

let Style = styled.div`
                `;

//console.log(rawData);
// data available

const total_supply = {};
const circ_supply = {};

data.map((entry) => {
  total_supply[entry["activity_date"]] = entry["total_supply"];
  circ_supply[entry["activity_date"]] =
    entry["total_supply"] - entry["total_locked"];
});

console.log(data);

const dates = data.map((entry) => entry["activity_date"]);

const area_chart_data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Circulating Supply",
      data: circ_supply,
      backgroundColor: "rgb(250,164,58)",
    },
    {
      fill: true,
      label: "Total Supply",
      data: total_supply,
      backgroundColor: "rgb(13,131,171)",
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
