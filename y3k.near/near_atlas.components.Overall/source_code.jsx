let rawData;

try {
  rawData = fetch(
    "https://api.flipsidecrypto.com/api/v2/queries/f48c6f9f-3d8f-44da-943b-de825e5f8525/data/latest",
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
