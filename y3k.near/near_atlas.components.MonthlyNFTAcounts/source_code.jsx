// Monthly Active Accounts Example
// Monthly Active Accounts Example
let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/6728e603-7140-48b7-b735-20c0cf6e54ee/data/latest",
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
  return new Date(a["DATE"]) - new Date(b["DATE"]);
});

const N_USERS = {};
const TXS = {};

data.map((entry) => {
  N_USERS[entry["DATE"]] = entry["TXS"];
  TXS[entry["DATE"]] = entry["N_USERS"];
});

// console.log(data);
// console.log(TXS);

const dates = data.map((entry) => entry["DATE"]);

// console.log(processedData);

// logic part-2

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

const stacked_bar_data = {
  dates,
  datasets: [
    {
      label: "N# USERS",
      data: N_USERS,
      backgroundColor: "rgb(250,164,58)",
    },
    {
      label: "Transactions",
      data: TXS,
      backgroundColor: "rgb(13,131,171)",
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
