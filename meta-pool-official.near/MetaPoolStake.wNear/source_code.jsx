const accountId = context.accountId;
const authorId = "meta-pool-official.near";
const tokenDecimals = 18;
const wNearContractId = "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d";
const stNearContractId = "0x07F9F7f963C5cD2BBFFd30CcfB964Be114332E30";

State.init({
  openModal: false,
  validation: "",
  nearUsdPrice: null,
  nearUsdPriceIsFetched: false,
  metrics: null,
  metricsIsFetched: false,
  wNearBalance: null,
  wNearBalanceIsFetched: false,
  stNearBalance: null,
  stNearBalanceIsFetched: false,
  dataIntervalStarted: false,
  token: "wnear", // "near" | "wnear"
  action: "stake", // "
});

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
if (state.chainId !== undefined && state.chainId !== 1313161554) {
  return <p>Switch to Aurora</p>;
}

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const iface = new ethers.utils.Interface(abi);

const fetchMetrics = () => {
  asyncFetch("https://validators.narwallets.com/metrics_json").then((resp) => {
    if (resp) {
      console.log("@metrics", resp?.body);
      State.update({ metrics: resp?.body ?? "...", metricsIsFetched: true });
    }
  });
};

const fetchNearPrice = () => {
  asyncFetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd"
  ).then((resp) => {
    const nearUsdPrice = resp?.body?.near.usd;
    if (nearUsdPrice && !isNaN(nearUsdPrice)) {
      console.log("@nearPrice", nearUsdPrice);
      State.update({
        nearUsdPrice: Number(nearUsdPrice),
        nearUsdPriceIsFetched: true,
      });
    }
  });
};

const getStNearBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: stNearContractId,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      const balance = Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      State.update({
        stNearBalance: balance,
        stNearBalanceIsFetched: true,
      });
    });
};

const wNearBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: wNearContractId,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      const balance = Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      State.update({
        wNearBalance: balance,
        wNearBalanceIsFetched: true,
      });
    });
};

const update = (state) => State.update({ state });

const onSubmitStake = () => {
  // todo
};

const onSubmitFastUnstake = () => {
  // todo
};

const handleInputNear = (value) => {
  if (
    (parseFloat(value) < 1 && parseFloat(value) > 0) ||
    parseFloat(value) < 0
  ) {
    State.update({
      validation: "The minimum amount is 1 wNEAR.",
    });
  } else if (parseFloat(value) > parseFloat(state.wNearBalance)) {
    State.update({
      validation: "You don't have enough wNEAR.",
    });
  } else {
    State.update({
      validation: "",
    });
  }
  State.update({ value });
};

const handleInputStNear = (value) => {
  if (
    (parseFloat(value) < 1 && parseFloat(value) > 0) ||
    parseFloat(value) < 0
  ) {
    State.update({
      validation: "The minimum amount is 1 stNEAR.",
    });
  } else if (parseFloat(value) > parseFloat(state.stNearBalance)) {
    State.update({
      validation: "You don't have enough stNEAR.",
    });
  } else {
    State.update({
      validation: "",
    });
  }
  State.update({ value });
};

const getUserAddress = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 8) +
        "..." +
        state.sender.substring(state.sender.length - 6, state.sender.length);
};

const onClickMaxNear = () => {
  const value =
    state.wNearBalance > 0.1
      ? (parseFloat(state.wNearBalance) - 0.1).toFixed(2)
      : "0";
  handleInputNear(value);
};

const onClickMaxStNear = () => {
  const value =
    state.stNearBalance > 0.1
      ? (parseFloat(state.stNearBalance) - 0.1).toFixed(2)
      : "0";
  handleInputStNear(value);
};

// UPDATE DATA

const updateData = () => {
  fetchNearPrice();
  fetchMetrics();
  wNearBalance();
  stNearBalance();
};

if (!state.dataIntervalStarted) {
  State.update({ dataIntervalStarted: true });

  setInterval(() => {
    updateData();
  }, 10000);
}

// parametrize props
const allProps = {
  stake: {
    tokenInputBalance: state.wNearBalance,
    tokenInput: "wNEAR",
    tokenOutputBalance: state.stNearBalance,
    tokenOutput: "stNEAR",
    tokenInputUsd: state.nearUsdPrice,
    tokenOutputUsd: state.metrics?.st_near_price_usd,
    apy: state.metrics?.st_near_30_day_apy,
    inputPlaceholder: "Enter wNEAR amount",
    buttonText: "Stake now",
    handleInput: handleInputNear,
    tokenInputIconUrl:
      "https://ipfs.near.social/ipfs/bafkreid5xjykpqdvinmj432ldrkbjisrp3m4n25n4xefd32eml674ypqly",
    tokenOutputIconUrl:
      "https://ipfs.near.social/ipfs/bafkreigblrju2jzbkezxstqomekvlswl6ksqz56rohwzyoymrfzise7fdq",
    onClickMax: onClickMaxNear,
    onSubmit: onSubmitStake,
    stakeInfoLeftText: "Available to Unstake",
    stakeInforRightText: "NEAR available amount",
  },
  fast: {
    tokenInputBalance: state.stNearBalance,
    tokenInput: "stNEAR",
    tokenOutputBalance: state.wNearBalance,
    tokenOutput: "NEAR",
    tokenInputUsd: state.metrics?.st_near_price_usd,
    tokenOutputUsd: state.nearUsdPrice,
    apy: state.metrics?.st_near_30_day_apy,
    inputPlaceholder: "Enter stNEAR amount",
    buttonText: "Unstake",
    handleInput: handleInputStNear,
    tokenOutputIconUrl:
      "https://ipfs.near.social/ipfs/bafkreid5xjykpqdvinmj432ldrkbjisrp3m4n25n4xefd32eml674ypqly",
    tokenInputIconUrl:
      "https://ipfs.near.social/ipfs/bafkreigblrju2jzbkezxstqomekvlswl6ksqz56rohwzyoymrfzise7fdq",
    onClickMax: onClickMaxStNear,
    onSubmit: onSubmitFastUnstake,
    stakeInfoLeftText: "Available to Unstake",
    stakeInforRightText: "NEAR available amount",
  },
}[state.action];

// if (
//   !state.metricsIsFetched ||
//   !state.nearUsdPriceIsFetched ||
//   !state.wNearBalanceIsFetched ||
//   !state.stNearBalanceIsFetched
// )
//   return "Loading..";

return (
  <Widget
    src={`${authorId}/widget/MetaPoolStake.Container`}
    props={{
      update,
      token: state.token,
      action: state.action,
      getUserAddress,
      children: (
        <Widget
          src={`${authorId}/widget/MetaPoolStake.wNear.Form`}
          props={{ ...allProps, update, state, isSignedIn }}
        />
      ),
    }}
  />
);
