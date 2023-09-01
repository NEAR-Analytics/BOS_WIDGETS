// Monthly Active Accounts Example
// Monthly Active Accounts Example
let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/91b91aba-f307-48c9-9731-c3d475838f1f/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const data = raw_data.body || [];

let Style = styled.div`
                `;

// logic start

const sortedData = data.sort((a, b) => {
  return new Date(a["DAY"]) - new Date(b["DAY"]);
});

const WALLETS_CREATED = {};
const TOTAL_WALLETS = {};

data.map((entry) => {
  WALLETS_CREATED[entry["DAY"]] = entry["WALLETS_CREATED"];
  TOTAL_WALLETS[entry["DAY"]] = entry["TOTAL_WALLETS"];
});

// console.log(data);
// console.log(TOTAL_WALLETS);

const dates = data.map((entry) => entry["DAY"]);

// console.log(processedData);

// logic part-2

const stacked_options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
    title: {
      display: true,
      text: "",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      borderColor: "rgb(240,255,240)",
      color: "rgb(41,51,64)", // This will change the gridline color
      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      color: "rgb(41,51,64)", // This will change the gridline color
      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const stacked_bar_data = {
  dates,
  datasets: [
    {
      label: "WALLETS_CREATED",
      data: WALLETS_CREATED,
      backgroundColor: "rgb(250,164,58)",
      yAxisID: "y",
    },
    {
      label: "TOTAL_WALLETS",
      data: TOTAL_WALLETS,
      backgroundColor: "rgb(13,131,171)",
      yAxisID: "y1",
    },
  ],
};

return (
  <Style>
    <div className="text-bg-dark rounded-4 p-3 mb-4">
      {data !== null ? (
        <div>
          <BarEl options={stacked_options} data={stacked_bar_data} />
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
