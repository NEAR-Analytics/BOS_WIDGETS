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
  resultObject[item.name] = raw_data.body || [];
});

console.log(resultObject);

// Reusable Card Component
const Card = ({ title, value }) => (
  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
    <div className="bg-white p-5">
      <div className="sm:flex sm:items-start">
        <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
          <h3 className="text-sm leading-6 font-medium text-gray-400">
            {title}
          </h3>
          <p className="text-3xl font-bold text-black">{value}</p>
        </div>
      </div>
    </div>
  </div>
);
return (
  <div className="container mx-auto p-4 bg-gray-900 rounded-lg">
    <div className="flex space-x-4">
      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-1/2">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Total Supply
          </h3>
          <span className="text-4xl font-bold text-gray-200">
            {resultObject["Total Supply"][0]["Total Supply"].toLocaleString(
              "en-US"
            )}
          </span>
        </div>
      </div>

      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-1/2">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Circulating Supply
          </h3>
          <span className="text-4xl font-bold text-gray-200">
            {resultObject["Circulating Supply"][0][
              "Circulating Supply"
            ].toLocaleString("en-US")}
          </span>
        </div>
      </div>

      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-1/2">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Total Stakes
          </h3>
          <span className="text-4xl font-bold text-gray-200">
            {resultObject["Total Staked"][0]["Total Staked"].toLocaleString(
              "en-US"
            )}
          </span>
        </div>
      </div>

      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-1/2">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Active Validators
          </h3>
          <span className="text-4xl font-bold text-gray-200">
            {resultObject["Active Validators"][0][
              "Active Validators"
            ].toLocaleString("en-US")}
          </span>
        </div>
      </div>

      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-1/2">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Nakamoto Coefficient
          </h3>
          <span className="text-4xl font-bold text-gray-200">
            {resultObject["Nakamoto Coefficient"][0][
              "Nakamoto Coefficient"
            ].toLocaleString("en-US")}
          </span>
        </div>
      </div>
    </div>
  </div>
);
