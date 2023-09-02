if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (state.chainId !== undefined && state.chainId !== 1) {
  return <p>Switch to Ethereum Mainnet</p>;
}

const ABI = [
  "function claimable(address, address) external view returns (uint256)",
  "function claim(address) external",
];

// setup constants
const lockTOSDividendProxyAddress =
  "0x17332F84Cc0bbaD551Cd16675F406A0a2c55E28C";
const WTONAddress = "0xc4a11aaf6ea915ed7ac194161d2fc9384f15bff2";
const wtonDecimals = 27;

const lockTOSDividendProxyContract = new ethers.Contract(
  lockTOSDividendProxyAddress,
  ABI,
  Ethers.provider().getSigner()
);

// HELPER FUNCTIONS
const getStakedBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: lidoContract,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const handleClaim = () => {
  lockTOSDividendProxyContract.claim(WTONAddress).then((transactionHash) => {
    State.update({ tx: transactionHash });
    console.log("transactionHash is " + transactionHash);
  });
};

// DETECT SENDER
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

// FETCH CLAIMABLE WTON AMOUNT
if (state.claimable === undefined && state.sender) {
  lockTOSDividendProxyContract
    .claimable(state.sender, WTONAddress)
    .then((claimable) => {
      console.log(claimable);
      State.update({
        claimable: Big(claimable).div(Big(10).pow(wtonDecimals)).toFixed(2),
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// FETCH CSS
const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
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

return (
  <Theme>
    <div class="LidoContainer">
      <div class="Header">Claim PowerTON</div>
      <div class="SubHeader">Claim your PowerTON seigniorage</div>

      <div class="LidoForm">
        {state.tx ? <div>Transaction Hash: {state.tx.hash}</div> : <></>}
        <div
          class={
            state.sender ? "LidoFormBottomContainer" : "LidoFormTopContainer"
          }
        >
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent2">
              <span>Claimable</span>
            </div>
          </div>
          <div class="LidoFormTopContainerLeftContent2">
            <span>
              {state.claimable ?? (!state.sender ? "0" : "...")}
              &nbsp;WTON
            </span>
          </div>
        </div>
      </div>
      <div class="LidoStakeForm">
        <button
          class="LidoStakeFormSubmitContainer"
          onClick={() => handleClaim()}
        >
          <span>Claim</span>
        </button>
      </div>
    </div>
  </Theme>
);
