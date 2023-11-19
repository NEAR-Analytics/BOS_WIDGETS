// FETCH LIDO ABI

const sparkDai = "0xD72630D78157E1a2feD7A329873Bfd496704403D";
const gorliSparkPoolContract = "0xe7EA57b22D5F496BF9Ca50a7830547b704Ecb91F";
const tokenDecimals = 18;

const network = "gorli"; // "gorli" // "rinkeby" // "mainnet"

const sparkAbi = fetch(
  "https://raw.githubusercontent.com/0xstarkard/sparkAbis/main/pool.json"
);

if (!sparkAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(sparkAbi.body);

// FETCH LIDO STAKING APR

if (state.lidoArp === undefined) {
  const apr = fetch(
    "https://api.allorigins.win/get?url=https://stake.lido.fi/api/sma-steth-apr"
  );
  if (!apr) return;
  State.update({ lidoArp: JSON.parse(apr?.body?.contents) ?? "..." });
}

// HELPER FUNCTIONS

const getStakedBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("getUserAccountData", [
    receiver,
  ]);

  return Ethers.provider()
    .call({
      to: gorliSparkPoolContract,
      data: encodedData,
    })
    .then((rawBalance) => {
      console.log(rawBalance);
      const {
        totalCollateralBase,
        totalDebtBase,
        availableBorrowsBase,
        ltv,
        healthFactor,
      } = iface.decodeFunctionResult("getUserAccountData", rawBalance);
      console.log(
        "--->> ",
        totalCollateralBase,
        totalDebtBase,
        availableBorrowsBase,
        ltv,
        healthFactor
      );
      // state update
      State.update({ healthFactor, ltv, totalCollateralBase });
    });
};

const supply = (asset, strEther, onBehalfOf) => {
  console.log("Entro....");
  if (!strEther) {
    return console.log("Amount is missing");
  }
  const pool = new ethers.Contract(
    gorliSparkPoolContract,
    sparkAbi.body,
    Ethers.provider().getSigner()
  );
  console.log("Pool ", pool);
  // address asset, uint256 amount, address onBehalfOf, uint16 referralCode
  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  pool
    .supply(gorliSparkPoolContract, {
      asset,
      amount,
      onBehalfOf,
      referralCode: 0,
    })
    .then((transactionHash) => {
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

// FETCH SENDER BALANCE

if (state.balance === undefined && state.sender) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

// FETCH TX COST // only applies to lido

if (state.txCost === undefined) {
  const gasEstimate = ethers.BigNumber.from(1875000);
  const gasPrice = ethers.BigNumber.from(1500000000);

  const gasCostInWei = gasEstimate.mul(gasPrice);
  const gasCostInEth = ethers.utils.formatEther(gasCostInWei);

  // change to uniswap
  let responsePrice = fetch(
    "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=5KHW5BWX4G4DW9TGW1AHUNBW5N8QG8AT45"
  );

  console.log(responsePrice);
  if (!responsePrice) return "";

  const ethPriceInUsd = responsePrice.body.result.ethusd;

  const txCost = Number(gasCostInEth) * Number(ethPriceInUsd);

  State.update({ txCost: txCost.toFixed(2) });
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
      <div class="Header">🔥 SparkLend </div>
      <div class="SubHeader">
        Get collateralized loans or uncollateralized p2p loans.
      </div>

      <div class="LidoForm">
        {state.sender && (
          <>
            <div class="LidoFormTopContainer">
              <div class="LidoFormTopContainerLeft">
                <div class="LidoFormTopContainerLeftContent1">
                  <div class="LidoFormTopContainerLeftContent1Container">
                    <span>Collateral available to stake</span>
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
                    <span>{getSender()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="LidoSplitter" />
          </>
        )}
        <div
          class={
            state.sender ? "LidoFormBottomContainer" : "LidoFormTopContainer"
          }
        >
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent1">
              <div class="LidoFormTopContainerLeftContent1Container">
                <span>Staked amount</span>
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <span>
                {state.stakedBalance ?? (!state.sender ? "0" : "...")}
                &nbsp;ETH
              </span>
            </div>
          </div>
          <div class="LidoFormTopContainerRight">
            <div class="LidoAprContainer">
              <div class="LidoAprTitle">DAI APY</div>
              <div class="LidoAprValue">{state.lidoArp ?? "..."}%</div>
            </div>
          </div>
          {state.healthFactor && (
            <div class="LidoFormTopContainerRight">
              <div class="LidoAprContainer">
                <div class="LidoAprTitle">Healt Factor</div>
                <div class="LidoAprValue">{state.healthFactor}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div class="LidoStakeForm">
        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan1"></span>
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
                strEther: (parseFloat(state.balance) - 0.05).toFixed(2),
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
            onClick={() =>
              supply(
                "0x7bcBc27f6AD9c1D1d51eeF8Bd314E4b14f49DB3F",
                state.strEther,
                state.sender
              )
            }
          >
            <span>Supply</span>
          </button>
        ) : (
          <Web3Connect
            className="LidoStakeFormSubmitContainer"
            connectLabel="Connect with Web3"
          />
        )}

        <div class="LidoFooterContainer"></div>
      </div>
    </div>
  </Theme>
);
