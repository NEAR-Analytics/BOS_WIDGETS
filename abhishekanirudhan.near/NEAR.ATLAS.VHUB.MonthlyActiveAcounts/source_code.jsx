// let static_file_param = "NEAR-ATLAS-DATA-MAAs.csv";
// Monthly Active Accounts Example
// Monthly Active Accounts Example
let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/131d44c5-44b2-474a-b3c4-fd2e8c85bd28/data/latest",
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

const NEW_MAAS = {};
const RETURNING_MAAS = {};

data.map((entry) => {
  NEW_MAAS[entry["DAY"]] = entry["NEW_MAAS"];
  RETURNING_MAAS[entry["DAY"]] = entry["RETURNING_MAAS"];
});

// console.log(data);
// console.log(RETURNING_MAAS);

const dates = data.map((entry) => entry["DAY"]);

// console.log(processedData);

// logic part-2

const stacked_options = {
  scales: {
    y: {
      stacked: true,
      grid: {
        color: "rgba(255, 0, 0, 0.2)", // This will change the gridline color
        borderColor: "rgb(240,255,240)",
      },
      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
    },
    x: {
      stacked: true,
      grid: {
        color: "rgba(255, 0, 0, 0.2)", // This will change the gridline color
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
      label: "New MAAs",
      data: NEW_MAAS,
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Returning MAAs",
      data: RETURNING_MAAS,
      backgroundColor: "rgb(255, 99, 132)",
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
