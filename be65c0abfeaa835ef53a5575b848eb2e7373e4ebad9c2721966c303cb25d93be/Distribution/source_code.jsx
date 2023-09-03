// DETECT SENDER
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", []) !== null
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

if (state.idx === undefined) {
  State.update({ idx: 1 });
}

// setup constants
const WTONAddress = "0xc4a11aaf6ea915ed7ac194161d2fc9384f15bff2";
const wtonDecimals = 27;

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

if (state.sender !== undefined) {
  if (state.currentBlockNumber === undefined) {
    Ethers.provider()
      .getBlockNumber()
      .then((blockNumber) => {
        State.update({ currentBlockNumber: blockNumber });
      });
  }

  if (state.currentBlockNumber !== undefined) {
    const fromBlock = state.currentBlockNumber - 6400 * state.idx;
    const filter = {
      fromBlock: fromBlock,
      address: "0x710936500ac59e8551331871cbad3d33d5e0d909",
      topics: [ethers.utils.id("Comitted(address)")],
    };

    if (state.lastUpdatedBlockNumber === undefined && state.sender) {
      Ethers.provider()
        .getLogs(filter)
        .then((logs) => {
          if (logs.length === 0) {
            State.update({ idx: state.idx + 1 });
            return;
          }

          Ethers.provider()
            .getBlock(logs[logs.length - 1].blockNumber)
            .then((block) => {
              const date = new Date(block.timestamp * 1000);
              State.update({
                lastUpdatedTimestamp:
                  date.toLocaleDateString() + " " + date.toLocaleTimeString(),
                lastUpdatedBlockNumber: logs[logs.length - 1].blockNumber,
              });
            });
        });
    }
  }
}

return (
  <Theme>
    <div class="LidoContainer">
      <div class="Header">PowerTON Helper</div>

      <div class="LidoForm">
        {state.lastUpdatedBlockNumber ? (
          <div>
            rewards updated at :
            {`${state.lastUpdatedBlockNumber}(${state.lastUpdatedTimestamp})`}
          </div>
        ) : (
          <></>
        )}
        {state.tx ? <div>Transaction Hash: {state.tx.hash}</div> : <></>}
      </div>

      <div class="LidoStakeForm">
        {!!state.sender ? (
          <div>
            Transfer seigniorage allocated to PowerTON contract
            <button
              class="LidoStakeFormSubmitContainer"
              onClick={() => {
                const hammerDaoAddress =
                  "0x5d9a0646c46245a8a3b4775afb3c54d07bcb1764";
                const dao = new ethers.Contract(
                  hammerDaoAddress,
                  ["function updateSeigniorage()"],
                  Ethers.provider().getSigner()
                );

                dao.updateSeigniorage().then((transactionHash) => {
                  State.update({ tx: transactionHash });
                  console.log("transactionHash is " + transactionHash);
                });
              }}
            >
              <span>1. Update Seigniorage</span>
            </button>
            <p />
            Distribute seigniorage accumulated in the PowerTON contract to the
            dividend contract.
            <button
              class="LidoStakeFormSubmitContainer"
              onClick={() => {
                const powerTONAddress =
                  "0x970298189050aBd4dc4F119ccae14ee145ad9371";
                const powerton = new ethers.Contract(
                  powerTONAddress,
                  ["function distribute()"],
                  Ethers.provider().getSigner()
                );

                powerton.distribute().then((transactionHash) => {
                  State.update({ tx: transactionHash });
                  console.log("transactionHash is " + transactionHash);
                });
              }}
            >
              <span>2. Distribute</span>
            </button>
          </div>
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
