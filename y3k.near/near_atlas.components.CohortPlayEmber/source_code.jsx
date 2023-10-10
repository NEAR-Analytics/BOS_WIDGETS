let rawData;

try {
  rawData = fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/6a9af1f6-c788-41e4-9bf0-54022eca381a/data/latest",
    {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );
} catch (e) {
  console.error("Error fetching data:", e);
}

const data = (rawData && rawData.body) || [];

function getColorForRetentionRate(rate) {}

const newData = data.map((item) => ({
  ...item,
  include: true,
}));

console.log(newData);

return (
  <div class="container border border-info p-3 text-center min-vw-50">
    <CohortEl data={newData} minRowsShown={5} />
  </div>
);
