let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/00b451f2-418b-4db4-a5b5-f550c31a4dda/data/latest",
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
const dates = [];

sortedData.map((entry) => {
  const date = entry["DATE"];
  N_USERS[date] = entry["N_USERS"];
  TXS[date] = entry["TXS"];
  dates.push(date);
});

// const sortedEntries_N_USERS = Object.entries(N_USERS).sort((a, b) => {
//   return new Date(a[0]) - new Date(b[0]);
// });
// const sortedN_USERS = Object.fromEntries(sortedEntries_N_USERS);

// const sortedEntries_TXS = Object.entries(TXS).sort((a, b) => {
//   return new Date(a[0]) - new Date(b[0]);
// });
// const sortedTXS = Object.fromEntries(sortedEntries_TXS);
// N_USERS = N_USERS.sort((a, b) => {
//   return new Date(a["DATE"]) - new Date(b["DATE"]);
// });

// TXS = TXS.sort((a, b) => {
//   return new Date(a["DATE"]) - new Date(b["DATE"]);
// });

// const dates = sortedData.map((entry) => entry["DATE"]);

// console.log(N_USERS);

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
      label: "N# USERS",
      data: N_USERS,
      backgroundColor: "rgb(250,164,58)",
    },
    {
      label: "TXS",
      data: TXS,
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
