const routerAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/maverick-router.txt"
);

const poolAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/IPoolABI.txt"
);

if (!routerAbi.ok || !poolAbi.ok) {
  return "Loading";
}

let pools;
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
  step: 1,
  poolSelected: undefined,
  poolModeSelected: POOLSMODE[0],
  poolDistributionSelected: DISTRIBUTIONMODE[2],
  needMoreAllowanceTA: false,
  needMoreAllowanceTB: false,
  amountInputTokenA: null,
  inputBalanceTokenA: null,
  amountInputTokenB: null,
  inputBalanceTokenB: null,
  poolList: [],
  pools: [],
  poolOptions: [],
  binsToDistribute: 3,
  need2Tokens: true,
});

const floatToFixed = (num, decimals) => {
  decimals ? decimals : 18;
  return ethers.BigNumber.from(
    ethers.utils.parseUnits(num.toString(), decimals)
  );
};

const getScale = () => {
  asyncFetch(`https://api.mav.xyz/api/v3/tokenPrices/5`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      console.log(res.body);
      let priceTokenA, priceTokenB;
      Object.entries(res.body.prices).forEach(([key, value]) => {
        if (
          state.selectedPoolOptions.tokenA.priceId == key ||
          state.selectedPoolOptions.tokenA.address == key
        ) {
          priceTokenA = value;
        }
        if (
          state.selectedPoolOptions.tokenB.priceId == key ||
          state.selectedPoolOptions.tokenB.address == key
        ) {
          priceTokenB = value;
        }
      });
      let scalesObj = {
        priceTokenA: priceTokenA.usd,
        priceTokenB: priceTokenB.usd,
        scaleTokAToTokB: priceTokenA.usd / priceTokenB.usd,
        scaleTokBToTokA: priceTokenB.usd / priceTokenA.usd,
      };
      console.log(scalesObj);
      State.update({ tokScales: scalesObj });
    });
};

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

const setUserBalances = () => {
  const tokABalance = state.userBalances.find(
    (token) => token.symbol == state.selectedPoolOptions.tokenA.symbol
  );
  const tokBBalance = state.userBalances.find(
    (token) => token.symbol == state.selectedPoolOptions.tokenB.symbol
  );
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

const getNFTUser = () => {
  const accounts = Ethers.send("eth_requestAccounts", []);
  asyncFetch(`https://api.mav.xyz/api/v3/user/${accounts[0]}/5`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      if (res.body.user.positions.length > 0) {
        State.update({ userNFT: res.body.user.positions[0].nftId });
      }
    });
};

const getPools = () => {
  console.log("entra pools");
  asyncFetch(`https://api.mav.xyz/api/v3/pools/5
`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      let poolList = [
        ...new Map(res.body.pools.map((item) => [item["name"], item])).values(),
      ];
      pools = res.body.pools;
      State.update({
        poolList: poolList,
        poolSelected: poolList[0],
        selectedPoolOptions: poolList[0],
      });
      getPoolOptions(poolList[0].name, res.body.pools);
    });
};

const getPoolOptions = (selPool, pools) => {
  State.update({
    poolOptions: pools.filter((pool) => pool.name == selPool),
  });
};

const getFeeWidthFormat = (n) => {
  const decimalPart = (n % 1).toFixed(20).substring(2);
  const zeroCount = decimalPart.match(/^0*/)[0].length;
  var format = (n * 100).toFixed(zeroCount > 3 ? 3 : 2);
  return format + "%";
};

const formatNumberBalanceToken = (n) => {
  if (n >= 1000000) {
    return "$" + (n / 1000000).toFixed(2) + "m";
  } else if (n >= 1000) {
    return "$" + (n / 1000).toFixed(2) + "k";
  } else {
    return "$" + n.toFixed(2);
  }
};

const formatAPR = (n) => {
  if (n == 0) {
    return null;
  }
  const roundedNumber = (n * 100).toFixed(3);
  const [integerPart, decimalPart] = roundedNumber.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedNumber = `${formattedInteger}.${decimalPart}%`;
  return formattedNumber;
};

const showPoolOptionsModal = () => {
  State.update({ showSelectPoolOptionModal: true });
};

const closeModal = () => {
  State.update({ showSelectPoolOptionModal: false });
};

const setPoolOption = (allPoolOptions, poolOptionSelected) => {
  console.log("Todas");
  console.log(allPoolOptions);
  console.log("Seleccionada");
  console.log(poolOptionSelected);
  State.update({
    selectedPoolOptions: poolOptionSelected,
    showSelectPoolOptionModal: false,
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

const addLiquidity = () => {
  const router = new ethers.Contract(
    state.routerContract,
    routerAbi.body,
    Ethers.provider().getSigner()
  );

  const pool = new ethers.Contract(
    state.selectedPoolOptions.id,
    poolAbi.body,
    Ethers.provider().getSigner()
  );

  let bins = state.selectedPoolOptions.bins;
  console.log(bins);

  let amountInA, amountInB;
  let inputA = parseFloat(state.amountInputTokenA).toString();
  let inputB = parseFloat(state.amountInputTokenB).toString();

  if (state.poolModeSelected.id == 0) {
    console.log("Entro a STATIC");
    if (state.poolDistributionSelected.name == "Single Bin") {
      amountInA = ethers.utils.parseUnits(inputA, 18);
      amountInB = ethers.utils.parseUnits(inputB, 18);
      console.log(amountInA, amountInB);
    } else {
      amountInA = ethers.utils.parseUnits(inputA, 18);
      amountInB = ethers.utils.parseUnits(inputB, 18);
      console.log(amountInA, amountInB);
    }
  } else if (state.poolModeSelected.id == 3) {
    console.log("Entro a BOTH");
    amountInA = ethers.utils.parseUnits(inputA, 18);
    amountInB = ethers.utils.parseUnits(inputB, 18);
    console.log(amountInA, amountInB);
  } else if (state.poolModeSelected.id == 1) {
    console.log("Entro a LEFT");
    amountInA = ethers.utils.parseUnits(inputA, 18);
    amountInB = ethers.utils.parseUnits("0", 18);
    console.log(amountInA, amountInB);
  } else if (state.poolModeSelected.id == 2) {
    console.log("Entro a RIGHT");
    amountInA = ethers.utils.parseUnits("0", 18);
    amountInB = ethers.utils.parseUnits(inputB, 18);
    console.log(amountInA, amountInB);
  }

  const overrides = {
    value: ethers.utils.parseUnits("0", 18),
    gasLimit: 30000000,
  };

  pool.getState().then((res) => {
    console.log(res);
    let lowerTick = res[0];
    let position =
      state.poolModeSelected.id == 0 || state.poolModeSelected.id == 3
        ? lowerTick
        : state.poolModeSelected.id == 1
        ? lowerTick - 1
        : lowerTick + 1;
    pool.binPositions(res[0], state.poolModeSelected.id).then((res) => {
      console.log("Position", res);
      let liquidityParams = [];
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
          console.log("Single Bin");
          liquidityParams.push({
            kind: state.poolModeSelected.id,
            pos: position,
            isDelta: false,
            deltaA: amountInA,
            deltaB: amountInB,
          });
        }
        if (state.poolDistributionSelected.name == "Flat") {
          console.log("Flat");

          const leftAmount = (
            (parseFloat(state.amountInputTokenA) - 0.001) /
            Math.floor(state.binsToDistribute / 2)
          ).toString();

          const rightAmount = (
            (parseFloat(state.amountInputTokenB) - 0.001) /
            Math.ceil(state.binsToDistribute / 2)
          ).toString();

          const leftAmountFormated = ethers.utils.parseUnits(leftAmount, 18);
          const amountInBFormated = ethers.utils.parseUnits(rightAmount, 18);

          for (let i = 0; i < state.binsToDistribute; i++) {
            const pos = position + i - Math.floor(state.binsToDistribute / 2);

            const newDeltaA = pos < position ? leftAmountFormated : 0;
            const newDeltaB = pos >= position ? amountInBFormated : 0;

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
        if (state.poolDistributionSelected.name == "Exponential") {
          console.log("Exponential");

          const sigma = state.binsToDistribute / 4;
          const amplitudeLeft =
            (parseFloat(state.amountInputTokenA) - 0.001) /
            (sigma * Math.sqrt(2 * Math.PI));
          const amplitudeRight =
            (parseFloat(state.amountInputTokenB) - 0.001) /
            (sigma * Math.sqrt(2 * Math.PI));

          for (let i = 0; i < state.binsToDistribute; i++) {
            const pos = position + i - Math.floor(state.binsToDistribute / 2);

            const leftAmountFormated = ethers.utils.parseUnits(
              (
                amplitudeLeft *
                Math.exp(-Math.pow(pos, 2) / (2 * Math.pow(sigma, 2)))
              ).toString(),
              18
            );

            const amountInBFormated = ethers.utils.parseUnits(
              (
                amplitudeRight *
                Math.exp(-Math.pow(pos, 2) / (2 * Math.pow(sigma, 2)))
              ).toString(),
              18
            );

            const newDeltaA = pos < position ? leftAmountFormated : 0;
            const newDeltaB = pos >= position ? amountInBFormated : 0;

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

      console.log(liquidityParams);

      try {
        router
          .addLiquidityToPool(
            state.selectedPoolOptions.id,
            state.userNFT ? state.userNFT : 0,
            liquidityParams,
            0,
            0,
            1e13,
            overrides
          )
          .then((res) => {
            setTimeout(() => {
              State.update({
                step: 1,
                poolSelected: undefined,
                poolModeSelected: POOLSMODE[0],
                poolDistributionSelected: DISTRIBUTIONMODE[2],
                needMoreAllowanceTA: false,
                needMoreAllowanceTB: false,
                amountInputTokenA: null,
                inputBalanceTokenA: null,
                amountInputTokenB: null,
                inputBalanceTokenB: null,
                binsToDistribute: 3,
                need2Tokens: true,
              });
            }, 20000);
          });
      } catch (err) {
        console.log(err);
      }
    });
  });
};

const handlePoolSelect = (data) => {
  const pool = state.poolList.find((p) => p.name === data.target.value);
  asyncFetch(`https://api.mav.xyz/api/v3/pools/5`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      getPoolOptions(data.target.value, res.body.pools);
    });
  State.update({
    poolSelected: pool,
    selectedPoolOptions: pool,
    tokenABalance: undefined,
    tokenBBalance: undefined,
    tokenAAllowance: undefined,
    tokenBAllowance: undefined,
    moreTokenAAllowance: undefined,
    moreTokenBAllowance: undefined,
  });
};

const handlePoolOptionsSelect = (data) => {
  const poolOptions = state.poolOptions.find(
    (po) => po.id === data.target.value
  );
  State.update({ selectedPoolOptions: poolOptions });
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
    state.poolList.length == 0 ? getPools() : "";
    state.userNFT ? "" : getNFTUser();
    state.userBalances ? "" : getUserBalances();
  }
}

const getRecipient = () => {
  return (
    state.sender.substring(0, 5) +
    "..." +
    state.sender.substring(state.sender.length - 4, state.sender.length)
  ).toUpperCase();
};

const next = () => {
  if (state.step + 1 == 2) {
    if (!(state.tokenABalance || state.tokenBBalance)) {
      setUserBalances();
      getScale();
    }
  } else if (state.step + 1 == 3) {
    if (!(state.tokenAAllowance || state.tokenBAllowance)) {
      getAccountAllowance({
        token: state.selectedPoolOptions.tokenA,
        vAllowance: false,
        mode: "TA",
      });
      getAccountAllowance({
        token: state.selectedPoolOptions.tokenB,
        vAllowance: false,
        mode: "TB",
      });
    }
  }
  State.update({ step: state.step + 1 });
};

const back = () => {
  if (state.validation) {
    State.update({ validation: undefined });
  }
  State.update({
    step: state.step - 1,
    amountInputTokenA: null,
    amountInputTokenB: null,
  });
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
      state.selectedPoolOptions.tokenA.decimals == 18
        ? 1000000000000000000
        : 1000000;
    tokenAllowance = state.tokenAAllowance / divider;
    input * 1 > tokenAllowance
      ? State.update({ moreTokenAAllowance: true })
      : State.update({ moreTokenAAllowance: false });
  } else {
    divider =
      state.selectedPoolOptions.tokenB.decimals == 18
        ? 1000000000000000000
        : 1000000;
    tokenAllowance = state.tokenBAllowance / divider;
    input * 1 > tokenAllowance
      ? State.update({ moreTokenBAllowance: true })
      : State.update({ moreTokenBAllowance: false });
  }
};

const handleInputTokenA = (input) => {
  console.log("entra handle input A", state.poolModeSelected.id);
  if (state.poolModeSelected.id == 0 || state.poolModeSelected.id == 3) {
    const step1TokenAAmount = state.selectedPoolOptions.price;
    const tickSpacing = state.selectedPoolOptions.tickSpacing;
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
    const step1TokenAAmount = state.selectedPoolOptions.price;
    const tickSpacing = state.selectedPoolOptions.tickSpacing;
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
