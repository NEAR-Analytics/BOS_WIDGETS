// Monthly Active Accounts Example
// Monthly Active Accounts Example
let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/f22d1d23-8993-45ea-9cbb-d27eba5b106d/data/latest",
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

const POSTS_COUNT = {};
const LIKES_COUNT = {};
const REPLIES_COUNT = {};

data.map((entry) => {
  POSTS_COUNT[entry["DATE"]] = entry["POSTS_COUNT"];
  LIKES_COUNT[entry["DATE"]] = entry["LIKES_COUNT"];
  REPLIES_COUNT[entry["DATE"]] = entry["REPLIES_COUNT"];
});

const dates = data.map((entry) => entry["DATE"]);

const stacked_options = {
  maintainAspectRatio: true,
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
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      grid: {
        color: "rgb(41,51,64)", // This will change the gridline color
      },
      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",

      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
      grid: {
        drawOnChartArea: false,
        color: "rgb(41,51,64)", // This will change the gridline color
      },
    },
    y2: {
      type: "linear",
      display: false,
      position: "right",

      ticks: {
        color: "rgb(240,255,240)", // This will change the axis text label color
      },
      grid: {
        drawOnChartArea: false,
        color: "rgb(41,51,64)", // This will change the gridline color
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

const stacked_bar_data = {
  dates,
  datasets: [
    {
      label: "Replies",
      type: "bar",
      data: REPLIES_COUNT,
      backgroundColor: "rgb(0,255,159)",
      yAxisID: "y2",
    },
    {
      label: "Posts",
      type: "line",
      data: POSTS_COUNT,
      backgroundColor: "rgb(250,164,58)",
      yAxisID: "y1",
    },
    {
      label: "Likes",
      type: "bar",
      data: LIKES_COUNT,
      backgroundColor: "rgb(13,131,171)",
      yAxisID: "y",
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
