let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/c3a0b5c8-b41e-4568-bdcb-378a8d2bc524/data/latest",
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

const COMMITS_COUNT = {};

data.map((entry) => {
  COMMITS_COUNT[entry["DAY"]] = entry["WALLETS_CREATED"];
});

const dates = data.map((entry) => entry["DAY"]);

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
      label: "COMMITS_COUNT",
      data: COMMITS_COUNT,
      backgroundColor: "rgb(250,164,58)",
    },
  ],
};

return (
  <Style>
    <div className="text-bg-dark container">
      {data !== null ? (
        <div className="rounded-4 p-3 mb-4">
          <div className="">
            <BarEl options={stacked_options} data={stacked_bar_data} />
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
