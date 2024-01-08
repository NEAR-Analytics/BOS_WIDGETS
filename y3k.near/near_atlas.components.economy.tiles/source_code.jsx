let query_url_obj = [
  {
    name: "Total Supply",
    url_address:
      "https://api.flipsidecrypto.com/api/v2/queries/96519cb2-cf4f-4065-bd56-5f45a4401eb1/data/latest",
  },
  {
    name: "Circulating Supply",
    url_address:
      "https://api.flipsidecrypto.com/api/v2/queries/96519cb2-cf4f-4065-bd56-5f45a4401eb1/data/latest",
  },
  {
    name: "Total Staked",
    url_address:
      "https://api.flipsidecrypto.com/api/v2/queries/a8fa2109-aed5-4d60-ae6e-cccda56852b5/data/latest",
  },
  {
    name: "Active Validators",
    url_address:
      "https://api.flipsidecrypto.com/api/v2/queries/a8fa2109-aed5-4d60-ae6e-cccda56852b5/data/latest",
  },
  {
    name: "Nakamoto Coefficient",
    url_address:
      "https://api.flipsidecrypto.com/api/v2/queries/dc95bb65-7ff4-4849-90b7-45b17cf3c165/data/latest",
  },
];

let resultObject = {};

// fetch data from url
query_url_obj.forEach((item) => {
  let raw_data = fetch(item.url_address, {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });
  // Note: without using async/await or .then(), you won't get the body directly
  // so you may need additional handling here.
  if (item.name == "Nakamoto Coefficient") {
    resultObject[item.name] = raw_data.body || [];
  } else {
    resultObject[item.name] = raw_data.body || [];
  }
});

console.log(resultObject["Nakamoto Coefficient"][0]["Nakamoto Coefficient"]);

return (
  <div className="container mx-auto p-4 bg-gray-900 rounded-lg">
    <div className="flex space-x-4">
      <Widget
        src="y3k.near/widget/near_atlas.components.tailwind.cardTile"
        props={{
          Title: "Total Supply",
          Stats: resultObject["Total Supply"][0]["Total Supply"],
        }}
      />
      <Widget
        src="y3k.near/widget/near_atlas.components.tailwind.cardTile"
        props={{
          Title: "Circulating Supply",
          Stats: resultObject["Circulating Supply"][0]["Circulating Supply"],
        }}
      />

      <Widget
        src="y3k.near/widget/near_atlas.components.tailwind.cardTile"
        props={{
          Title: "Total Staked",
          Stats: resultObject["Total Staked"][0]["Total Staked"],
        }}
      />

      <Widget
        src="y3k.near/widget/near_atlas.components.tailwind.cardTile"
        props={{
          Title: "Active Validators",
          Stats: resultObject["Active Validators"][0]["Active Validators"],
        }}
      />
      <Widget
        src="y3k.near/widget/near_atlas.components.tailwind.cardTile"
        props={{
          Title: "Nakamoto Coefficient",
          Stats:
            resultObject["Nakamoto Coefficient"][0]["Nakamoto Coefficient"],
        }}
      />
    </div>
  </div>
);
