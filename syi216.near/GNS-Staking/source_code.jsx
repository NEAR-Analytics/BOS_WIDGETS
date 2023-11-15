// FETCH LIDO ABI
State.init({ strEther: "0", polygonApr: undefined });
const lidoContract = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";

//Contrato de gains bridge
const gbContract = "0xDF774A4F3EA5095535f5B8f5b9149caF90FF75Bd";
const gnsLZContract = "0x3c2269811836af69497E5F486A85D7316753cf62";
const gnsToken = "0xE5417Af564e4bFDA1c483642db72007871397896";
const gnsStaking = "0xFb06a737f549Eb2512Eb6082A808fc7F16C0819D";

const mainnetLidoContract = "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f";
const gorliLidoContract = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
const tokenDecimals = 18;
const contract = "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2";

const polygonApr = fetch("https://backend-polygon.gains.trade/apr");

const gnsTokenAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/gnsTokenABI.json"
);

const gnsStakingAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/gnsStakingABI.json"
);

if (!gnsStakingAbi.ok && !gnsTokenAbi.ok && !polygonApr.ok) {
  State.update({polygonApr: polygonApr})
  return "Loading";
}

console.log("APR", polygonApr);

// HELPER FUNCTIONS

const getStakedBalance = (receiver) => {
  const contractGNSStaking = new ethers.Contract(
    gnsStaking,
    gnsStakingAbi.body,
    Ethers.provider().getSigner()
  );
  contractGNSStaking
    .users(Ethers.provider().getSigner().getAddress())
    .then((res) => {
      console.log(res[0]);
      return Big(res[0]).div(Big(10).pow(18)).toFixed(2);
    });
};

const submitEthers = (strEther, _referral) => {
  if (!strEther) {
    console.log("contrato: ", state.tokenTo);
    return console.log("Amount is missing");
  }

  const contractGNSStaking = new ethers.Contract(
    gnsStaking,
    gnsStakingAbi.body,
    Ethers.provider().getSigner()
  );
  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  contractGNSStaking
    .stakeTokens(amount, { gasLimit: 3e6 })
    .then((transactionHash) => {
      console.log("transactionHash is " + transactionHash);
    });
};

const approveGNS = (strEther, _referral) => {
  const contractGNSTOK = new ethers.Contract(
    gnsToken,
    gnsTokenAbi.body,
    Ethers.provider().getSigner()
  );
  console.log("balance unfixed: ", state.balanceUnfixed);
  contractGNSTOK
    .approve(gnsStaking, state.balanceUnfixed, {
      gasLimit: 3e4,
    })
    .then((th) => {
      console.log("transaction Hash: ", th);
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
  const contractGNSTOK = new ethers.Contract(
    gnsToken,
    gnsTokenAbi.body,
    Ethers.provider().getSigner()
  );
  contractGNSTOK.balanceOf(state.sender).then((res) => {
    console.log("unfixed",res.toHexString())
    console.log("balance GNS", Big(res).div(Big(10).pow(18)).toFixed(2));
    State.update({ balanceUnfixed: res.toHexString() });
    State.update({ balance: Big(res).div(Big(10).pow(18)).toFixed(2) });
  });
}

// FETCH SENDER STETH BALANCE


if (state.stakedBalance === undefined && state.sender) {
  const contractGNSStaking = new ethers.Contract(
    gnsStaking,
    gnsStakingAbi.body,
    Ethers.provider().getSigner()
  );
  contractGNSStaking
    .users(state.sender)
    .then((res) => {
      console.log(res[0]);
      State.update({
        stakedBalance: Big(res[0]).div(Big(10).pow(18)).toFixed(2),
      });
      State.update({
        daiBalance: Big(res[1]).div(Big(10).pow(18)).toFixed(10),
      });
    });
}

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/gnsCSS.css"
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
      <div class="Header">Stake GNS</div>
      <div class="SubHeader">Stake GNS token on Polygon </div>
      <div class="SubHeader-2">
        Before staking press the approve button to give access to your GNS
      </div>
      <div class="LidoForm">
        {state.sender && (
          <>
            <div class="LidoFormTopContainer">
              <div class="LidoFormTopContainerLeft">
                <div class="LidoFormTopContainerLeftContent1">
                  <div class="LidoFormTopContainerLeftContent1Container">
                    <span>Available to stake</span>
                  </div>
                </div>
                <div class="LidoFormTopContainerLeftContent2">
                  <span>
                    {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;GNS
                  </span>
                </div>
              </div>
              <div class="LidoFormTopContainerRight">
                <div class="LidoFormTopContainerRightContent1">
                  <div class="LidoFormTopContainerRightContent1Text">
                    <span>
                      <b>Account:</b> {getSender()}
                    </span>
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
                &nbsp;GNS
              </span>
            </div>
          </div>
          <div class="LidoFormTopContainerRight">
            <div class="LidoAprContainer">
              <div class="LidoAprTitle">GNS APR</div>
              <div class="LidoAprValue">
                {polygonApr.body.sssApr.toFixed(4) ?? "...."}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="LidoStakeForm">
        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan1">
            <img
              src="https://research.binance.com/static/images/projects/gains-network/logo.png"
              width="24"
              height="24"
            />
          </span>
          <span class="LidoStakeFormInputContainerSpan2">
            <input
              disabled={!state.sender}
              class="LidoStakeFormInputContainerSpan2Input"
              value={state.strEther}
              //onChange={(e) => State.update({ strEther: e.target.value })}
              placeholder="Amount"
            />
          </span>
          <span
            class="LidoStakeFormInputContainerSpan3"
            onClick={() => {
              
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
          <div>
            <button
              class="LidoStakeFormSubmitContainer mb-2"
              //onClick={() => approveGNS(state.strEther, state.sender)}
            >
              <span>Approve use of GNS</span>
            </button>
            <button
              class="LidoStakeFormSubmitContainer"
              //onClick={() => submitEthers(state.strEther, state.sender)}
            >
              <span>Stake</span>
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
