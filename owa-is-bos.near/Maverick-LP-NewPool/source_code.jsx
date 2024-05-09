const routerAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/maverick-router.txt"
);

const positionAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/maverick-position.txt"
);

/* TODO troubles loading initial data, modified to show loading text while fetch data */
const tokensFetch = fetch("https://api.mav.xyz/api/v4/allTokens/324"),
  tokensForNEtwork = tokensFetch.body.tokens;

if (!routerAbi.ok || !tokensFetch.ok) {
  const Wrapper = styled.div`
    width: 490px;
    height: 500px;
    display: grid;
    place-items: center;
    border-radius: 14px;
    background: #151718;
    margin-inline: auto;
    
    font-family: BaselGrotesk, Arial, sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    color: white;
  `;

  return <Wrapper className="mt-1">Loading data...</Wrapper>;
}

//Podemos eliminar WETH del listado para quitar confusiones
//   const tokensForNEtwork = fetch(
//     "https://api.mav.xyz/api/v3/allTokens/324"
//   ).body.tokens.filter((token) => token.symbol != "ETH");

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
    name: "Single Bin",
    description: "This will distribute your liquidity only in the active bin",
  },
  {
    name: "Flat",
    description:
      "This will distribute your liquidity evenly across bins, centered around the current pool price.",
  },
  {
    name: "Exponential",
    description:
      "This distribution starts with a high concentration of liquidity around the current pool price and adds exponentially decreasing amounts across the bins to the left and right.",
  },
];

State.init({
  isZkSync: false,
  routerContract: "0x39E098A153Ad69834a9Dac32f0FCa92066aD03f4",
  positionContract: "0xFd54762D435A490405DDa0fBc92b7168934e8525",
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
  binsToDistribute: 3,
  need2Tokens: true,
  onlyRight: false,
});

const getUserBalances = () => {
  const accounts = Ethers.send("eth_requestAccounts", []);
  asyncFetch(`https://api.mav.xyz/api/v4/tokenBalances/324/${accounts[0]}`)
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
      State.update({ approveNFT: parseInt(res, 16) });
    });
  } catch (err) {
    console.log(err);
  }
};

const getNFTUser = () => {
  const accounts = Ethers.send("eth_requestAccounts", []);
  asyncFetch(`https://api.mav.xyz/api/v4/user/${accounts[0]}/324`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      if (res.body.user.positions.length > 0) {
        State.update({ userNFT: res.body.user.positions[0].nftId });
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
  let chainId = 324;
  Ethers.provider()
    .getNetwork()
    .then((res) => {
      if (res.chainId == chainId) {
        State.update({ isZkSync: true });
      } else {
        switchNetwork(324);
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
  State.update({
    step: state.step - 1,
    amountInputTokenA: null,
    amountInputTokenB: null,
    onlyRight: false,
    noBalanceA: false,
    noBalanceB: false,
  });

  if (state.validation) {
    State.update({ validation: undefined });
  }
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
  const tokA = state.newTokenASelected.symbol;
  const tokB = state.newTokenBSelected.symbol;
  const tokABalance = state.userBalances.find((token) => token.symbol == tokA);
  const tokBBalance = state.userBalances.find((token) => token.symbol == tokB);
  tokABalance
    ? State.update({
        tokenABalance: {
          fixed: (parseFloat(tokABalance.tokenBalance) - 0.000001)
            .toFixed(8)
            .toString(),
          unfixed: tokABalance.tokenBalanceBN,
        },
      })
    : State.update({ tokABalance: undefined });
  tokBBalance
    ? State.update({
        tokenBBalance: {
          fixed: (parseFloat(tokBBalance.tokenBalance) - 0.000001)
            .toFixed(8)
            .toString(),
          unfixed: tokBBalance.tokenBalanceBN,
        },
      })
    : State.update({ tokBBalance: undefined });
};

const setMaxBalanceTokenA = () => {
  if (state.tokenABalance.fixed > 0) {
    handleInputTokenA(state.tokenABalance.fixed);
  }
};

const setMaxBalanceTokenB = () => {
  if (state.tokenBBalance.fixed > 0) {
    handleInputTokenB(state.tokenBBalance.fixed);
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

const changeBinsToDistribute = (nb) => {
  State.update({
    binsToDistribute: nb,
    validation: false,
    amountInputTokenB: 0,
    amountInputTokenA: 0,
  });
};

const generateExponentialLambdas = (numPositions) => {
  const lambdas = [0.1];
  for (let i = 1; i < numPositions; i++) {
    const lambda = 0.1 + i / 2;
    lambdas.push(lambda);
  }
  return lambdas;
};

const generateExponentialDistribution = (total, lambdas) => {
  const sumExp = lambdas.reduce((acc, lambda) => acc + Math.exp(lambda), 0);
  const result = lambdas.map((lambda) => (total / sumExp) * Math.exp(lambda));
  return result;
};

const handleInputTokenA = (input) => {
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
        amountInputTokenB:
          deltaY == 0
            ? 0
            : tokenB.toFixed(
                state.newTokenBSelected.decimals == 18
                  ? 11
                  : state.newTokenBSelected.decimals
              ),
        amountInputTokenA: input,
        validation: undefined,
        onlyRight: false,
        noBalanceA:
          parseFloat(state.tokenABalance.fixed) < parseFloat(input)
            ? true
            : false,
        noBalanceB:
          parseFloat(state.tokenBBalance.fixed) < tokenB ? true : false,
      });
    } else {
      if (state.poolDistributionSelected.name == "Flat") {
        const binsL = Math.floor(state.binsToDistribute / 2);
        const binsR = Math.ceil(state.binsToDistribute / 2);
        tokenB = (input / binsL) * binsR;
        State.update({
          amountInputTokenB: tokenB.toFixed(
            state.newTokenBSelected.decimals == 18
              ? 11
              : state.newTokenBSelected.decimals
          ),
          amountInputTokenA: input,
          validation: undefined,
          onlyRight: true,
          noBalanceA:
            parseFloat(state.tokenABalance.fixed) < parseFloat(input)
              ? true
              : false,
          noBalanceB:
            parseFloat(state.tokenBBalance.fixed) < tokenB ? true : false,
        });
      }
      if (state.poolDistributionSelected.name == "Exponential") {
        const binsL = Math.floor(state.binsToDistribute / 2);

        const lambdas = [0.1];
        for (let i = 1; i < binsL; i++) {
          const lambda = 0.1 + i / 2;
          lambdas.push(lambda);
        }

        const sumExp = lambdas.reduce(
          (acc, lambda) => acc + Math.exp(lambda),
          0
        );

        const nextLambda =
          lambdas.length > 0 ? lambdas[lambdas.length - 1] + 0.5 : 0.1;
        const nextValue = (input / sumExp) * Math.exp(nextLambda);

        let amountExpA = lambdas
          .map((lambda) => (input / sumExp) * Math.exp(lambda))
          .reverse();

        amountExpA.reverse().push(nextValue);
        amountExpA.reverse();

        let amountExpB = [].concat(amountExpA.reverse());
        tokenB = amountExpB.reduce((a, b) => a + b, 0);

        State.update({
          amountInputTokenA: input,
          amountInputTokenB: tokenB.toFixed(
            state.newTokenBSelected.decimals == 18
              ? 11
              : state.newTokenBSelected.decimals
          ),
          onlyRight: true,
          noBalanceA:
            parseFloat(state.tokenABalance.fixed) < parseFloat(input)
              ? true
              : false,
          noBalanceB:
            parseFloat(state.tokenBBalance.fixed) < tokenB ? true : false,
        });
      }
      if (state.poolDistributionSelected.name == "Single Bin") {
        State.update({
          amountInputTokenA: 0,
          validation: undefined,
          need2Tokens: false,
        });
      }
    }
  } else {
    State.update({
      amountInputTokenA: input,
      noBalanceA:
        parseFloat(state.tokenABalance.fixed) < parseFloat(input)
          ? true
          : false,
    });
  }
};

const handleInputTokenB = (input) => {
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
        amountInputTokenA:
          deltaY == 0
            ? 0
            : tokenA.toFixed(
                state.newTokenASelected.decimals == 18
                  ? 11
                  : state.newTokenASelected.decimals
              ),
        amountInputTokenB: input,
        validation: undefined,
        onlyRight: false,
        noBalanceA:
          parseFloat(state.tokenABalance.fixed) < tokenA ? true : false,
        noBalanceB:
          parseFloat(state.tokenBBalance.fixed) < parseFloat(input)
            ? true
            : false,
      });
    } else {
      if (state.poolDistributionSelected.name == "Flat") {
        const binsL = Math.floor(state.binsToDistribute / 2);
        const binsR = Math.ceil(state.binsToDistribute / 2);
        tokenA = (input / binsR) * binsL;
        State.update({
          amountInputTokenB: input,
          amountInputTokenA: tokenA.toFixed(
            state.newTokenASelected.decimals == 18
              ? 11
              : state.newTokenASelected.decimals
          ),
          validation: undefined,
          onlyRight: true,
          noBalanceA:
            parseFloat(state.tokenABalance.fixed) < tokenA ? true : false,
          noBalanceB:
            parseFloat(state.tokenBBalance.fixed) < parseFloat(input)
              ? true
              : false,
        });
      }
      if (state.poolDistributionSelected.name == "Exponential") {
        const binsR = Math.ceil(state.binsToDistribute / 2);

        const lambdas = [0.1];
        for (let i = 1; i < binsR; i++) {
          const lambda = 0.1 + i / 2;
          lambdas.push(lambda);
        }

        const sumExp = lambdas.reduce(
          (acc, lambda) => acc + Math.exp(lambda),
          0
        );

        const amountExpB = lambdas
          .map((lambda) => (input / sumExp) * Math.exp(lambda))
          .reverse();

        let amountExpA = [].concat(amountExpB.reverse());
        amountExpA.pop();
        tokenA = amountExpA.reduce((a, b) => a + b, 0);

        State.update({
          amountInputTokenB: input,
          amountInputTokenA: tokenA.toFixed(
            state.newTokenASelected.decimals == 18
              ? 11
              : state.newTokenASelected.decimals
          ),
          onlyRight: true,
          noBalanceA:
            parseFloat(state.tokenABalance.fixed) < tokenA ? true : false,
          noBalanceB:
            parseFloat(state.tokenBBalance.fixed) < parseFloat(input)
              ? true
              : false,
        });
      }
      if (state.poolDistributionSelected.name == "Single Bin") {
        State.update({
          amountInputTokenA: 0,
          need2Tokens: false,
          amountInputTokenB: input,
          validation: undefined,
          noBalanceB:
            parseFloat(state.tokenBBalance.fixed) < parseFloat(input)
              ? true
              : false,
        });
      }
    }
  } else {
    State.update({
      amountInputTokenB: input,
      noBalanceB:
        parseFloat(state.tokenBBalance.fixed) < parseFloat(input)
          ? true
          : false,
    });
  }
};

const validateConfirm = () => {
  let bins = state.binsToDistribute;
  if (bins % 2 !== 1) {
    bins++;
    State.update({ binsToDistribute: bins });
  }

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

const getTokenARatio1 = () => {};

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
  let token = data.token;
  if (token.symbol == "ETH") {
    data.mode == "TA"
      ? State.update({ tokenAAllowance: undefined })
      : State.update({ tokenBAllowance: undefined });
  } else {
    asyncFetch(
      "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
    ).then((res) => {
      const contract = token.address;
      const approveContract = new ethers.Contract(
        contract,
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

const createPool = () => {
  const router = new ethers.Contract(
    state.routerContract,
    routerAbi.body,
    Ethers.provider().getSigner()
  );

  let amountInA, amountInB;
  let inputA = state.amountInputTokenA;
  let inputB = state.amountInputTokenB;
  let usingETH =
    state.newTokenASelected.symbol == "ETH" ||
    state.newTokenBSelected.symbol == "ETH";
  let tokUsedETH = state.newTokenASelected.symbol == "ETH" ? "tokA" : "tokB";
  if (state.poolModeSelected.id == 0) {
    if (state.poolDistributionSelected.name == "Single Bin") {
      amountInA = ethers.utils.parseUnits(
        inputA,
        state.newTokenASelected.decimals
      );
      amountInB = ethers.utils.parseUnits(
        inputB,
        state.newTokenBSelected.decimals
      );
    } else {
      amountInA = ethers.utils.parseUnits(
        inputA,
        state.newTokenASelected.decimals
      );
      amountInB = ethers.utils.parseUnits(
        inputB,
        state.newTokenBSelected.decimals
      );
    }
  } else if (state.poolModeSelected.id == 3) {
    amountInA = ethers.utils.parseUnits(
      inputA,
      state.newTokenASelected.decimals
    );
    amountInB = ethers.utils.parseUnits(
      inputB,
      state.newTokenBSelected.decimals
    );
  } else if (state.poolModeSelected.id == 1) {
    amountInA = ethers.utils.parseUnits(
      inputA,
      state.newTokenASelected.decimals
    );
    amountInB = ethers.utils.parseUnits("0", state.newTokenBSelected.decimals);
  } else if (state.poolModeSelected.id == 2) {
    amountInA = ethers.utils.parseUnits("0", state.newTokenASelected.decimals);
    amountInB = ethers.utils.parseUnits(
      inputB,
      state.newTokenBSelected.decimals
    );
  }

  const overrides = {
    value: usingETH
      ? tokUsedETH == "tokA"
        ? amountInA
        : amountInB
      : ethers.utils.parseUnits("0", 18),
    gasLimit: 3000000,
  };

  let tickSp = Math.ceil(Math.log(1 + state.width / 100) / Math.log(1.0001));
  let actTick = Math.floor(
    Math.log(parseInt(state.step1TokenAAmount)) / (Math.log(1.0001) * tickSp)
  );

  let liquidityParams = [];
  let position =
    state.poolModeSelected.id == 0 || state.poolModeSelected.id == 3
      ? actTick
      : state.poolModeSelected.id == 1
      ? actTick - 1
      : actTick + 1;
  if (
    state.poolModeSelected.id == 1 ||
    state.poolModeSelected.id == 2 ||
    state.poolModeSelected.id == 3
  ) {
    liquidityParams.push({
      kind: state.poolModeSelected.id,
      pos: position,
      isDelta: false,
      deltaA: amountInA,
      deltaB: amountInB,
    });
  } else {
    if (state.poolDistributionSelected.name == "Single Bin") {
      liquidityParams.push({
        kind: state.poolModeSelected.id,
        pos: position,
        isDelta: false,
        deltaA: amountInA,
        deltaB: amountInB,
      });
    }
    if (state.poolDistributionSelected.name == "Flat") {
      if (state.onlyRight) {
        const leftAmount = (
          parseFloat(state.amountInputTokenA) /
          Math.floor(state.binsToDistribute / 2)
        ).toString();

        const rightAmount = (
          parseFloat(state.amountInputTokenB) /
          Math.ceil(state.binsToDistribute / 2)
        ).toString();

        const amountInAFormated = ethers.utils.parseUnits(
          leftAmount,
          state.newTokenASelected.decimals
        );
        const amountInBFormated = ethers.utils.parseUnits(
          rightAmount,
          state.newTokenBSelected.decimals
        );

        for (let i = 0; i < state.binsToDistribute; i++) {
          const pos = position + i - Math.floor(state.binsToDistribute / 2);

          let newDeltaA = pos < position ? amountInAFormated : 0;
          let newDeltaB = pos >= position ? amountInBFormated : 0;

          const param = {
            kind: state.poolModeSelected.id,
            pos: pos,
            isDelta: false,
            deltaA: newDeltaA,
            deltaB: newDeltaB,
          };
          liquidityParams.push(param);
        }
      } else {
        const leftAmount = (
          (parseFloat(state.amountInputTokenA) - 0.001) /
          Math.ceil(state.binsToDistribute / 2)
        ).toString();

        const rightAmount = (
          (parseFloat(state.amountInputTokenB) - 0.001) /
          Math.ceil(state.binsToDistribute / 2)
        ).toString();

        const amountInAFormated = ethers.utils.parseUnits(
          leftAmount,
          state.newTokenASelected.decimals
        );
        const amountInBFormated = ethers.utils.parseUnits(
          rightAmount,
          state.newTokenBSelected.decimals
        );

        for (let i = 0; i < state.binsToDistribute; i++) {
          const pos = position + i - Math.floor(state.binsToDistribute / 2);

          let newDeltaA = pos <= position ? amountInAFormated : 0;
          let newDeltaB = pos >= position ? amountInBFormated : 0;

          const param = {
            kind: state.poolModeSelected.id,
            pos: pos,
            isDelta: false,
            deltaA: newDeltaA,
            deltaB: newDeltaB,
          };
          liquidityParams.push(param);
        }
      }
    }
    if (state.poolDistributionSelected.name == "Exponential") {
      if (state.onlyRight) {
        const binsL = Math.floor(state.binsToDistribute / 2);
        const binsR = Math.ceil(state.binsToDistribute / 2);

        const lambdasL = [0.1];
        const lambdasR = [0.1];
        for (let i = 1; i < binsL; i++) {
          const lambda = 0.1 + i / 2;
          lambdasL.push(lambda);
        }
        for (let i = 1; i < binsR; i++) {
          const lambda = 0.1 + i / 2;
          lambdasR.push(lambda);
        }

        const sumExpL = lambdasL.reduce(
          (acc, lambda) => acc + Math.exp(lambda),
          0
        );
        const sumExpR = lambdasR.reduce(
          (acc, lambda) => acc + Math.exp(lambda),
          0
        );

        let amountExpL = lambdasL
          .map(
            (lambda) => (state.amountInputTokenA / sumExpL) * Math.exp(lambda)
          )
          .reverse();
        amountExpL.unshift(0);
        amountExpL.reverse();

        const amountExpR = lambdasR
          .map(
            (lambda) => (state.amountInputTokenB / sumExpR) * Math.exp(lambda)
          )
          .reverse();

        for (let i = 0; i < state.binsToDistribute; i++) {
          const pos = position + i - Math.floor(state.binsToDistribute / 2);
          let newDeltaA =
            pos <= position
              ? ethers.utils.parseUnits(
                  amountExpL[i].toString(),
                  state.newTokenASelected.decimals
                )
              : 0;
          let newDeltaB =
            pos >= position
              ? ethers.utils.parseUnits(
                  amountExpR[
                    i -
                      Math.floor(
                        state.binsToDistribute /
                          state.newTokenBSelected.decimals
                      )
                  ].toString(),
                  18
                )
              : 0;

          const param = {
            kind: state.poolModeSelected.id,
            pos: pos,
            isDelta: false,
            deltaA: newDeltaA,
            deltaB: newDeltaB,
          };
          liquidityParams.push(param);
        }
      } else {
        const binsL = Math.ceil(state.binsToDistribute / 2);
        const binsR = Math.ceil(state.binsToDistribute / 2);

        const lambdasL = [0.1];
        const lambdasR = [0.1];
        for (let i = 1; i < binsL; i++) {
          const lambda = 0.1 + i / 2;
          lambdasL.push(lambda);
        }
        for (let i = 1; i < binsR; i++) {
          const lambda = 0.1 + i / 2;
          lambdasR.push(lambda);
        }

        const sumExpL = lambdasL.reduce(
          (acc, lambda) => acc + Math.exp(lambda),
          0
        );
        const sumExpR = lambdasR.reduce(
          (acc, lambda) => acc + Math.exp(lambda),
          0
        );

        let amountExpL = lambdasL
          .map(
            (lambda) => (state.amountInputTokenA / sumExpL) * Math.exp(lambda)
          )
          .reverse();
        amountExpL.reverse();

        const amountExpR = lambdasR
          .map(
            (lambda) => (state.amountInputTokenB / sumExpR) * Math.exp(lambda)
          )
          .reverse();

        for (let i = 0; i < state.binsToDistribute; i++) {
          const pos = position + i - Math.floor(state.binsToDistribute / 2);
          let newDeltaA =
            pos <= position
              ? ethers.utils.parseUnits(
                  amountExpL[i].toString(),
                  state.newTokenASelected.decimals
                )
              : 0;
          let newDeltaB =
            pos >= position
              ? ethers.utils.parseUnits(
                  amountExpR[
                    i - Math.floor(state.binsToDistribute / 2)
                  ].toString(),
                  state.newTokenBSelected.decimals
                )
              : 0;

          const param = {
            kind: state.poolModeSelected.id,
            pos: pos,
            isDelta: false,
            deltaA: newDeltaA,
            deltaB: newDeltaB,
          };
          liquidityParams.push(param);
        }
      }
    }
  }

  const poolParams = {
    fee: floatToFixed(state.fee / 100),
    tickSpacing: tickSp,
    lookback: "0x0249781bbb25cac00000",
    activeTick: actTick,
    tokenA: state.newTokenASelected.address,
    tokenB: state.newTokenBSelected.address,
  };
  try {
    router
      .getOrCreatePoolAndAddLiquidity(
        poolParams,
        0,
        liquidityParams,
        0,
        0,
        1e13,
        overrides
      )
      .then((res) => {
        State.update({
          creatingPool: true,
        });
        setTimeout(() => {
          State.update({
            step: 1,
            step1TokenAAmount: 0,
            refStep1Amount: null,
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
            binsToDistribute: 3,
            need2Tokens: true,
            onlyRight: false,
            tokenABalance: undefined,
            tokenBBalance: undefined,
            tokenAAllowance: undefined,
            tokenBAllowance: undefined,
          });
          getUserBalances();
        }, 25000);
      });
  } catch (err) {
    console.log(err);
  }
};

const confirmButton = (
  <div class="ConfirmButton" onClick={createPool}>
    <div class={"ConfirmText"}>Confirm</div>
  </div>
);

const validateButton = (
  <div class="validateButton" onClick={validateConfirm}>
    <div class={"ConfirmText"}>Validate</div>
  </div>
);

const validateButtonDisabled = (
  <div class="validateButtonDisabled" disabled>
    <div class={"ConfirmText"}>
      {state.poolModeSelected.id == 0 || state.poolModeSelected.id == 3
        ? state.tokenABalance && state.tokenBBalance
          ? "Validate"
          : `You don't have enough balance`
        : state.poolModeSelected.id == 1
        ? state.tokenABalance
          ? "Validate"
          : `You don't have enough balance on ${state.newTokenASelected.symbol}`
        : state.tokenBBalance
        ? "Validate"
        : `You don't have enough balance on ${state.newTokenBSelected.symbol}`}
    </div>
  </div>
);

const confirmButtonDisabled = (
  <div class="confirmButtonDisabled" disabled>
    <div class={"ConfirmText"}>Confirm</div>
  </div>
);

const allowanceButton = (mode) => {
  return (
    <div class="allowanceButton" onClick={() => approveErc20Token(mode)}>
      <div class={"ConfirmText"}>
        {mode == "TA"
          ? "Add more allowance on " + state.newTokenASelected.symbol
          : "Add more allowance on " + state.newTokenBSelected.symbol}
      </div>
    </div>
  );
};

const allowanceButtonDisabled = () => {
  return (
    <div class="allowanceButtonDisabled" disabled>
      <div class={"ConfirmText"}>
        {state.moreTokenAAllowance
          ? "Approving " + state.newTokenASelected.symbol
          : "Approving " + state.newTokenBSelected.symbol}
      </div>
    </div>
  );
};

const insufficientBalanceButton = (mode) => {
  return (
    <div class="allowanceButtonDisabled" disabled>
      <div class={"ConfirmText"}>
        {mode == "TA"
          ? "Insufficient balance on " + state.newTokenASelected.symbol
          : "Insufficient balance on " + state.newTokenBSelected.symbol}
      </div>
    </div>
  );
};

const css = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/createPool.css"
).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
            ${css}
        `,
  });
}

const Theme = state.theme;
return (
  <Theme>
    <div class="text-center mt-1">
      <div class="MainContainer">
        <div class="ProtocolContainer">
          <div class="ProtocolNetworkContainet">
            <div class="ProtocolNetworkTextSection">
              <div class="ProtocolText">PROTOCOL</div>
            </div>
            <div class="ProtocolNetworkSection">
              <div class="ProtocolNetworkContainer">
                <img
                  class="ProtocolImg"
                  src="https://etherscan.io/token/images/maverick_32.png"
                />
                <div class="NetworkText">Maverick</div>
              </div>
            </div>
          </div>
        </div>
        {state.isZkSync ? (
          <>
            <div class="row" style={{ color: "white", width: "100%" }}>
              <div
                class="col-4"
                style={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <div
                  class="step"
                  style={{
                    background:
                      state.step >= 1 ? "#6400FF" : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {state.step <= 1 ? (
                    1
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M1.25 9.375L7.875 16L18.125 4.5"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div class="col-1">-</div>
              <div
                class="col-2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  class="step"
                  style={{
                    background:
                      state.step >= 2 ? "#6400FF" : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {state.step <= 2 ? (
                    2
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M1.25 9.375L7.875 16L18.125 4.5"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div class="col-1">-</div>
              <div
                class="col-4"
                style={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <div
                  class="step"
                  style={{
                    background:
                      state.step >= 3 ? "#6400FF" : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {state.step <= 3 ? (
                    3
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M1.25 9.375L7.875 16L18.125 4.5"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            {state.step == 1 && (
              <div class="step1Container">
                <div class="titleSection text-start">Select Token Pair</div>
                <div>
                  <div
                    class="Container"
                    style={{
                      height: "50px",
                      "margin-bottom": "3px",
                    }}
                  >
                    <div class="TokenSection">
                      {
                        <img
                          style={{ width: "30px", height: "30px" }}
                          src={
                            state.newTokenASelected
                              ? state.newTokenASelected.logoURI
                              : tokensForNEtwork[0].logoURI
                          }
                          alt="icon not found"
                        />
                      }

                      <div class="TokenNameSection">
                        <select
                          class="TokenNameSelect"
                          value={
                            state.newTokenASelected
                              ? state.newTokenASelected.name
                              : "default"
                          }
                          onChange={(e) => {
                            handleTokenSelect(e, "A");
                          }}
                        >
                          {state.tokenOptionsA.map((p) => {
                            return <option value={p.name}>{p.symbol}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div
                    class="Container"
                    style={{ height: "50px", width: "380px" }}
                  >
                    <div class="TokenSection">
                      <img
                        style={{ width: "30px", height: "30px" }}
                        src={
                          state.newTokenBSelected
                            ? state.newTokenBSelected.logoURI
                            : tokensForNEtwork[1].logoURI
                        }
                        alt="icon not found"
                      />{" "}
                      <div class="TokenNameSection">
                        <select
                          class="TokenNameSelect"
                          value={
                            state.newTokenBSelected
                              ? state.newTokenBSelected.name
                              : "default"
                          }
                          onChange={(e) => {
                            handleTokenSelect(e, "B");
                          }}
                        >
                          {state.tokenOptionsB.map((p) => {
                            return <option value={p.name}>{p.symbol}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <>
                  <div class="titleSection">Select Pool Options</div>
                  <br />
                  <div
                    class="Container"
                    class="Container"
                    style={{
                      margin: "auto",
                      height: "55px",
                      border: "1px solid #8D8DFD",
                      justifyContent: "center",
                    }}
                  >
                    <div class="row" style={{ width: "100%" }}>
                      <div class="col-12">
                        <div class="TokenNameSection">
                          <div class="PoolOptionsContainer">
                            <div
                              style={{
                                width: "70%",
                                display: "flex",
                                justifyContent: "start",
                              }}
                            >
                              {state.fee > 0 && (
                                <span class="FeeWidth">
                                  {formatNumberFee(state.fee) + " Fee"}
                                </span>
                              )}
                              {state.width > 0 && (
                                <span class="FeeWidth">
                                  {formatNumberWidth(state.width) + " Width"}
                                </span>
                              )}
                            </div>
                            <div
                              style={{
                                width: "30%",
                                display: "flex",
                                justifyContent: "end",
                              }}
                            >
                              <span
                                class="EditButton"
                                onClick={() => showPoolOptionsModal()}
                              >
                                Edit Options
                              </span>
                              {state.showSelectOptionsModal && (
                                <Widget
                                  props={{
                                    setFeeWidth,
                                    fee: state.fee,
                                    width: state.width,
                                    poolName1: `${state.newTokenASelected.symbol}-${state.newTokenBSelected.symbol}`,
                                    poolName2: `${state.newTokenBSelected.symbol}-${state.newTokenASelected.symbol}`,
                                    closeModal,
                                  }}
                                  src={
                                    "owa-is-bos.near/widget/Maverick-LP-NewOptionsModal"
                                  }
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>

                <br />
                <div
                  class="Container"
                  style={{
                    margin: "auto",
                    height: "60px",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  <div class="">
                    <img
                      style={{ width: "30px", height: "30px" }}
                      src={
                        state.newTokenASelected
                          ? state.newTokenASelected.logoURI
                          : tokensForNEtwork[0].logoURI
                      }
                      alt="icon not found"
                    />{" "}
                    {state.newTokenASelected
                      ? state.newTokenASelected.symbol
                      : tokensForNEtwork[0].symbol}
                  </div>
                  <div class="  ">
                    <div class=" text-end  " style={{ "font-size": "14px" }}>
                      <input
                        class="TokenAmountInput"
                        type="number"
                        placeholder="0"
                        inputmode="decimal"
                        min="0"
                        pattern="^[0-9]*[.]?[0-9]*$"
                        value={state.step1TokenAAmount}
                        onChange={(e) => {
                          State.update({
                            step1TokenAAmount: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div class=" text-end" style={{ "font-size": "12px" }}>
                      <span class="UserBalance">
                        <span
                          class="text-white"
                          onClick={async () => {
                            setMaxBalanceTokenB();
                          }}
                        >
                          per 1{" "}
                          {state.newTokenBSelected
                            ? state.newTokenBSelected.symbol
                            : tokensForNEtwork[1].symbol}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {state.step == 2 && (
              <div>
                <div class="titleSection">Select Mode</div>
                <br />
                <div class="step2Container">
                  <div
                    class="row"
                    style={{
                      width: "100%",
                      height: "100px",
                      display: "flex",
                      margin: "0",
                    }}
                  >
                    <div class="col-6">
                      <p
                        style={{
                          textAlign: "justify",
                          color: "white",
                          fontSize: "13px",
                        }}
                      >
                        {state.poolModeSelected.description}
                      </p>
                    </div>
                    <div class="col-6">
                      <div class="ContainerPoolMode">
                        <div class="TokenSection">
                          <div class="TokenNameSection">
                            <div class="TokenAction">Pool Mode {"->"}</div>
                            <select
                              class="TokenNameSelect"
                              value={
                                state.poolModeSelected
                                  ? state.poolModeSelected.name
                                  : "default"
                              }
                              onChange={handlePoolModeSelect}
                            >
                              <option
                                value="default"
                                disabled={state.poolModeSelected}
                              >
                                Select Mode
                              </option>
                              {POOLSMODE.map((m) => {
                                return <option>{m.name}</option>;
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ overflow: "hidden" }}>
                  {state.poolModeSelected && (
                    <img
                      src={state.poolModeSelected.img}
                      style={{ height: "166px", transform: "scale(1.3)" }}
                    ></img>
                  )}
                </div>
              </div>
            )}
            {state.step == 3 && (
              <div class="step3Container">
                {state.poolModeSelected.name == "Mode Static" && (
                  <>
                    <div class="titleSection">Select Distribution</div>
                    <br />
                    <div style={{ margin: "auto", width: "380px" }}>
                      <div
                        class="row"
                        style={{
                          height: "60px",
                          display: "flex",
                        }}
                      >
                        <div class="col-6">
                          <div
                            class="ContainerDistributionMode"
                            style={{ height: "50px", width: "190px" }}
                          >
                            <div class="TokenSection">
                              <div class="TokenNameSection">
                                <div class="TokenAction">
                                  Distribution mode {"->"}
                                </div>
                                <select
                                  class="DistributionNameSelect"
                                  value={
                                    state.poolDistributionSelected
                                      ? state.poolDistributionSelected.name
                                      : "default"
                                  }
                                  onChange={handlePoolDistributionSelect}
                                >
                                  <option
                                    value="default"
                                    disabled={state.poolModeSelected}
                                  >
                                    Select Distribution
                                  </option>
                                  {DISTRIBUTIONMODE.map((m) => {
                                    return <option>{m.name}</option>;
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-6">
                          {(state.poolDistributionSelected.name ==
                            "Exponential" ||
                            state.poolDistributionSelected.name == "Flat") && (
                            <div class="SelectDistributionMode">
                              <div class="TokenSection">
                                <div class="TokenNameSection">
                                  <div class="TokenAction">
                                    Bins number (must be odd) {"->"}
                                  </div>
                                  <input
                                    class="TokenAmountInput"
                                    type="number"
                                    placeholder="0"
                                    inputmode="decimal"
                                    min="3"
                                    step="2"
                                    value={state.binsToDistribute}
                                    pattern="^[0-9]*[.]?[0-9]*$"
                                    onkeydown="return false"
                                    onChange={(e) =>
                                      changeBinsToDistribute(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div class="titleSection mt-3">Required Assets</div>
                <div
                  class="ContainerTokenA mt-3"
                  style={{
                    margin: "auto",
                    filter:
                      state.poolModeSelected.name == "Mode Left"
                        ? "blur(3px)"
                        : "",
                  }}
                >
                  <div class="TokenSection">
                    {state.newTokenASelected ? (
                      <img
                        class="TokenImg"
                        style={{ width: "30px", height: "30px" }}
                        src={state.newTokenASelected.logoURI}
                      />
                    ) : null}
                    <div class="TokenNameSection" style={{ color: "white" }}>
                      <div class="TokenAction">Token A {"->"}</div>
                      {state.newTokenASelected.symbol}
                    </div>
                  </div>
                  {state.poolModeSelected.name != "Mode Left" && (
                    <div class="TokenAmountSection">
                      <input
                        class="TokenAmountInput"
                        type="number"
                        placeholder="0"
                        inputmode="decimal"
                        min="0"
                        pattern="^[0-9]*[.]?[0-9]*$"
                        value={state.amountInputTokenA}
                        onChange={(e) => handleInputTokenA(e.target.value)}
                      />
                      <div class="TokenAmountPreview">
                        {state.tokenABalance != null ? (
                          state.tokenABalance.fixed &&
                          state.tokenABalance.fixed > 0 ? (
                            <span>
                              Balance: {state.tokenABalance.fixed}
                              <span
                                class="UserBalance"
                                onClick={async () => {
                                  setMaxBalanceTokenA();
                                }}
                              >
                                MAX
                              </span>
                            </span>
                          ) : (
                            "Balance: 0"
                          )
                        ) : (
                          "Balance: 0"
                        )}
                      </div>
                      {false ? (
                        <div class="TokenInsufficientBalance">
                          Insufficient Balance
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
                <div
                  class="ContainerTokenB mt-3"
                  style={{
                    margin: "auto",
                    filter:
                      state.poolModeSelected.name == "Mode Right"
                        ? "blur(3px)"
                        : "",
                  }}
                >
                  <div class="TokenSection">
                    {state.newTokenBSelected ? (
                      <img
                        class="TokenImg"
                        style={{ width: "30px", height: "30px" }}
                        src={state.newTokenBSelected.logoURI}
                      />
                    ) : null}
                    <div class="TokenNameSection" style={{ color: "white" }}>
                      <div class="TokenAction">Token B {"->"}</div>
                      {state.newTokenBSelected.symbol}
                    </div>
                  </div>
                  {state.poolModeSelected.name != "Mode Right" && (
                    <div class="TokenAmountSection">
                      <input
                        class="TokenAmountInput"
                        type="number"
                        placeholder="0"
                        inputmode="decimal"
                        min="0"
                        pattern="^[0-9]*[.]?[0-9]*$"
                        value={state.amountInputTokenB}
                        onChange={(e) => handleInputTokenB(e.target.value)}
                      />
                      <div class="TokenAmountPreview">
                        {state.tokenBBalance != null ? (
                          state.tokenBBalance.fixed &&
                          state.tokenBBalance.fixed > 0 ? (
                            <span>
                              Balance: {state.tokenBBalance.fixed}
                              <span
                                class="UserBalance"
                                onClick={async () => {
                                  setMaxBalanceTokenB();
                                }}
                              >
                                MAX
                              </span>
                            </span>
                          ) : (
                            "Balance: 0"
                          )
                        ) : (
                          "Balance: 0"
                        )}
                      </div>
                      {false ? (
                        <div class="TokenInsufficientBalance">
                          Insufficient Balance
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div class="row" style={{ marginInline: "0px", width: "100%" }}>
              <div
                class="col-6"
                style={{ display: "flex", justifyContent: "left" }}
              >
                {state.step > 1 && (
                  <div class="BackButton" onClick={back}>
                    <div class={"ConfirmText"}>Back</div>
                  </div>
                )}
              </div>
              <div
                class="col-6"
                style={{ display: "flex", justifyContent: "right" }}
              >
                {state.step < 3 && (
                  <>
                    <OverlayTrigger
                      key={"top"}
                      placement={"top"}
                      overlay={
                        state.step1TokenAAmount <= 0 ||
                        state.fee === 0 ||
                        state.width === 0 ? (
                          <Tooltip id={`tooltip-${placement}`}>
                            {"Increase the "}
                            {state.step1TokenAAmount <= 0
                              ? "token"
                              : state.fee === 0
                              ? "fee"
                              : "width"}
                            {" amount"}.
                          </Tooltip>
                        ) : (
                          <></>
                        )
                      }
                    >
                      <button class="ConfirmNextButton" onClick={next}>
                        <div class={"ConfirmText"}>Next</div>
                      </button>
                    </OverlayTrigger>
                  </>
                )}
                {state.step == 3
                  ? state.creatingPool
                    ? confirmButtonDisabled
                    : state.validation == true
                    ? !state.moreTokenAAllowance
                      ? !state.moreTokenBAllowance
                        ? confirmButton
                        : state.onApprovingToken
                        ? allowanceButtonDisabled()
                        : allowanceButton("TB")
                      : state.onApprovingToken
                      ? allowanceButtonDisabled()
                      : allowanceButton("TA")
                    : state.poolModeSelected.id == 0 ||
                      state.poolModeSelected.id == 3
                    ? state.tokenABalance && state.tokenBBalance
                      ? state.need2Tokens
                        ? state.amountInputTokenA > 0 &&
                          state.amountInputTokenA <=
                            state.tokenABalance.fixed &&
                          state.amountInputTokenB > 0 &&
                          state.amountInputTokenB <= state.tokenBBalance.fixed
                          ? validateButton
                          : validateButtonDisabled
                        : state.amountInputTokenB > 0 &&
                          state.amountInputTokenB <= state.tokenBBalance.fixed
                        ? validateButton
                        : validateButtonDisabled
                      : validateButtonDisabled
                    : state.poolModeSelected.id == 1
                    ? state.tokenABalance
                      ? state.amountInputTokenA > 0 &&
                        state.amountInputTokenA <= state.tokenABalance.fixed
                        ? validateButton
                        : validateButtonDisabled
                      : validateButtonDisabled
                    : state.tokenBBalance
                    ? state.amountInputTokenB > 0 &&
                      state.amountInputTokenB <= state.tokenBBalance.fixed
                      ? validateButton
                      : validateButtonDisabled
                    : validateButtonDisabled
                  : ""}
              </div>
            </div>
          </>
        ) : state.sender ? (
          <span class="text-white">
            To proceed, please switch to the
            <br />
            <div
              class="networkNameContainer"
              onClick={() => switchNetwork(324)}
            >
              <span class="networkName">zkSync Era Network</span>
            </div>
            using your wallet.
          </span>
        ) : (
          <>
            <div>
              <Web3Connect
                className="ConfirmButton ConfirmText"
                connectLabel="Connect Wallet"
              />
            </div>
          </>
        )}
      </div>
    </div>
  </Theme>
);
