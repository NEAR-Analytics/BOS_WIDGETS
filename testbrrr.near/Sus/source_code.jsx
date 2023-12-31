const availableAssets = {
  // rETH: "0x62bc478ffc429161115a6e4090f819ce5c50a5d9",
  WETH: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
  cbETH: "0xe39ab88f8a4777030a534146a9ca3b52bd5d43a3",
  // stETH: "0xcef9cd8bb310022b5582e55891af043213110783",
};

const assetsArray = [
  // "0x62bc478ffc429161115a6e4090f819ce5c50a5d9",
  "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
  "0xe39ab88f8a4777030a534146a9ca3b52bd5d43a3",
  // "0xcef9cd8bb310022b5582e55891af043213110783",
];

const getAsset = (asset) => {
  return availableAssets[asset];
};

const getAssetFromAddress = (address) => {
  return Object.keys(availableAssets).find(
    (key) => availableAssets[key] === address
  );
};

const Button = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    color:#fff;
    width:100%;
    height:50px;
    border-radius:10px;
    background-color:#2fbc2f;
    text-align:center;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 3px 3px rgba(0,0,0,.3);
    margin-top: 15px;

    &:active {
      box-shadow: 0 0 0 rgba(0,0,0,0);
      transform: translateY(2px);
    }
`;

const Balance = styled.div`
    display:flex;
    flex-direction: column;
    align-items:start;
    justify-content:start;
`;

const BalanceContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;

  @media (min-width: 768px) {
    width: 650px!important;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

State.init({
  coll: null,
  borrow: 0,
  borrowingFee: 0,
  totalcoll: 200,
  collateralRatio: 0,
  liquidationReserve: 200,
  txLock: false,
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
  tx: null,
  balances: [],
  stopReload: false,
  stabilityBalances: 0,
  success: false,
});

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

const borrowerOperationAddress = "0xf58cc15b92ee257bc55958c846100dbb38775595";

const vesselManagerAddress = "0x2979F8010b9fA8Da13Cc4Ff42bd0115dC855A779";

const stabilityPoolAddress = "0x8f8941F1900E9C0cE06Dce3Af19aA8DF26a6964f";

const borrowerOperationAbi = fetch(
  "https://api.etherscan.io/api?module=contract&action=getabi&address=0x9c4e709632b752b4744a37bd991ba31f320fa82b"
);

const vesselManagerAbi = fetch(
  "https://gist.githubusercontent.com/kcole16/667331152bdb1e9cef785e7cd07d6087/raw/52b5f915793ca9ef1d5314c47ab20bddf90aa463/test.json"
);

const stabilityPoolAbi = fetch(
  "https://gist.githubusercontent.com/kcole16/7b83188f08f15112d2221bd08e15a893/raw/91c3f7b06b1aa9e5405fc4c993a51dcb7fd6b8ac/abi.json"
);

const priceFeedAddress = "0x07dD4Ce17De84bA13Fc154A7FdB46fC362a41E2C";
const priceFeedAbi = fetch(
  "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/price-feed-abi.json"
);

const lUSDAddress = "0xb0e99590cF3Ddfdc19e68F91f7fe0626790cDb53";
const AssetContractAbi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);

if (!borrowerOperationAbi.ok) return "loading...";
if (!priceFeedAbi.ok) return "loading...";

// const iface = new ethers.utils.Interface(borrowerOperationAbi.body);

const openVessel = () => {
  const asset = getAsset(props.asset);
  const assetContract = new ethers.Contract(
    asset,
    AssetContractAbi.body,
    Ethers.provider().getSigner()
  );

  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  const vesselManagerContract = new ethers.Contract(
    vesselManagerAddress,
    vesselManagerAbi.body,
    Ethers.provider().getSigner()
  );

  vesselManagerContract.isVesselActive(asset, state.sender).then((isActive) => {
    console.log(isActive);
    if (isActive) {
      console.log("Vessel is already active for this asset");
      return;
    }

    if (!state.txLock) {
      State.update({ txLock: true });
      assetContract
        .approve(
          borrowerOperationAddress,
          ethers.BigNumber.from(props.collateralAmount * 100)
            .mul("10000000000000000")
            .toString()
        )
        .then((approveTx) => {
          State.update({ tx: approveTx.hash });
          return approveTx.wait();
        })
        .then(() => {
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
              gasLimit: 2500000,
            }
          );
        })
        .then((finalTx) => {
          State.update({ tx: finalTx.hash });
          return finalTx.wait();
        })
        .then(() => {
          State.update({ txLock: false, success: true });
          getEntireDebtAndColl();
        });
    }
  });
};

const withdrawDebtTokens = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract
    .withdrawDebtTokens(
      getAsset(props.asset),
      ethers.BigNumber.from(props.amount * 100)
        .mul("10000000000000000")
        .toString(),
      // ethers.BigNumber.from((state.borrow * 10000000000000000).toString()),
      "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
      "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d"
    )
    .then((finalTx) => {
      State.update({ tx: finalTx.hash });
      return finalTx.wait();
    })
    .then(() => {
      State.update({ txLock: false, success: true });
      getEntireDebtAndColl();
    });
};

const withdrawColl = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract
    .withdrawColl(
      getAsset(props.asset),
      ethers.BigNumber.from(props.amount * 100)
        .mul("10000000000000000")
        .toString(),
      "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
      "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
      {
        // gasPrice: state.gasPrice,
        gasLimit: 25000000,
      }
    )
    .then((finalTx) => {
      State.update({ tx: finalTx.hash });
      return finalTx.wait();
    })
    .then(() => {
      State.update({ txLock: false, success: true });
      getEntireDebtAndColl();
    });
};

const repayDebtTokens = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );
  if (!state.txLock) {
    State.update({ txLock: true });
    borrowerOperationContract
      .repayDebtTokens(
        getAsset(props.asset),
        ethers.BigNumber.from(props.amount * 100)
          .mul("10000000000000000")
          .toString(),
        "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
        "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
        {
          gasLimit: 25000000,
        }
      )
      .then((finalTx) => {
        State.update({ tx: finalTx.hash });
        return finalTx.wait();
      })
      .then(() => {
        State.update({ txLock: false, success: true });
        getEntireDebtAndColl();
      });
  }
};

const addColl = () => {
  const asset = getAsset(props.asset);
  const assetContract = new ethers.Contract(
    asset,
    AssetContractAbi.body,
    Ethers.provider().getSigner()
  );

  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  assetContract
    .approve(
      borrowerOperationAddress,
      ethers.BigNumber.from(props.amount * 100)
        .mul("10000000000000000")
        .toString()
    )
    .then((approveTx) => {
      State.update({ tx: approveTx.hash });
      return approveTx.wait();
    })
    .then(() => {
      borrowerOperationContract.addColl(
        asset,
        ethers.BigNumber.from(props.amount * 100)
          .mul("10000000000000000")
          .toString(),
        "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
        "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
        {
          gasLimit: 25000000,
        }
      );
    })
    .then((finalTx) => {
      State.update({ tx: finalTx.hash });
      return finalTx.wait();
    })
    .then(() => {
      State.update({ txLock: false, success: true });
      getEntireDebtAndColl();
    });
};

const closeVessel = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract
    .closeVessel(getAsset(props.asset))
    .then((finalTx) => {
      State.update({ tx: finalTx.hash });
      return finalTx.wait();
    })
    .then(() => {
      State.update({ txLock: false, success: true });
      getEntireDebtAndColl();
    });
};

const claimCollateral = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract
    .claimCollateral(getAsset(props.asset))
    .then((finalTx) => {
      State.update({ tx: finalTx.hash });
      return finalTx.wait();
    })
    .then(() => {
      State.update({ txLock: false, success: true });
      getEntireDebtAndColl();
    });
};

const provideToSP = () => {
  const stabilityPoolContract = new ethers.Contract(
    stabilityPoolAddress,
    stabilityPoolAbi.body,
    Ethers.provider().getSigner()
  );

  if (!state.txLock) {
    State.update({ txLock: true });
    stabilityPoolContract
      .provideToSP(
        ethers.BigNumber.from(props.amount * 100)
          .mul("10000000000000000")
          .toString(),
        assetsArray
      )
      .then((finalTx) => {
        State.update({ tx: finalTx.hash });
        return finalTx.wait();
      })
      .then(() => {
        State.update({ txLock: false, success: true });
        getEntireDebtAndColl();
      });
  }
};

const withdrawFromSP = () => {
  const stabilityPoolContract = new ethers.Contract(
    stabilityPoolAddress,
    stabilityPoolAbi.body,
    Ethers.provider().getSigner()
  );
  if (!state.txLock) {
    State.update({ txLock: true });
    stabilityPoolContract
      .withdrawFromSP(
        ethers.BigNumber.from(props.amount * 100)
          .mul("10000000000000000")
          .toString(),
        assetsArray
      )
      .then((finalTx) => {
        State.update({ tx: finalTx.hash });
        return finalTx.wait();
      })
      .then(() => {
        State.update({ txLock: false, success: true });
        getEntireDebtAndColl();
      });
  }
};

const vesselManagerContract = new ethers.Contract(
  vesselManagerAddress,
  vesselManagerAbi.body,
  Ethers.provider().getSigner()
);

let assets = Object.values(availableAssets);

const processAsset = (index, balances) => {
  let asset = assets[index];
  if (asset && !state.stopReload) {
    vesselManagerContract
      .getEntireDebtAndColl(asset, state.sender)
      .then((results) => {
        balances.push({
          asset: getAssetFromAddress(asset),
          debt: results[0].div("1000000000000000000").toString(),
          coll: ethers.utils.formatEther(results[1].toString()),
          pendingDebtTokenReward: results[2].toString(),
          pendingAssetReward: results[3].toString(),
        });
        processAsset(index + 1, balances); // Process the next asset.
      });
  } else {
    State.update({ balances: balances, stopReload: true });
  }
};

const getEntireDebtAndColl = () => {
  let balances = [...state.balances];

  const stabilityPoolContract = new ethers.Contract(
    stabilityPoolAddress,
    stabilityPoolAbi.body,
    Ethers.provider().getSigner()
  );
  stabilityPoolContract
    .getCompoundedDebtTokenDeposits(state.sender)
    .then((results) => {
      console.log(results);
      State.update({
        stabilityBalances: results.div("1000000000000000000").toString(),
      });
    })
    .then(() => {
      processAsset(0, balances); // Start the chain with the first asset.
    });
};

const renderConfirmationUI = (props) => {
  if (props.action === "display") {
    getEntireDebtAndColl();
  } else {
    return (
      <div>
        <h5>Transaction Details</h5>
        {Object.entries(props)
          .filter(
            ([key, value]) => typeof value !== "function" && key !== "text"
          )
          .map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value.toString()}
            </div>
          ))}
      </div>
    );
  }
};

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

const confirmAction = () => {
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
  } else if (props.action === "deposit") {
    addColl();
  } else if (props.action === "close") {
    closeVessel();
  } else if (props.action === "claim") {
    claimCollateral();
  } else if (props.action === "provide") {
    provideToSP();
  } else if (props.action === "remove") {
    withdrawFromSP();
  } else {
    props.resendPrompt(props);
  }
};

let confirmUI = renderConfirmationUI(props);

return (
  <div>
    {!state.success ? confirmUI : <p>Transaction complete</p>}

    {state.tx && !state.success ? (
      <div>
        <p>
          View your transaction:{" "}
          <a
            href={"https://goerli.etherscan.io/tx/" + state.tx}
            target="_blank"
          >
            {state.tx}
          </a>
        </p>
      </div>
    ) : (
      <div></div>
    )}

    <BalanceContainer>
      {state.balances.map((balance) => {
        return (
          <Balance>
            <p>Debt: {balance.debt} SUS</p>
            <p>
              Collateral: {balance.coll} {balance.asset}
            </p>
            <p>Pending Asset Reward: {balance.pendingAssetReward} ETH</p>
            <p>Pending SUS Debt Reward: {balance.pendingDebtTokenReward} SUS</p>
          </Balance>
        );
      })}
    </BalanceContainer>

    {state.stabilityBalances !== 0 ? (
      <div>
        <p>Stability Pool: {state.stabilityBalances} SUS</p>
      </div>
    ) : null}

    {props.action !== "display" && !state.success ? (
      <Button onClick={() => confirmAction()}>Confirm Action</Button>
    ) : null}
  </div>
);
