const initialState = {
  MAA: 00,
  WALLETS_CREATED: 00,
};

state = State.init(initialState);

let MAA_rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/d299d361-d1bd-4927-a81f-f43e00871480/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const MAA_RAW = JSON.parse(MAA_rawData.body) || [];

State.update({
  MAA: MAA_rawData,
});

let WALLETS_CREATED_rawData = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/b99c7fd1-0558-4bb6-8d90-cd6798e79ad1/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

const WALLETS_CREATED_RAW = WALLETS_CREATED_rawData.body || [];

State.update({
  WALLETS_CREATED: WALLETS_CREATED_RAW,
});

const MAA = state.MAA.body[0].MAA || [];
const WALLETS_CREATED = state.WALLETS_CREATED[0].TOTAL_WALLETS || [];

function formatNumber(num) {
  return (
    <span>{num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</span>
  );
}

const BlueText = styled.div`
  color: rgb(13,131,171);
`;

const OrangeText = styled.h2`
  color: rgb(250,164,58);
`;

return (
  <div class="container mx-auto p-4 bg-gray-900 rounded-lg">
    <div class="flex space-x-4">
      <div class="bg-gray shadow-xl rounded-lg p-6 w-1/2 bg-gray-800">
        <div class="flex flex-col items-center">
          <h2 class="text-2xl font-semibold mb-4 text-white">
            Monthly Active Accounts
          </h2>
          <span class="text-4xl font-bold text-gray-200">
            {formatNumber(MAA)}
          </span>
        </div>
      </div>
      <div class="bg-gray shadow-xl rounded-lg p-6 w-1/2 bg-gray-800">
        <div class="flex flex-col items-center">
          <h2 class="text-2xl font-semibold mb-4 text-white">
            Wallets Created
          </h2>

          <span class="text-4xl font-bold text-gray-200">
            {formatNumber(WALLETS_CREATED)}
          </span>
        </div>
      </div>
    </div>
  </div>
);
