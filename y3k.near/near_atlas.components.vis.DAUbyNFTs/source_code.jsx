let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/85ecddf4-cc9f-44a5-b8a5-72afb25cbf1e/data/latest",
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

const TXNS = {};
const dates = [];

sortedData.map((entry) => {
  const date = entry["DAY"];
  TXNS[date] = entry["TXNS"];
  dates.push(date);
});

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
      label: "TXNS",
      data: TXNS,
      backgroundColor: "rgb(13,131,171)",
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
