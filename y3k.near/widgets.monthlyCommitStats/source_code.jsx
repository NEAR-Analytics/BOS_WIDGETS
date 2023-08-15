let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/557a8f29-833f-45ae-bcae-89f251698b8f/data/latest",
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
  return new Date(a["YEAR_MONTH"]) - new Date(b["YEAR_MONTH"]);
});

const COMMITS_COUNT = {};

data.map((entry) => {
  COMMITS_COUNT[entry["YEAR_MONTH"]] = entry["COMMITS_COUNT"];
});

const dates = data.map((entry) => entry["YEAR_MONTH"]);

// console.log(processedData);

// logic part-2

const stacked_options = {
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
