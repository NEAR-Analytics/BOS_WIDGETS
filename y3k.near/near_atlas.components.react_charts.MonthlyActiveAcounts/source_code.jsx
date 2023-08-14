let raw_data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/c493c7b1-cfcc-4aee-ad79-869b4ed8ca90/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const r_data = raw_data.body || [];

const sortedData = r_data.sort((a, b) => {
  return new Date(a["DAY"]) - new Date(b["DAY"]);
});

const series1 = {
  label: "RETURNING MAAS",
  data: sortedData.map((item) => {
    return {
      primary: item.DAY,
      secondary: Number(item.RETURNING_MAAS),
    };
  }),
};

const series2 = {
  label: "NEW MAAS",
  data: sortedData.map((item) => {
    return {
      primary: item.DAY,
      secondary: Number(item.NEW_MAAS),
    };
  }),
};

// const series1 = {
//   label: "RETURNING_MAAS",
//   data: sortedData.map((item) => {
//     const date = new Date(item.DAY);
//     const month = date.toLocaleString("default", { month: "long" });
//     const year = date.getFullYear();
//     return {
//       primary: `${month} ${year}`,
//       secondary: item.RETURNING_MAAS,
//     };
//   }),
// };

// const series2 = {
//   label: "NEW_MAAS",
//   data: sortedData.map((item) => {
//     const date = new Date(item.DAY);
//     const month = date.toLocaleString("default", { month: "long" });
//     const year = date.getFullYear();
//     return {
//       primary: `${month} ${year}`,
//       secondary: item.NEW_MAAS,
//     };
//   }),
// };

// const primaryAxis = {
//   type: "ordinal",
//   tickFormat: function (d) {
//     const date = new Date(d);
//     return date.toLocaleString("default", { month: "short" });
//   },
// };

// const secondaryAxes = [
//   {
//     type: "linear",
//     position: "left",
//     format: (d) => `${d}`, // You can customize the format if needed
//   },
// ];

// const secondaryAxes = [
//   {
//     getValue: function (datum) {
//       return datum.secondary;
//     },
//   },
// ];

// const primaryAxis = {
//   getValue: function (datum) {
//     return datum.primary;
//   },
// };

// const primaryAxis = {
//   //   position: "left",
//   type: "linear",
//   // show: false,
//   stacked: true,
//   getValue: (datum) => datum.primary,
// };

function getWeekLabel(d) {
  // Convert the date string to a date object
  const date = new Date(d);

  // Calculate the week number
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((date - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7
  );

  // Create the week label
  const weekLabel = `Week ${weekNumber}`;

  return weekLabel;
}

const primaryAxis = {
  type: "time",
  tickFormat: getWeekLabel,
  stacked: true,
  getValue: (datum) => datum.primary,
};

const secondaryAxes = [
  {
    // position: "top",
    // show: false,
    getValue: (datum) => datum.secondary,
    stacked: true,
    type: "linear",
    // stackOffset: stackOffsetWiggle,
  },
];

const output = [series2, series1];

return (
  <div>
    <ReactChart
      chart_name="BarCustom"
      data={output}
      className={"mx-auto px-4"}
      options={{
        secondaryAxes: secondaryAxes,
        primaryAxis: primaryAxis,
        HeaderTitle: "Overview",
      }}
    />
  </div>
);
