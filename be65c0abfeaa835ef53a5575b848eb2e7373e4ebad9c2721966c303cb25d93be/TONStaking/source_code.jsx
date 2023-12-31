// SET CONSTANTS
const WTON_ADDRESS = "0xc4a11aaf6ea915ed7ac194161d2fc9384f15bff2";
const WTON_DECIMALS = 27;
const LOCK_TOS_DIVIDEND_PROXY_ADDRESS =
  "0x17332F84Cc0bbaD551Cd16675F406A0a2c55E28C";

if (Ethers.provider() !== null) {
  if (state.chainId === undefined) {
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
    const iface = new ethers.utils.Interface([
      "function claimable(address, address) external view returns (uint256)",
    ]);
    const encodedData = iface.encodeFunctionData("claimable", [
      state.sender,
      WTON_ADDRESS,
    ]);
    return Ethers.provider()
      .call({
        to: LOCK_TOS_DIVIDEND_PROXY_ADDRESS,
        data: encodedData,
      })
      .then((rawdata) => {
        const claimableHex = iface.decodeFunctionResult("claimable", rawdata);
        const claimable = Big(claimableHex.toString())
          .div(Big(10).pow(WTON_DECIMALS))
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");
        State.update({
          claimable: claimable,
        });
      });
  }
}

const claim = () => {
  if (Number(state.claimable) === 0n) return;
  const ABI = ["function claim(address) external"];
  const lockTOSDividendProxyContract = new ethers.Contract(
    LOCK_TOS_DIVIDEND_PROXY_ADDRESS,
    ABI,
    Ethers.provider().getSigner()
  );
  lockTOSDividendProxyContract.claim(WTON_ADDRESS).then((transactionHash) => {
    State.update({ tx: transactionHash });
    console.log("transactionHash is " + transactionHash);
  });
};

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
      font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
        sans-serif;
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
        {!!state.sender ? (
          <button class="LidoStakeFormSubmitContainer" onClick={() => claim()}>
            <span>Claim</span>
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
