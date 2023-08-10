const setcoll = (depositChangeEvent) => {
  const coll = Number(depositChangeEvent.target.value);
  const { totalcoll } = state;
  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

  State.update({ coll, collateralRatio });

  validateTrove();
};

const setBorrow = (borrowChangeEvent) => {
  const { coll, liquidationReserve } = state;
  const borrow = Number(borrowChangeEvent.target.value);
  const borrowingFee = (borrow * 0.5) / 100;
  const totalcoll =
    borrow + Number(borrowingFee.toFixed(2)) + liquidationReserve;
  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

  State.update({ borrow, borrowingFee, totalcoll, collateralRatio });
  validateTrove();
};

const validateTrove = () => {
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

  if (state.isOpenTrove === true) {
    State.update({
      msg: "you already have an active Trove.",
      isBlocked: true,
    });
    return;
  }

  State.update({ msg: "", isBlocked: false });
};

const borrowerOperationAddress = "0xD69fC8928D4F3229341cb431263F1EBd87B1ade8";

const troveManagerAddress = "0x0ECDF34731eE8Dd46caa99a1AAE173beD1B32c67";

const stabilityPoolAddress = "";

const borrowerOperationAbi = fetch(
  "https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=0xcb306e2509ca52872c2d04160F3c1fa7bc013064"
);

const troveManagerAbi = fetch(
  "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/trove-manager-abi.json"
);

const priceFeedAddress = "0x07dD4Ce17De84bA13Fc154A7FdB46fC362a41E2C";
const priceFeedAbi = fetch(
  "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/price-feed-abi.json"
);

const lUSDAddress = "0x80668Ed2e71290EB7526ABE936327b4f5dB52dA8";
const lUSDContractAbi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);

if (!borrowerOperationAbi.ok) return "loading...";
if (!priceFeedAbi.ok) return "loading...";

// const iface = new ethers.utils.Interface(borrowerOperationAbi.body);

const openTrove = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.openTrove(
    ethers.BigNumber.from(5000000000000000),
    ethers.BigNumber.from(props.lusdAmount * 100)
      .mul("10000000000000000")
      .toString(),
    // ethers.BigNumber.from((state.borrow * 10000000000000000).toString()),
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    {
      value: ethers.BigNumber.from(
        (props.ethCollateralAmount * 1000000000000000000).toString()
      ),
      // gasPrice: state.gasPrice,
      gasLimit: 25000000,
    }
  );
};

const withdrawLUSD = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.withdrawLUSD(
    ethers.BigNumber.from(5000000000000000),
    ethers.BigNumber.from(props.borrow * 100)
      .mul("10000000000000000")
      .toString(),
    // ethers.BigNumber.from((state.borrow * 10000000000000000).toString()),
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

const withdrawColl = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.withdrawColl(
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

const moveETHGainToTrove = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.moveETHGainToTrove(
    state.sender,
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d"
  );
};

const closeTrove = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.closeTrove();
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
  const troveManagerContract = new ethers.Contract(
    troveManagerAddress,
    troveManagerAbi.body,
    Ethers.provider().getSigner()
  );

  troveManagerContract.getEntireDebtAndColl(state.sender).then((results) => {
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
  isOpenTrove: undefined,
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

  const troveManagerContract = new ethers.Contract(
    troveManagerAddress,
    troveManagerAbi.body,
    Ethers.provider().getSigner()
  );

  priceFeedContract.getPrice().then((priceRes) => {
    const price = Number(ethers.utils.formatEther(priceRes));

    State.update({ price });
    troveManagerContract.getTCR(priceRes).then((tcrRes) => {
      const tcr = Number(ethers.utils.formatEther(tcrRes)) * 100;

      State.update({ tcr });
    });
  });
}

if (
  state.sender &&
  state.chainId === 11155111 &&
  state.isOpenTrove === undefined
) {
  const troveManagerContract = new ethers.Contract(
    troveManagerAddress,
    troveManagerAbi.body,
    Ethers.provider().getSigner()
  );

  troveManagerContract.getTroveStatus(state.sender).then((res) => {
    const isOpenTrove = ethers.utils.formatEther(res).includes("1");
    State.update({ isOpenTrove });
  });
}

if (
  props.action === "borrow" &&
  props.lusdAmount &&
  props.ethCollateralAmount
) {
  if (
    typeof props.lusdAmount === "number" &&
    typeof props.ethCollateralAmount === "number" &&
    props.ethCollateralAmount > 0
  ) {
    openTrove();
  } else {
    props.resendPrompt(props);
  }
} else if (props.action === "repay") {
  repayLUSD();
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
