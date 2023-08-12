const availableAssets = {
  rETH: "0x62bc478ffc429161115a6e4090f819ce5c50a5d9",
  wETH: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
  cbETH: "0x178e141a0e3b34152f73ff610437a7bf9b83267a",
  stETH: "0xcef9cd8bb310022b5582e55891af043213110783",
};

const getAsset = (asset) => {
  return availableAssets[asset];
};

const setcoll = (depositChangeEvent) => {
  const coll = Number(depositChangeEvent.target.value);
  const { totalcoll } = state;
  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

  State.update({ coll, collateralRatio });

  validateVessel();
};

const setBorrow = (borrowChangeEvent) => {
  const { coll, liquidationReserve } = state;
  const borrow = Number(borrowChangeEvent.target.value);
  const borrowingFee = (borrow * 0.5) / 100;
  const totalcoll =
    borrow + Number(borrowingFee.toFixed(2)) + liquidationReserve;
  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

  State.update({ borrow, borrowingFee, totalcoll, collateralRatio });
  validateVessel();
};

const validateVessel = () => {
  const { coll, borrow, totalcoll, balance } = state;

  if (borrow < 1800) {
    State.update({
      msg: "Borrow must be at least 1800 LUSD.",
      isBlocked: true,
    });
    return;
  }

  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;
  if (collateralRatio < 110) {
    State.update({
      msg: "Collateral ratio must be at least 110%.",
      isBlocked: true,
    });
    return;
  }

  if (coll > Number(balance)) {
    State.update({
      msg: `The amount you're trying to deposit exceeds your balance by ${coll} ETH.`,
      isBlocked: true,
    });
    return;
  }

  if (state.isOpenVessel === true) {
    State.update({
      msg: "you already have an active Vessel.",
      isBlocked: true,
    });
    return;
  }

  State.update({ msg: "", isBlocked: false });
};

const borrowerOperationAddress = "0xC2AE62aC744c03E9B7288CB04abaa1E3aDBD6ec0";

const vesselManagerAddress = "0x30B52bfa3A923D14BbBA08BDfC3Ff05A7a02527E";

const stabilityPoolAddress = "0xBF4145c4C2E9D448787f3be6d90a677b54aec9ef";

const borrowerOperationAbi = fetch(
  "https://api.etherscan.io/api?module=contract&action=getabi&address=0x9c4e709632b752b4744a37bd991ba31f320fa82b"
);

const vesselManagerAbi = fetch(
  "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/trove-manager-abi.json"
);

const priceFeedAddress = "0x07dD4Ce17De84bA13Fc154A7FdB46fC362a41E2C";
const priceFeedAbi = fetch(
  "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/price-feed-abi.json"
);

const lUSDAddress = "0xb0e99590cF3Ddfdc19e68F91f7fe0626790cDb53";
const lUSDContractAbi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);

if (!borrowerOperationAbi.ok) return "loading...";
if (!priceFeedAbi.ok) return "loading...";

// const iface = new ethers.utils.Interface(borrowerOperationAbi.body);

const openVessel = () => {
  console.log("Hererere");
  const asset = getAsset(props.asset);
  console.log(asset);
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );
  console.log(props);
  borrowerOperationContract.openVessel(
    asset,
    ethers.BigNumber.from(props.collateralAmount * 100)
      .mul("10000000000000000")
      .toString(),
    ethers.BigNumber.from(props.susAmount * 100)
      .mul("10000000000000000")
      .toString(),
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    {
      gasLimit: 25000000,
    }
  );
};

const withdrawDebtTokens = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.withdrawDebtTokens(
    getAsset(props.asset),
    ethers.BigNumber.from(props.borrow * 100)
      .mul("10000000000000000")
      .toString(),
    // ethers.BigNumber.from((state.borrow * 10000000000000000).toString()),
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d"
  );
};

const withdrawColl = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.withdrawColl(
    getAsset(props.asset),
    ethers.utils.parseUnits(props.ethCollateralAmount.toString(), "ether"),
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    {
      // gasPrice: state.gasPrice,
      gasLimit: 25000000,
    }
  );
};

const repayLUSD = () => {
  const lUSDContract = new ethers.Contract(
    lUSDAddress,
    lUSDContractAbi.body,
    Ethers.provider().getSigner()
  );
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );
  console.log(props);

  lUSDContract
    .approve(
      borrowerOperationAddress,
      ethers.BigNumber.from(props.amount * 100)
        .mul("10000000000000000")
        .toString()
    )
    .then((approveTx) => {
      return approveTx.wait();
    })
    .then(() => {
      borrowerOperationContract.repayLUSD(
        ethers.BigNumber.from(props.amount * 100)
          .mul("10000000000000000")
          .toString(),
        "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
        "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
        {
          gasLimit: 25000000,
        }
      );
    });
};

const addColl = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.addColl(
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    {
      value: ethers.BigNumber.from(
        (props.coll * 1000000000000000000).toString()
      ),
      // gasPrice: state.gasPrice,
      // gasLimit: 25000000,
    }
  );
};

const moveETHGainToVessel = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.moveETHGainToVessel(
    state.sender,
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d"
  );
};

const closeVessel = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.closeVessel();
};

const claimCollateral = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.claimCollateral();
};

const getEntireDebtAndColl = () => {
  const vesselManagerContract = new ethers.Contract(
    vesselManagerAddress,
    vesselManagerAbi.body,
    Ethers.provider().getSigner()
  );

  vesselManagerContract.getEntireDebtAndColl(state.sender).then((results) => {
    console.log(debt);
    State.update({
      debt: results[0].div("1000000000000000000").toString(),
      coll: ethers.utils.formatEther(results[1].toString()),
      pendingLUSDDebtReward: results[2].toString(),
      pendingETHReward: results[3].toString(),
    });
  });
};

State.init({
  coll: null,
  borrow: 0,
  borrowingFee: 0,
  totalcoll: 200,
  collateralRatio: 0,
  liquidationReserve: 200,
  msg: "",
  sender: undefined,
  chainId: undefined,
  balance: undefined,
  price: 0,
  isOpenVessel: undefined,
  isBlocked: true,
  debt: null,
  pendingLUSDDebtReward: null,
  pendingETHReward: null,
});

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

if (state.balance === undefined && state.sender) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

if (
  state.sender &&
  Ethers.send("eth_requestAccounts", [])[0] &&
  state.chainId === 11155111 &&
  state.price === 0
) {
  const priceFeedContract = new ethers.Contract(
    priceFeedAddress,
    priceFeedAbi.body,
    Ethers.provider().getSigner()
  );

  const vesselManagerContract = new ethers.Contract(
    vesselManagerAddress,
    vesselManagerAbi.body,
    Ethers.provider().getSigner()
  );

  priceFeedContract.getPrice().then((priceRes) => {
    const price = Number(ethers.utils.formatEther(priceRes));

    State.update({ price });
    vesselManagerContract.getTCR(priceRes).then((tcrRes) => {
      const tcr = Number(ethers.utils.formatEther(tcrRes)) * 100;

      State.update({ tcr });
    });
  });
}

if (
  state.sender &&
  state.chainId === 11155111 &&
  state.isOpenVessel === undefined
) {
  const vesselManagerContract = new ethers.Contract(
    vesselManagerAddress,
    vesselManagerAbi.body,
    Ethers.provider().getSigner()
  );

  vesselManagerContract.getVesselStatus(state.sender).then((res) => {
    const isOpenVessel = ethers.utils.formatEther(res).includes("1");
    State.update({ isOpenVessel });
  });
}

if (
  props.action === "borrow" &&
  props.susAmount &&
  props.collateralAmount &&
  props.asset
) {
  if (
    typeof props.susAmount === "number" &&
    typeof props.collateralAmount === "number" &&
    props.collateralAmount > 0
  ) {
    openVessel();
  } else {
    props.resendPrompt(props);
  }
} else if (props.action === "repay") {
  repayDebtTokens();
} else if (props.action === "display") {
  getEntireDebtAndColl();
} else if (props.action === "withdraw") {
  withdrawColl();
} else {
  props.resendPrompt(props);
}

return (
  <div>
    {state.debt ? (
      <div>
        <p>Debt: {state.debt} LUSD</p>
        <p>Collateral: {state.coll} ETH</p>
        <p>Pending ETH Reward: {state.pendingETHReward} ETH</p>
        <p>Pending LUSD Debt Reward: {state.pendingLUSDDebtReward} LUSD</p>
      </div>
    ) : (
      <div></div>
    )}
  </div>
);
