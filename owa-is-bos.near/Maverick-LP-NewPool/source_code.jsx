const routerAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/maverick-router.txt"
);

const positionAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/maverick-position.txt"
);

if (!routerAbi.ok) {
  return "Loading";
}
const tokensForNEtwork = fetch("https://api.mav.xyz/api/v3/allTokens/5").body
  .tokens;

const POOLSMODE = [
  {
    id: 0,
    name: "Mode Static",
    description:
      "This mode features static bins that you can use to define your own custom liquidity strategy.",
    img: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ModeStatic.gif",
  },
  {
    id: 1,
    name: "Mode Right",
    description:
      "This mode functions like a dynamic range order that follows the price of USDC up.",
    img: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ModeRight.gif",
  },
  {
    id: 2,
    name: "Mode Left",
    description:
      "This mode functions like a dynamic range order that follows the price of cBUSD up.",
    img: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ModeLeft.gif",
  },
  {
    id: 3,
    name: "Mode Both",
    description:
      "This mode functions like a dynamic range order that follows the pool price right and left, keeping liquidity as active as possible.",
    img: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ModeBoth.gif",
  },
];

const DISTRIBUTIONMODE = [
  {
    name: "Exponential",
    description:
      "This distribution starts with a high concentration of liquidity around the current pool price and adds exponentially decreasing amounts across the bins to the left and right.",
  },
  {
    name: "Flat",
    description:
      "This will distribute your liquidity evenly across bins, centered around the current pool price.",
  },
  {
    name: "Single Bin",
    description: "This will distribute your liquidity only in the active bin",
  },
];

State.init({
  isZkSync: false,
  routerContract: "0x9563Fdb01BFbF3D6c548C2C64E446cb5900ACA88",
  positionContract: "0x46040d596fe176A1b88A43be3537d9f6365ccbe1",
  step: 1,
  step1TokenAAmount: 0,
  refStep1Amount: null,
  newTokenASelected: tokensForNEtwork.find(
    (option) => option.name === tokensForNEtwork[0].name
  ),
  newTokenBSelected: tokensForNEtwork.find(
    (option) => option.name === tokensForNEtwork[1].name
  ),
  tokenOptionsA: tokensForNEtwork.filter(
    (option) => option.name != tokensForNEtwork[1].name
  ),
  tokenOptionsB: tokensForNEtwork.filter(
    (option) => option.name != tokensForNEtwork[0].name
  ),
  tokensForNetwork: tokensForNEtwork,
  poolSelected: POOLS[0],
  poolModeSelected: POOLSMODE[0],
  poolDistributionSelected: DISTRIBUTIONMODE[0],
  amountInputTokenA: null,
  inputBalanceTokenA: null,
  amountInputTokenB: null,
  inputBalanceTokenB: null,
  fee: 0,
  width: 0,
  showSelectOptionsModal: false,
  show: false,
  need2Tokens: true,
});

const getUserBalances = () => {
  const accounts = Ethers.send("eth_requestAccounts", []);
  asyncFetch(`https://api.mav.xyz/api/v3/tokenBalances/5/${accounts[0]}`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      State.update({ userBalances: res.body.tokenBalances });
    });
};

const getApprovedNFT = () => {
  const position = new ethers.Contract(
    state.positionContract,
    positionAbi.body,
    Ethers.provider().getSigner()
  );

  try {
    position.getApproved(state.poolSelected.nftId).then((res) => {
      console.log("approvedNFT: " + parseInt(res, 16));
      State.update({ approveNFT: parseInt(res, 16) });
    });
  } catch (err) {
    console.log(err);
  }
};

const getNFTUser = () => {
  const accounts = Ethers.send("eth_requestAccounts", []);
  asyncFetch(`https://api.mav.xyz/api/v3/user/${accounts[0]}/5`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      if (res.body.user.positions.length > 0) {
        State.update({ userNFT: res.body.user.positions[0].nftId });
        console.log("nft", res.body.user.positions[0].nftId);
      }
    });
};

const handleTokenSelect = (token, _sel) => {
  const _tokenin = tokensForNEtwork.find((p) => p.name === token.target.value);
  const filteredOptions = tokensForNEtwork.filter(
    (option) => option.name !== token.target.value
  );
  _sel === "A"
    ? State.update({
        newTokenASelected: _tokenin,
        tokenOptionsB: filteredOptions,
      })
    : State.update({
        newTokenBSelected: _tokenin,
        tokenOptionsA: filteredOptions,
      });
};

const handlePoolModeSelect = (data) => {
  const mode = POOLSMODE.find((m) => m.name === data.target.value);
  State.update({ poolModeSelected: mode });
};

const handlePoolDistributionSelect = (data) => {
  const mode = DISTRIBUTIONMODE.find((m) => m.name === data.target.value);
  State.update({ poolDistributionSelected: mode });
};

const getNetwork = () => {
  let chainId = 5;
  Ethers.provider()
    .getNetwork()
    .then((res) => {
      if (res.chainId == chainId) {
        State.update({ isZkSync: true });
      } else {
        switchNetwork(5);
      }
    });
};

const switchNetwork = (chainId) => {
  Ethers.provider().send("wallet_switchEthereumChain", [
    { chainId: `0x${chainId.toString(16)}` },
  ]);
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    getNetwork();
    getNFTUser();
    getApprovedNFT();
    state.userBalances ? "" : getUserBalances();
  }
}

const next = () => {
  console.log("state", state);
  if (
    (state.step === 1 && state.step1TokenAAmount <= 0) ||
    state.fee === 0 ||
    state.width === 0
  ) {
    return;
  } else {
    if (state.step + 1 == 2) {
      setUserBalances();
    } else if (state.step + 1 == 3) {
      if (!(state.tokenAAllowance || state.tokenBAllowance)) {
        getAccountAllowance({
          token: state.newTokenASelected,
          vAllowance: false,
          mode: "TA",
        });
        getAccountAllowance({
          token: state.newTokenBSelected,
          vAllowance: false,
          mode: "TB",
        });
      }
    }
    State.update({ step: state.step + 1 });
  }
};

const back = () => {
  State.update({ step: state.step - 1 });
};

const formatNumber = (n) => {
  if (n >= 1000000) {
    return "$" + (n / 1000000).toFixed(2) + "m";
  } else if (n >= 1000) {
    return "$" + (n / 1000).toFixed(2) + "k";
  } else {
    return "$" + n.toFixed(2);
  }
};

const setUserBalances = () => {
  console.log("entra a set de balances");
  const tokABalance = state.userBalances.find(
    (token) => token.symbol == state.newTokenASelected.symbol
  );
  const tokBBalance = state.userBalances.find(
    (token) => token.symbol == state.newTokenBSelected.symbol
  );
  console.log("balance a ", tokABalance);
  console.log("balance b ", tokBBalance);
  tokABalance
    ? State.update({
        tokenABalance: {
          fixed: (
            parseFloat(tokABalance.tokenBalance).toFixed(6) - 0.000001
          ).toString(),
          unfixed: tokABalance.tokenBalanceBN,
        },
      })
    : State.update({ tokABalance: undefined });
  tokBBalance
    ? State.update({
        tokenBBalance: {
          fixed: (
            parseFloat(tokBBalance.tokenBalance).toFixed(6) - 0.000001
          ).toString(),
          unfixed: tokBBalance.tokenBalanceBN,
        },
      })
    : State.update({ tokBBalance: undefined });
};

const setMaxBalanceTokenA = () => {
  if (state.tokenABalance.fixed > 0) {
    State.update({ amountInputTokenA: state.tokenABalance.fixed });
  }
};

const setMaxBalanceTokenB = () => {
  if (state.tokenBBalance.fixed > 0) {
    State.update({ amountInputTokenB: state.tokenBBalance.fixed });
  }
};

const validateAllowance = (input, mode) => {
  let divider, tokenAllowance;
  if (mode == "TA") {
    divider =
      state.newTokenASelected.decimals == 18 ? 1000000000000000000 : 1000000;
    tokenAllowance = state.tokenAAllowance / divider;
    input * 1 > tokenAllowance
      ? State.update({ moreTokenAAllowance: true })
      : State.update({ moreTokenAAllowance: false });
  } else {
    divider =
      state.newTokenBSelected.decimals == 18 ? 1000000000000000000 : 1000000;
    tokenAllowance = state.tokenBAllowance / divider;
    input * 1 > tokenAllowance
      ? State.update({ moreTokenBAllowance: true })
      : State.update({ moreTokenBAllowance: false });
  }
};

const handleInputTokenA = (input) => {
  console.log("entra handle input A", state.poolModeSelected.id);
  if (state.poolModeSelected.id == 0 || state.poolModeSelected.id == 3) {
    const step1TokenAAmount = parseFloat(state.step1TokenAAmount);
    const width = state.width / 100;
    const tickSpacing = Math.ceil(Math.log(1 + width) / Math.log(1.0001));
    const ic = Math.floor(
      Math.log(step1TokenAAmount) / (Math.log(1.0001) * tickSpacing)
    );
    const il = Math.pow(1.0001, ic * tickSpacing);
    const iu = Math.pow(1.0001, (ic + 1) * tickSpacing);

    let deltaX = 0;
    let deltaY = 0;
    let deltaL = 1;

    if (step1TokenAAmount < il) {
      deltaX = deltaL * (1 / Math.sqrt(il) - 1 / Math.sqrt(iu));
      deltaY = 0;
    }
    if (il <= step1TokenAAmount && step1TokenAAmount < iu) {
      deltaX = deltaL * (1 / Math.sqrt(step1TokenAAmount) - 1 / Math.sqrt(iu));
      deltaY = deltaL * (Math.sqrt(step1TokenAAmount) - Math.sqrt(il));
    }
    if (step1TokenAAmount >= iu) {
      deltaX = 0;
      deltaY = Math.sqrt(iu) - Math.sqrt(il);
    }

    let tokenB = 0;
    if (ic !== 0) {
      tokenB = input * (deltaX / deltaY);
      State.update({
        amountInputTokenB: tokenB,
        amountInputTokenA: input,
        validation: undefined,
      });
    } else {
      State.update({
        amountInputTokenA: 0,
        validation: undefined,
        need2Tokens: false,
      });
    }
  }
};

const handleInputTokenB = (input) => {
  console.log("entra handle input B", state.poolModeSelected.id);
  if (state.poolModeSelected.id == 0 || state.poolModeSelected.id == 3) {
    const step1TokenAAmount = parseFloat(state.step1TokenAAmount);
    const width = state.width / 100;
    const tickSpacing = Math.ceil(Math.log(1 + width) / Math.log(1.0001));
    const ic = Math.floor(
      Math.log(step1TokenAAmount) / (Math.log(1.0001) * tickSpacing)
    );
    const il = Math.pow(1.0001, ic * tickSpacing);
    const iu = Math.pow(1.0001, (ic + 1) * tickSpacing);

    let deltaX = 0;
    let deltaY = 0;
    let deltaL = 1;

    if (step1TokenAAmount < il) {
      deltaX = deltaL * (1 / Math.sqrt(il) - 1 / Math.sqrt(iu));
      deltaY = 0;
    }
    if (il <= step1TokenAAmount && step1TokenAAmount < iu) {
      deltaX = deltaL * (1 / Math.sqrt(step1TokenAAmount) - 1 / Math.sqrt(iu));
      deltaY = deltaL * (Math.sqrt(step1TokenAAmount) - Math.sqrt(il));
    }
    if (step1TokenAAmount >= iu) {
      deltaX = 0;
      deltaY = Math.sqrt(iu) - Math.sqrt(il);
    }

    let tokenA = 0;
    if (ic !== 0) {
      tokenA = (input / deltaX) * deltaY;
      State.update({
        amountInputTokenA: tokenA,
        amountInputTokenB: input,
        validation: undefined,
      });
    } else {
      State.update({
        amountInputTokenA: 0,
        need2Tokens: false,
        amountInputTokenB: input,
        validation: undefined,
      });
    }
  }
};

const validateConfirm = () => {
  if (state.poolModeSelected.id == 0 || state.poolModeSelected.id == 3) {
    validateAllowance(state.amountInputTokenA, "TA");
    validateAllowance(state.amountInputTokenB, "TB");
    State.update({ validation: true });
  } else if (state.poolModeSelected.id == 1) {
    validateAllowance(state.amountInputTokenA, "TA");
    State.update({ validation: true });
  } else if (state.poolModeSelected.id == 2) {
    validateAllowance(state.amountInputTokenB, "TB");
    State.update({ validation: true });
  }
};

const approveErc20Token = (mode) => {
  asyncFetch(
    "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
  ).then((res) => {
    let value, token;
    if (mode == "TA") {
      value = state.tokenABalance.unfixed;
      token = state.newTokenASelected;
    } else {
      value = state.tokenBBalance.unfixed;
      token = state.newTokenBSelected;
    }
    const approveContract = new ethers.Contract(
      token.address,
      res.body,
      Ethers.provider().getSigner()
    );

    if (gweiPrice !== undefined && gasLimit !== undefined) {
      gasArgs.gasPrice = ethers.utils.parseUnits(gweiPrice ?? "0.26", "gwei");
      gasArgs.gasLimit = gasLimit ?? 20000000;
    }

    approveContract
      .approve(state.routerContract, value)
      .then((transactionHash) => {
        State.update({ onApprovingToken: true });
        setTimeout(() => {
          getAccountAllowance({
            token:
              mode == "TA" ? state.newTokenASelected : state.newTokenBSelected,
            vAllowance: false,
            mode: mode,
          });
          State.update({ onApprovingToken: false, validation: undefined });
        }, 20000);
      });
  });
};

const getAccountAllowance = (data) => {
  console.log(data);
  let token = data.token;
  if (token.symbol == "ETH") {
    if (data.mode == "TA") {
      State.update({ tokenAAllowance: undefined });
    } else {
      State.update({ tokenBAllowance: undefined });
    }
  } else {
    asyncFetch(
      "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
    ).then((res) => {
      const approveContract = new ethers.Contract(
        token.address,
        res.body,
        Ethers.provider().getSigner()
      );
      approveContract
        .allowance(state.sender, state.routerContract)
        .then((res) => {
          if (data.mode == "TA") {
            State.update({ tokenAAllowance: parseInt(res.toString()) });
          } else {
            State.update({ tokenBAllowance: parseInt(res.toString()) });
          }
          console.log(
            "actual allowance " + data.mode + ": " + parseInt(res.toString())
          );
        });
    });
  }
};

const confirm = () => {
  if (state.amountInputTokenA <= 0 || state.amountInputTokenB <= 0) {
    state.width === 0;
    return;
  } else {
  }
};
// modal

const formatNumberFee = (n) => {
  if (n > 0.01) {
    return n.toFixed(2) + " %";
  }
  return n.toFixed(3) + " %";
};

const formatNumberWidth = (n) => {
  if (n < 0.1) {
    return n.toFixed(2) + " %";
  }
  if (n < 1) {
    return n.toFixed(1) + " %";
  }
  return n + " %";
};

const showPoolOptionsModal = () => {
  State.update({ showSelectOptionsModal: true });
};

const closeModal = () => {
  State.update({ showSelectOptionsModal: false });
};

const setFeeWidth = (fee, width) => {
  State.update({
    fee: fee,
    width: width,
    showSelectOptionsModal: false,
  });
};

const floatToFixed = (num, decimals) => {
  decimals ? decimals : 18;
  return ethers.BigNumber.from(
    ethers.utils.parseUnits(num.toString(), decimals)
  );
};
