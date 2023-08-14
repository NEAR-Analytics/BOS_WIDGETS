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
  label: "RETURNING_MAAS",
  data: sortedData.map((item) => {
    return {
      primary: item.DAY,
      secondary: item.RETURNING_MAAS,
    };
  }),
};

const series2 = {
  label: "NEW_MAAS",
  data: sortedData.map((item) => {
    return {
      primary: item.DAY,
      secondary: item.NEW_MAAS,
    };
  }),
};
const output = [series2, series1];

return (
  <div>
    <ReactChart chart_name="BarCustom" options={[]} data={output} />
  </div>
);
