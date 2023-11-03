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
  <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
    <div className="sm:flex sm:space-x-4">
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
        <div className="bg-white p-5">
          <div className="sm:flex sm:items-start">
            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
              <h3 className="text-sm leading-6 font-medium text-gray-400">
                Total Supply
              </h3>
              <p className="text-3xl font-bold text-black">
                {" "}
                {resultObject["Total Supply"][0]["Total Supply"].toLocaleString(
                  "en-US"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
        <div className="bg-white p-5">
          <div className="sm:flex sm:items-start">
            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
              <h3 className="text-sm leading-6 font-medium text-gray-400">
                Circulating Supply
              </h3>
              <p className="text-3xl font-bold text-black">
                {resultObject["Circulating Supply"][0][
                  "Circulating Supply"
                ].toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
        <div className="bg-white p-5">
          <div className="sm:flex sm:items-start">
            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
              <h3 className="text-sm leading-6 font-medium text-gray-400">
                Total Stakes
              </h3>
              <p className="text-3xl font-bold text-black">
                {resultObject["Total Staked"][0]["Total Staked"].toLocaleString(
                  "en-US"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
        <div className="bg-white p-5">
          <div className="sm:flex sm:items-start">
            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
              <h3 className="text-sm leading-6 font-medium text-gray-400">
                Active Validators
              </h3>
              <p className="text-3xl font-bold text-black">
                {resultObject["Active Validators"][0][
                  "Active Validators"
                ].toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
        <div className="bg-white p-5">
          <div className="sm:flex sm:items-start">
            <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
              <h3 className="text-sm leading-6 font-medium text-gray-400">
                Nakamoto Coefficient
              </h3>
              <p className="text-3xl font-bold text-black">
                {resultObject["Nakamoto Coefficient"][0][
                  "Nakamoto Coefficient"
                ].toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
