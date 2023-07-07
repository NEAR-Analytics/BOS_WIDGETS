State.init({ xavaToStake: "0.01" });

if (state.user === undefined) {
  State.update({ user: Ethers.send("eth_requestAccounts", [])[0] });
}
if (!state.user) return <Web3Connect />;

const XAVA_ADDRESS = "0x64E7AB33C8764a9285cbd48A3b5977c51D2eE645";
const XAVA_STAKING = "0x8BeBB9907c72708442BD4195Bd354A9bAdC2a816";
const XAVA_ABIS = fetch(
  "https://raw.githubusercontent.com/avalaunch-app/xava-protocol/master/deployments/contract-abis.json"
);
if (!XAVA_ABIS.ok) {
  return "loading";
}

const xavaAllocationIface = new ethers.utils.Interface(
  JSON.parse(XAVA_ABIS.body).fuji.AllocationStaking
);

const ERC20_ABI = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!ERC20_ABI.ok) {
  a;
  return <p>"Loading"</p>;
}

// GET XAVA BALANCE
const tokenIface = new ethers.utils.Interface(ERC20_ABI.body);
const getXavaBalance = () => {
  const encodedData = tokenIface.encodeFunctionData("balanceOf", [state.user]);

  return Ethers.provider()
    .call({
      to: XAVA_ADDRESS,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = tokenIface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString()).div(Big(10).pow(18)).toFixed(2);
    });
};

// GET STAKED BALANCE
const getStakedBalance = () => {
  const encodedData = xavaAllocationIface.encodeFunctionData("deposited", [
    0,
    state.user,
  ]);

  return Ethers.provider()
    .call({
      to: XAVA_STAKING,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = xavaAllocationIface.decodeFunctionResult(
        "deposited",
        rawBalance
      );

      return Big(receiverBalanceHex.toString()).div(Big(10).pow(18)).toFixed(2);
    });
};

const setXavaBalance = () => {
  getXavaBalance().then((xavaBalance) => {
    console.log(xavaBalance);
    State.update({ xavaBalance });
  });
};

if (state.xavaBalance === undefined && state.user) {
  setXavaBalance();
}

const setStakedXava = () => {
  getStakedBalance().then((xavaStaked) => {
    console.log(xavaStaked);
    State.update({ xavaStaked });
  });
};

if (state.xavaStaked === undefined && state.user) {
  setStakedXava();
}

const convertToWei = (tokens) => {
  return Big(parseFloat(tokens)).times(Big(10).pow(18)).toFixed(0).toString();
};

const handleStakeXava = () => {
  console.log(convertToWei(state.xavaToStake));
  console.log(JSON.parse(XAVA_ABIS.body).fuji.AllocationStaking);
  let contract = new ethers.Contract(
    XAVA_STAKING,
    xavaAllocationIface,
    Ethers.provider().getSigner()
  );
  contract
    .deposit("0", convertToWei(state.xavaToStake))
    .then((result) => {
      console.log(result);
      State.update({ txHash: result.hash, errorMsg: null });
    })
    .catch((e) => {
      console.log(e);
      State.update({ errorMsg: e.reason, txHash: null });
    });
};

return (
  <div>
    <p>You have: {state.xavaBalance}XAVA</p>
    <p>You have staked: {state.xavaStaked} XAVA</p>
    {state.xavaBalance && (
      <div>
        <input
          class="form-range"
          type="range"
          min={0.01}
          step={0.01}
          max={parseInt(state.xavaBalance)}
          value={state.xavaToStake}
          onChange={(e) => State.update({ xavaToStake: e.target.value })}
        />
        <button onClick={handleStakeXava}>
          Stake: {state.xavaToStake} XAVA
        </button>
        {state.txHash && (
          <p style={{ color: "black" }}>
            Staking successful{" "}
            <a
              target="_blank"
              href={`https://testnet.snowtrace.io/tx/${state.txHash}`}
            >
              Transaction Hash
            </a>
          </p>
        )}

        {state.errorMsg && (
          <p style={{ color: "red" }}>Error: {state.errorMsg}</p>
        )}
      </div>
    )}
  </div>
);
