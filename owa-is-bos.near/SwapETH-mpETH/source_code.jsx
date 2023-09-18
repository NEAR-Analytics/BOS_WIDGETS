const routerContract = "0x09bD2A33c47746fF03b86BCe4E885D03C74a8E8C";
const EthToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const MPEthToken = "0x60B42e0DE164d18fE6822C115DAf2e0F18867aE7";

const routerAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ArbitrumSushiSwapRouter.txt"
);
if (!routerAbi.ok) {
  return "Loading";
}

const getNetwork = () => {
  let chainId = 42161;
  Ethers.provider()
    .getNetwork()
    .then((res) => {
      if (res.chainId == chainId) {
        State.update({ isZkSync: true });
      } else {
        switchNetwork(42161);
      }
    });
};

const switchNetwork = (chainId) => {
  Ethers.provider().send("wallet_switchEthereumChain", [
    { chainId: `0x${chainId.toString(16)}` },
  ]);
};

const swap = () => {
  let route =
    "0x0301ffff020109bd2a33c47746ff03b86bce4e885d03c74a8e8c82af49447d8a07e3bd95bd0d56f35241523fbab10182af49447d8a07e3bd95bd0d56f35241523fbab101ffff019c657a4140ed352f86dc6d3a8825991431db2201" +
    state.sender.substring(0, 1) +
    "0" +
    state.sender.substring(2);

  const router = new ethers.Contract(
    routerContract,
    routerAbi.body,
    Ethers.provider().getSigner()
  );

  let amountIn = ethers.utils.parseUnits(state.strEther, 18);

  const overrides = {
    value: amountIn,
    gasLimit: 2303039,
  };

  try {
    router
      .processRoute(
        EthToken,
        amountIn,
        MPEthToken,
        0,
        state.sender,
        route,
        overrides
      )
      .then((res) => {});
  } catch (err) {
    console.log(err);
  }
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    getNetwork();
  }
}

if (state.balance === undefined && state.sender) {
  State.update({ tokenTo: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" });
  State.update({ tokenSelected: 0 });
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(5) });
    });
}

// FETCH CSS
const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://nativonft.mypinata.cloud/ipfs/QmY1vEGq8a9e3n25g9A57eLd7bMWdVKipYHJYRpx1R5yij"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

// OUTPUT UI
const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

return (
  <Theme>
    <div class="LidoContainer">
      <div class="Header">Swap $ETH &lt;&gt; $mpETH</div>
      <div class="SubHeader" style={{ color: "black" }}>
        Stake mpETH - Available on Arbitrum One
      </div>
      <div
        class="LidoForm"
        style={{ background: "rgb(206, 255, 26)", color: "black" }}
      >
        {state.sender && (
          <>
            <div class="LidoFormTopContainer">
              <div class="LidoFormTopContainerLeft">
                <div class="LidoFormTopContainerLeftContent1">
                  <div class="LidoFormTopContainerLeftContent1Container">
                    <span>Available to swap</span>
                    <div class="LidoFormTopContainerLeftContent1Circle" />
                  </div>
                </div>
                <div class="LidoFormTopContainerLeftContent2">
                  <span>
                    {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;ETH
                  </span>
                </div>
              </div>
              <div class="LidoFormTopContainerRight">
                <div class="LidoFormTopContainerRightContent1">
                  <div class="LidoFormTopContainerRightContent1Text">
                    <span style={{ color: "black" }}>
                      <b>Account:</b> {getSender()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="LidoSplitter" />
          </>
        )}
      </div>
      <div class="LidoStakeForm">
        <div class="mb-2 LidoStakeFormInputContainer">
          <select
            name="select"
            id="token"
            class="selectCSS"
            onChange={handleSelect}
          >
            <option>ETH</option>
          </select>
        </div>

        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                opacity="0.6"
                d="M11.999 3.75v6.098l5.248 2.303-5.248-8.401z"
              ></path>
              <path d="M11.999 3.75L6.75 12.151l5.249-2.303V3.75z"></path>
              <path
                opacity="0.6"
                d="M11.999 16.103v4.143l5.251-7.135L12 16.103z"
              ></path>
              <path d="M11.999 20.246v-4.144L6.75 13.111l5.249 7.135z"></path>
              <path
                opacity="0.2"
                d="M11.999 15.144l5.248-2.993-5.248-2.301v5.294z"
              ></path>
              <path
                opacity="0.6"
                d="M6.75 12.151l5.249 2.993V9.85l-5.249 2.3z"
              ></path>
            </svg>
          </span>
          <span class="LidoStakeFormInputContainerSpan2">
            <input
              disabled={!state.sender}
              class="LidoStakeFormInputContainerSpan2Input"
              value={state.strEther}
              onChange={(e) => State.update({ strEther: e.target.value })}
              placeholder="Amount"
            />
          </span>
          <span
            class="LidoStakeFormInputContainerSpan3"
            onClick={() => {
              State.update({
                strEther: parseFloat(state.balance).toFixed(6).toString(),
              });
            }}
          >
            <button
              class="LidoStakeFormInputContainerSpan3Content"
              disabled={!state.sender}
            >
              <span class="LidoStakeFormInputContainerSpan3Max">MAX</span>
            </button>
          </span>
        </div>
        {!!state.sender ? (
          <button
            class="LidoStakeFormSubmitContainer"
            style={{ background: "rgb(12, 34, 70)" }}
            onClick={() => swap()}
          >
            <span>Swap</span>
          </button>
        ) : (
          <Web3Connect
            className="LidoStakeFormSubmitContainer"
            connectLabel="Connect with Web3"
          />
        )}
      </div>
    </div>
  </Theme>
);
