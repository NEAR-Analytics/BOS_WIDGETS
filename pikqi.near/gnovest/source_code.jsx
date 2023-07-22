State.init({ styles: undefined, tab: 1 });

const TWStyles = state.styles;
const css = fetch(
  "https://gist.githubusercontent.com/Pikqi/658b6ee444d26dd69f0d5150797077dd/raw/d8f929729176bb30d86e2839443fddb83a87a685/tw-all-classes.css",
);

if (!css.ok) {
  return <Widget src="nui.sking.near/widget/Feedback.Spinner" />;
}

if (!state.styles) {
  State.update({
    styles: styled.div`
      font-family:
        Manrope,
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        Fira Sans,
        Droid Sans,
        Helvetica Neue,
        sans-serif;
      ${css.body}
    `,
  });
}

if (state.user === undefined) {
  State.update({ user: Ethers.send("eth_requestAccounts", [])[0] });
}
if (!state.user) return <Web3Connect />;

if (state.chainId === undefined && ethers !== undefined && state.user) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

if (state.chainId !== undefined && state.chainId != 100) {
  Ethers.send("wallet_switchEthereumChain", [
    {
      chainId: "0x64",
    },
  ]);

  return (
    <TWStyles>
      <p class="text-3xl">
        Your current network is not supported please switch to Gnosis mainnet
      </p>
    </TWStyles>
  );
}

// Helper functions

function getCurrentUnixTimestamp() {
  const currentTimeInMillis = new Date().getTime();
  const currentUnixTimestamp = Math.floor(currentTimeInMillis / 1000); // Convert to seconds
  return currentUnixTimestamp;
}
const unixTimestampToLocalDate = (unixTimestamp) => {
  // Convert the timestamp to milliseconds (since Date works with milliseconds)
  const timestampInMillis = unixTimestamp * 1000;

  // Create a new Date object using the timestamp
  const date = new Date(timestampInMillis);

  // Get the local date components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Format the date as "YYYY-MM-DD HH:mm:ss" (e.g., "2023-07-22 12:34:56")
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};

const weisToTokens = (weis) => {
  const decimals = 18;
  const tokens = weis / Math.pow(10, decimals);
  return tokens;
};
const userPortionsQuery = `
 query {
  organizationParticipants(
    where: {user: "0x7969CEF7597a620d850f8d5F648006c1539CEF2e"}
  ) {
    timestamp
    withdrawn
    amount
		portion_id
  }
}`;

const promise = fetch(
  "https://api.studio.thegraph.com/proxy/50046/gnovest-graph/version/latest",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: userPortionsQuery }),
  },
);

// Interacting with organisation contract
const MANAGER_ABI_URL =
  "https://gist.githubusercontent.com/Pikqi/31155cc8857c7ae56d087919ca83b8b0/raw/a98651a8574a161e86bf3017b27eac7a5b6843e0/gvestabi.json";
const managerAbi = fetch(MANAGER_ABI_URL);

if (!managerAbi.ok) {
  return "Loading managerAbi";
}
const managerIface = new ethers.utils.Interface(JSON.parse(managerAbi.body));
console.log(managerIface);

const handleWithdraw = () => {
  state.userPortions.data.organizationParticipants.map((port) => {
    console.log(
      parseInt(port.timestamp),
      getCurrentUnixTimestamp(),
      port.withdrawn,
    );
  });
  const portionsAvailable = state.userPortions.data.organizationParticipants
    .filter(
      (portion) =>
        portion.withdrawn === "0" &&
        parseInt(portion.timestamp) < getCurrentUnixTimestamp(),
    )
    .map((portion) => parseInt(portion.portion_id));

  console.log(portionsAvailable);
  //0x2a8ec7e12b95c8f68b53aea6c05e668d48515414
  let contract = new ethers.Contract(
    "0x07702598b9ec60a6da8ea2d3ddfd06ddb82615f6",
    managerIface,
    Ethers.provider().getSigner(),
  );
  console.log(contract);
  contract
    .withdrawTokensFromOrganization(
      "0x2A8eC7E12b95C8f68B53aeA6c05E668d48515414",
      portionsAvailable,
    )
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
};

if (promise.ok) {
  console.log(promise.body);
  State.update({ userPortions: promise.body });
}

console.log(state.userPortions);
return (
  <TWStyles>
    <div class="flex gap-3" />
    <p>{JSON.stringify(state.userPortions)}</p>
    <button onClick={() => State.update({ tab: 1 })}>TAB 1</button>
    <button onClick={() => State.update({ tab: 2 })}>TAB 2</button>
    {state.tab === 1 ? (
      <div class="flex flex-col flex-gap 3">
        {state.userPortions &&
          state.userPortions.data.organizationParticipants.map(
            (item, index) => (
              <div class="flex gap-4">
                <p>{item.portion_id}</p>
                <p>{unixTimestampToLocalDate(item.timestamp)}</p>
                <p>{weisToTokens(item.amount)}</p>
                <p>
                  {item.withdrawn === 1
                    ? "Claimed"
                    : getCurrentUnixTimestamp() > item.timestamp
                    ? "Available"
                    : "Not yet available"}
                </p>
              </div>
            ),
          )}
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    ) : (
      <h1>TAB 2</h1>
    )}
  </TWStyles>
);
