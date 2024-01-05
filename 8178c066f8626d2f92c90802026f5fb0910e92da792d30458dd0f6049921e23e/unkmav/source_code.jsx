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
if (state.chainId !== undefined && state.chainId !== 324) {
  return <p>Switch to Zksync Era Mainnet</p>;
}

const unkMavContract = "0xae7ab96520de3a18e5e111b5eaab095312d7fe84";
const tokenDecimals = 18;
const mavDepositor = "0x7367A949CEd34c37BF5576189f357648bb8D5860";
const mavToken = "0x787c09494Ec8Bcb24DcAf8659E7d5D69979eE508";
const stakingContract = "0x5b439AB114490574D7bcDEa0eCb642d44c2a1679";

const lidoAbi = fetch(
  "https://raw.githubusercontent.com/lidofinance/lido-subgraph/master/abis/Lido.json"
);
if (!lidoAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(lidoAbi.body);

const depositorAbi = [
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "bool", name: "_lock", type: "bool" },
      { internalType: "bool", name: "_stake", type: "bool" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// HELPER FUNCTIONS

const getStakedBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: stakingContract,
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

const submitEthers = (strEther, _referral) => {
  if (!strEther) {
    return console.log("Amount is missing");
  }
  const mavDepositorContract = new ethers.Contract(
    mavDepositor,
    depositorAbi,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  mavDepositorContract.deposit(amount, true, true).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
  });
};
const approve = (strEther, _referral) => {
  if (!strEther) {
    return console.log("Amount is missing");
  }
  const erc20 = new ethers.Contract(
    mavToken,
    lidoAbi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  erc20.approve(mavDepositor, amount).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
  });
  erc20.allowance(state.sender, mavDepositor).then((allowance) => {
    State.update({ allowance: Big(allowance).div(Big(10).pow(18)).toFixed(2) });
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

//if (!state.sender)  return "Please login first";

// FETCH SENDER BALANCE

if (state.balance === undefined && state.sender) {
  const erc20 = new ethers.Contract(
    mavToken,
    lidoAbi.body,
    Ethers.provider().getSigner()
  );
  erc20.balanceOf(state.sender).then((balance) => {
    State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
  });
}

// FETCH SENDER unkmav BALANCE

if (state.stakedBalance === undefined && state.sender) {
  getStakedBalance(state.sender).then((stakedBalance) => {
    State.update({ stakedBalance });
  });
}
// fetch allowance
if (state.allowance === undefined && state.sender) {
  const erc20 = new ethers.Contract(
    mavToken,
    lidoAbi.body,
    Ethers.provider().getSigner()
  );
  erc20.allowance(state.sender, mavDepositor).then((allowance) => {
    State.update({ allowance: Big(allowance).div(Big(10).pow(18)).toFixed(2) });
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

// OUTPUT UI

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};
console.log(state);
return (
  <Theme>
    <div class="LidoContainer">
      <div class="Header">Stake MAV</div>
      <div class="SubHeader">Stake MAV and receive unkMAV while staking.</div>

      <div class="LidoForm">
        {state.sender && (
          <>
            <div class="LidoFormTopContainer">
              <div class="LidoFormTopContainerLeft">
                <div class="LidoFormTopContainerLeftContent1">
                  <div class="LidoFormTopContainerLeftContent1Container">
                    <span>Available to stake</span>
                    <div class="LidoFormTopContainerLeftContent1Circle" />
                  </div>
                </div>
                <div class="LidoFormTopContainerLeftContent2">
                  <span>
                    {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;MAV
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
                &nbsp;unkMAV
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="LidoStakeForm">
        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan1">
            <svg
              width="43"
              height="43"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.0017 2.07213e-07C10.7473 -0.00172294 0.00172335 10.7438 2.07213e-07 23.9983C-0.00172294 37.2527 10.7438 47.9983 23.9983 48C37.2527 48.0017 47.9983 37.2562 48 24.0017C48 24 48 24 48 23.9983C47.9983 10.7455 37.2545 0.00172335 24.0017 2.07213e-07Z"
                fill="#780EFF"
              ></path>
              <path
                d="M23.7284 28.0735V22.6842L9.20605 30.2458H36.165V15.1226L23.7284 28.0735Z"
                fill="white"
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
                strEther: parseFloat(state.balance).toFixed(2),
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
          state.allowance < state.strEther ? (
            <button
              class="LidoStakeFormSubmitContainer"
              onClick={() => approve(state.strEther, state.sender)}
            >
              <span>Approve</span>
            </button>
          ) : (
            <button
              class="LidoStakeFormSubmitContainer"
              onClick={() => submitEthers(state.strEther, state.sender)}
            >
              <span>Submit</span>
            </button>
          )
        ) : (
          <Web3Connect
            className="LidoStakeFormSubmitContainer"
            connectLabel="Connect with Web3"
          />
        )}

        <div class="LidoFooterContainer">
          {state.sender && (
            <div class="LidoFooterRaw">
              <div class="LidoFooterRawLeft">You will receive</div>
              <div class="LidoFooterRawRight">
                ${state.strEther ?? 0} unkMAV
              </div>
            </div>
          )}
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Exchange rate</div>
            <div class="LidoFooterRawRight">1 MAV = 1 unkMAV</div>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
