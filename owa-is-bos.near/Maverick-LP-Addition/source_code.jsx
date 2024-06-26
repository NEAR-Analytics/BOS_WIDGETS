// Get Abi of Maverick router contract
const routerAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/maverick-router.txt"
);

// Get Abi of Maverick pool contract
const poolAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/IPoolABI.txt"
);

// Validate that the abi are loaded
if (!routerAbi.ok || !poolAbi.ok) {
  return "Loading";
}

let pools;

// Const with pool modes
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

// Const with distribution modes
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

// State initialization
State.init({
  isZkSync: false,
  routerContract: "0x39E098A153Ad69834a9Dac32f0FCa92066aD03f4",
  step: 1,
  poolSelected: undefined,
  poolModeSelected: POOLSMODE[0],
  poolDistributionSelected: DISTRIBUTIONMODE[0],
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
  onlyRight: false,
});

// Method to fixed float number
const floatToFixed = (num, decimals) => {
  decimals ? decimals : 18;
  return ethers.BigNumber.from(
    ethers.utils.parseUnits(num.toString(), decimals)
  );
};

// Method to get user balances
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

// Method to set user balances
const setUserBalances = () => {
  const tokA = state.selectedPoolOptions.tokenA.symbol;
  const tokB = state.selectedPoolOptions.tokenB.symbol;
  const tokABalance = state.userBalances.find((token) => token.symbol == tokA);
  const tokBBalance = state.userBalances.find((token) => token.symbol == tokB);
  tokABalance
    ? State.update({
        tokenABalance: {
          fixed: (parseFloat(tokABalance.tokenBalance) - 0.00009)
            .toFixed(8)
            .toString(),
          unfixed: tokABalance.tokenBalanceBN,
        },
      })
    : State.update({ tokenABalance: undefined });
  tokBBalance
    ? State.update({
        tokenBBalance: {
          fixed: (parseFloat(tokBBalance.tokenBalance) - 0.00009)
            .toFixed(8)
            .toString(),
          unfixed: tokBBalance.tokenBalanceBN,
        },
      })
    : State.update({ tokenBBalance: undefined });
};

// Method to get user NFT
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

// Method to get pools
const getPools = () => {
  asyncFetch(`https://api.mav.xyz/api/v4/pools/324
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

// Method to set pool options
const getPoolOptions = (selPool, pools) => {
  State.update({
    poolOptions: pools.filter((pool) => pool.name == selPool),
  });
};

// Format width and fee
const getFeeWidthFormat = (n) => {
  const decimalPart = (n % 1).toFixed(20).substring(2);
  const zeroCount = decimalPart.match(/^0*/)[0].length;
  var format = (n * 100).toFixed(zeroCount > 3 ? 3 : 2);
  return format + "%";
};

// Format token balance
const formatNumberBalanceToken = (n) => {
  if (n < 0.01) {
    return "< 0.01";
  }
  if (n >= 1000000) {
    return "$" + (n / 1000000).toFixed(2) + "m";
  } else if (n >= 1000) {
    return "$" + (n / 1000).toFixed(2) + "k";
  } else {
    return "$" + n.toFixed(2);
  }
};

// Format APR
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

// Method to show pool options modal
const showPoolOptionsModal = () => {
  State.update({ showSelectPoolOptionModal: true });
};

// Method to close pool options modal
const closeModal = () => {
  State.update({ showSelectPoolOptionModal: false });
};

// Method to set pool options modal
const setPoolOption = (allPoolOptions, poolOptionSelected) => {
  State.update({
    selectedPoolOptions: poolOptionSelected,
    showSelectPoolOptionModal: false,
  });
};

// Method to get account allowance
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
      console.log(approveContract);
      approveContract
        .allowance(state.sender, state.routerContract)
        .then((res) => {
          console.log(res);
          if (data.mode == "TA") {
            State.update({ tokenAAllowance: parseInt(res.toString()) });
          } else {
            State.update({ tokenBAllowance: parseInt(res.toString()) });
          }
        });
    });
  }
};

// Method to add liquidity
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

  let amountInA, amountInB;
  let inputA = state.amountInputTokenA;
  let inputB = state.amountInputTokenB;
  let usingETH =
    state.selectedPoolOptions.tokenA.symbol == "ETH" ||
    state.selectedPoolOptions.tokenB.symbol == "ETH";
  let tokUsedETH =
    state.selectedPoolOptions.tokenA.symbol == "ETH" ? "tokA" : "tokB";

  if (state.poolModeSelected.id == 0) {
    if (state.poolDistributionSelected.name == "Single Bin") {
      amountInA = ethers.utils.parseUnits(
        inputA,
        state.selectedPoolOptions.tokenA.decimals
      );
      amountInB = ethers.utils.parseUnits(
        inputB,
        state.selectedPoolOptions.tokenB.decimals
      );
    } else {
      amountInA = ethers.utils.parseUnits(
        inputA,
        state.selectedPoolOptions.tokenA.decimals
      );
      amountInB = ethers.utils.parseUnits(
        inputB,
        state.selectedPoolOptions.tokenB.decimals
      );
    }
  } else if (state.poolModeSelected.id == 3) {
    amountInA = ethers.utils.parseUnits(
      inputA,
      state.selectedPoolOptions.tokenA.decimals
    );
    amountInB = ethers.utils.parseUnits(
      inputB,
      state.selectedPoolOptions.tokenB.decimals
    );
  } else if (state.poolModeSelected.id == 1) {
    amountInA = ethers.utils.parseUnits(
      inputA,
      state.selectedPoolOptions.tokenA.decimals
    );
    amountInB = ethers.utils.parseUnits(
      "0",
      state.selectedPoolOptions.tokenB.decimals
    );
  } else if (state.poolModeSelected.id == 2) {
    amountInA = ethers.utils.parseUnits(
      "0",
      state.selectedPoolOptions.tokenA.decimals
    );
    amountInB = ethers.utils.parseUnits(
      inputB,
      state.selectedPoolOptions.tokenB.decimals
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

  pool.getState().then((res) => {
    let lowerTick = res[0];
    let position =
      state.poolModeSelected.id == 0 || state.poolModeSelected.id == 3
        ? lowerTick
        : state.poolModeSelected.id == 1
        ? lowerTick - 1
        : lowerTick + 1;
    pool.binPositions(res[0], state.poolModeSelected.id).then((res) => {
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
              state.selectedPoolOptions.tokenA.decimals
            );
            const amountInBFormated = ethers.utils.parseUnits(
              rightAmount,
              state.selectedPoolOptions.tokenB.decimals
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
              state.selectedPoolOptions.tokenA.decimals
            );
            const amountInBFormated = ethers.utils.parseUnits(
              rightAmount,
              state.selectedPoolOptions.tokenB.decimals
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
                (lambda) =>
                  (state.amountInputTokenA / sumExpL) * Math.exp(lambda)
              )
              .reverse();
            amountExpL.unshift(0);
            amountExpL.reverse();

            const amountExpR = lambdasR
              .map(
                (lambda) =>
                  (state.amountInputTokenB / sumExpR) * Math.exp(lambda)
              )
              .reverse();

            for (let i = 0; i < state.binsToDistribute; i++) {
              const pos = position + i - Math.floor(state.binsToDistribute / 2);
              let newDeltaA =
                pos <= position
                  ? ethers.utils.parseUnits(
                      amountExpL[i].toString(),
                      state.selectedPoolOptions.tokenA.decimals
                    )
                  : 0;
              let newDeltaB =
                pos >= position
                  ? ethers.utils.parseUnits(
                      amountExpR[
                        i - Math.floor(state.binsToDistribute / 2)
                      ].toString(),
                      state.selectedPoolOptions.tokenB.decimals
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
                (lambda) =>
                  (state.amountInputTokenA / sumExpL) * Math.exp(lambda)
              )
              .reverse();
            amountExpL.reverse();

            const amountExpR = lambdasR
              .map(
                (lambda) =>
                  (state.amountInputTokenB / sumExpR) * Math.exp(lambda)
              )
              .reverse();

            for (let i = 0; i < state.binsToDistribute; i++) {
              const pos = position + i - Math.floor(state.binsToDistribute / 2);
              let newDeltaA =
                pos <= position
                  ? ethers.utils.parseUnits(
                      amountExpL[i].toString(),
                      state.selectedPoolOptions.tokenA.decimals
                    )
                  : 0;
              let newDeltaB =
                pos >= position
                  ? ethers.utils.parseUnits(
                      amountExpR[
                        i - Math.floor(state.binsToDistribute / 2)
                      ].toString(),
                      state.selectedPoolOptions.tokenB.decimals
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
            State.update({
              addingLiquidity: true,
            });
            setTimeout(() => {
              State.update({
                step: 1,
                poolSelected: undefined,
                selectedPoolOptions: undefined,
                poolOptions: undefined,
                poolModeSelected: POOLSMODE[0],
                poolDistributionSelected: DISTRIBUTIONMODE[0],
                needMoreAllowanceTA: false,
                needMoreAllowanceTB: false,
                amountInputTokenA: null,
                inputBalanceTokenA: null,
                amountInputTokenB: null,
                inputBalanceTokenB: null,
                binsToDistribute: 3,
                need2Tokens: true,
                addingLiquidity: false,
                onlyRight: false,
                tokenABalance: undefined,
                tokenBBalance: undefined,
                tokenAAllowance: undefined,
                tokenBAllowance: undefined,
                moreTokenAAllowance: undefined,
                moreTokenBAllowance: undefined,
              });
              getUserBalances();
            }, 25000);
          });
      } catch (err) {
        console.log(err);
      }
    });
  });
};

// Method to set pool
const handlePoolSelect = (data) => {
  const pool = state.poolList.find((p) => p.name === data.target.value);
  asyncFetch(`https://api.mav.xyz/api/v4/pools/324`)
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

// Method to set pool options selected
const handlePoolOptionsSelect = (data) => {
  const poolOptions = state.poolOptions.find(
    (po) => po.id === data.target.value
  );
  State.update({ selectedPoolOptions: poolOptions });
};

// Method to set pool mode
const handlePoolModeSelect = (data) => {
  const mode = POOLSMODE.find((m) => m.name === data.target.value);
  State.update({ poolModeSelected: mode });
};

// Method to set pool distribution mode
const handlePoolDistributionSelect = (data) => {
  const mode = DISTRIBUTIONMODE.find((m) => m.name === data.target.value);
  State.update({ poolDistributionSelected: mode });
};

// Method to get network
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

// Method to change network
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

// Method to next step
const next = () => {
  if (state.step + 1 == 2) {
    if (!(state.tokenABalance || state.tokenBBalance)) {
      setUserBalances();
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

// Method to back step
const back = () => {
  if (state.validation) {
    State.update({ validation: false });
  }
  State.update({
    step: state.step - 1,
    amountInputTokenA: null,
    amountInputTokenB: null,
    onlyRight: false,
  });
};

// Method to format number (M and K)
const formatNumber = (n) => {
  if (n >= 1000000) {
    return "$" + (n / 1000000).toFixed(2) + "m";
  } else if (n >= 1000) {
    return "$" + (n / 1000).toFixed(2) + "k";
  } else {
    return "$" + n.toFixed(2);
  }
};

// Method to set max of token A
const setMaxBalanceTokenA = () => {
  if (state.tokenABalance.fixed > 0) {
    handleInputTokenA(state.tokenABalance.fixed);
  }
};

// Method to set max of token B
const setMaxBalanceTokenB = () => {
  if (state.tokenBBalance.fixed > 0) {
    handleInputTokenB(state.tokenBBalance.fixed);
  }
};

// Method to validate token allowance
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

// Handle to set token A
const handleInputTokenA = (input) => {
  if (state.poolModeSelected.id == 0 || state.poolModeSelected.id == 3) {
    const step1TokenAAmount = Big(state.selectedPoolOptions.price);
    const tickSpacing = Big(state.selectedPoolOptions.tickSpacing);
    const ic = Math.floor(
      Math.log(step1TokenAAmount) / (Math.log(1.0001) * tickSpacing)
    );
    const il = Math.pow(1.0001, ic * tickSpacing);
    const iu = Math.pow(1.0001, (ic + 1) * tickSpacing);
    let deltaX = 0;
    let deltaY = 0;
    let deltaL = 1;
    const difPriceIl = Math.abs(Big(step1TokenAAmount - il));
    const difPriceIu = Math.abs(Big(step1TokenAAmount - iu));
    if (difPriceIl < 0.00000000001) {
      const priceFix = step1TokenAAmount.toFixed(11);
      const ilFix = il.toFixed(11);
      const iuFix = iu.toFixed(11);
      const sqrtPrice = Math.sqrt(priceFix);
      const sqrtIl = Math.sqrt(ilFix);
      const sqrtIu = Math.sqrt(iuFix);
      if (priceFix == ilFix && sqrtIl == sqrtPrice) {
        sqrtIl = sqrtIl + 0.0000000000012;
      }
      deltaY = deltaL * (sqrtIl - sqrtPrice);
      deltaX = deltaL * (1 / sqrtPrice - 1 / sqrtIu);
      console.log(deltaX, deltaY);
    } else {
      if (step1TokenAAmount < il) {
        deltaX = deltaL * (1 / Math.sqrt(il) - 1 / Math.sqrt(iu));
        deltaY = 0;
      }
      if (il <= step1TokenAAmount && step1TokenAAmount < iu) {
        deltaY = deltaL * (Math.sqrt(step1TokenAAmount) - Math.sqrt(il));
        deltaX =
          deltaL * (1 / Math.sqrt(step1TokenAAmount) - 1 / Math.sqrt(iu));
      }
      if (step1TokenAAmount >= iu) {
        deltaX = 0;
        deltaY = Math.sqrt(iu) - Math.sqrt(il);
      }
    }

    let tokenB = 0;
    if (ic !== 0) {
      tokenB = input * (deltaX / deltaY);
      State.update({
        amountInputTokenB:
          deltaY == 0
            ? 0
            : tokenB.toFixed(
                state.poolSelected.tokenB.decimals == 18
                  ? 11
                  : state.poolSelected.tokenB.decimals
              ),
        amountInputTokenA: input,
        validation: false,
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
            state.poolSelected.tokenB.decimals == 18
              ? 11
              : state.poolSelected.tokenB.decimals
          ),
          amountInputTokenA: input,
          validation: false,
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
            state.poolSelected.tokenB.decimals == 18
              ? 11
              : state.poolSelected.tokenB.decimals
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
          validation: false,
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

// Handle to set token B
const handleInputTokenB = (input) => {
  if (state.poolModeSelected.id == 0 || state.poolModeSelected.id == 3) {
    const step1TokenAAmount = Big(state.selectedPoolOptions.price);
    const tickSpacing = Big(state.selectedPoolOptions.tickSpacing);
    const ic = Math.floor(
      Math.log(step1TokenAAmount) / (Math.log(1.0001) * tickSpacing)
    );
    const il = Math.pow(1.0001, ic * tickSpacing);
    const iu = Math.pow(1.0001, (ic + 1) * tickSpacing);
    let deltaX = 0;
    let deltaY = 0;
    let deltaL = 1;
    const difPriceIl = Math.abs(Big(step1TokenAAmount - il));
    const difPriceIu = Math.abs(Big(step1TokenAAmount - iu));
    if (difPriceIl < 0.00000000001) {
      const priceFix = step1TokenAAmount.toFixed(11);
      const ilFix = il.toFixed(11);
      const iuFix = iu.toFixed(11);
      const sqrtPrice = Math.sqrt(priceFix);
      const sqrtIl = Math.sqrt(ilFix);
      const sqrtIu = Math.sqrt(iuFix);
      if (priceFix == ilFix && sqrtIl == sqrtPrice) {
        sqrtIl = sqrtIl + 0.00012;
      }
      deltaY = deltaL * (sqrtIl - sqrtPrice);
      deltaX = deltaL * (1 / sqrtPrice - 1 / sqrtIu);
    } else {
      if (step1TokenAAmount < il) {
        deltaX = deltaL * (1 / Math.sqrt(il) - 1 / Math.sqrt(iu));
        deltaY = 0;
      }
      if (il <= step1TokenAAmount && step1TokenAAmount < iu) {
        deltaY = deltaL * (Math.sqrt(step1TokenAAmount) - Math.sqrt(il));
        deltaX =
          deltaL * (1 / Math.sqrt(step1TokenAAmount) - 1 / Math.sqrt(iu));
      }
      if (step1TokenAAmount >= iu) {
        deltaX = 0;
        deltaY = Math.sqrt(iu) - Math.sqrt(il);
      }
    }

    let tokenA = 0;
    if (ic !== 0) {
      tokenA = (input / deltaX) * deltaY;
      State.update({
        amountInputTokenA:
          deltaY == 0
            ? 0
            : tokenA.toFixed(
                state.poolSelected.tokenA.decimals == 18
                  ? 11
                  : state.poolSelected.tokenA.decimals
              ),
        amountInputTokenB: input,
        validation: false,
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
            state.poolSelected.tokenA.decimals == 18
              ? 11
              : state.poolSelected.tokenA.decimals
          ),
          validation: false,
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
            state.poolSelected.tokenA.decimals == 18
              ? 11
              : state.poolSelected.tokenA.decimals
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
          validation: false,
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

// Method to validate data
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

// Method to approve ERC20 token
const approveErc20Token = (mode) => {
  asyncFetch(
    "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
  ).then((res) => {
    let value, token;

    if (mode == "TA") {
      value = floatToFixed(
        state.tokenABalance.fixed,
        state.poolSelected.tokenA.decimals
      );
      token = state.poolSelected.tokenA;
    } else {
      value = floatToFixed(
        state.tokenBBalance.fixed,
        state.poolSelected.tokenB.decimals
      );
      token = state.poolSelected.tokenB;
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
              mode == "TA"
                ? state.selectedPoolOptions.tokenA
                : state.selectedPoolOptions.tokenB,
            vAllowance: false,
            mode: mode,
          });
          State.update({ onApprovingToken: false, validation: false });
        }, 20000);
      });
  });
};

// Method to change bins number to distribute liquidity
const changeBinsToDistribute = (nb) => {
  State.update({
    binsToDistribute: nb,
    validation: false,
    amountInputTokenA: 0,
    amountInputTokenB: 0,
  });
};

// The next section contains the validation buttons //
const confirmButton = (
  <div class="ConfirmButton" onClick={addLiquidity}>
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
        ? state.tokenABalance &&
          state.tokenBBalance &&
          (state.amountInputTokenA <= state.tokenABalance.fixed ||
            state.amountInputTokenA <= state.tokenABalance.fixed)
          ? "Validate"
          : `You don't have enough balance`
        : state.poolModeSelected.id == 1
        ? state.tokenABalance
          ? "Validate"
          : `You don't have enough balance on ${state.selectedPoolOptions.tokenA.symbol}`
        : state.tokenBBalance
        ? "Validate"
        : `You don't have enough balance on ${state.selectedPoolOptions.tokenB.symbol}`}
    </div>
  </div>
);

const confirmButtonDisabled = (
  <div class="confirmButtonDisabled" disabled>
    <div class={"ConfirmText"}>Adding Liquidity...</div>
  </div>
);

const allowanceButton = (mode) => {
  return (
    <div class="allowanceButton" onClick={() => approveErc20Token(mode)}>
      <div class={"ConfirmText"}>
        {mode == "TA"
          ? "Add more allowance on " + state.poolSelected.tokenA.symbol
          : "Add more allowance on " + state.poolSelected.tokenB.symbol}
      </div>
    </div>
  );
};

const insufficientBalanceButton = (mode) => {
  return (
    <div class="allowanceButtonDisabled" disabled>
      <div class={"ConfirmText"}>
        {mode == "TA"
          ? "Insufficient balance on " + state.poolSelected.tokenA.symbol
          : "Insufficient balance on " + state.poolSelected.tokenB.symbol}
      </div>
    </div>
  );
};

const allowanceButtonDisabled = () => {
  return (
    <div class="allowanceButtonDisabled" disabled>
      <div class={"ConfirmText"}>
        {state.moreTokenAAllowance
          ? "Approving " + state.poolSelected.tokenA.symbol
          : "Approving " + state.poolSelected.tokenB.symbol}
      </div>
    </div>
  );
};

// Get css file
const css = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/addLiquidity.css"
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
            {state.step == 1 && state.poolList.length == 0 && (
              <div class="titleStep">Loading data...</div>
            )}
            {state.step == 1 && state.poolList.length > 0 && (
              <div>
                <div class="titleStep">Select Pool</div>
                <br />
                <div
                  class="SelectPoolContainer"
                  style={{ margin: "auto", width: "300px" }}
                >
                  <div class="TokenSection">
                    {state.poolSelected ? (
                      <img
                        class="TokenImg"
                        src={state.poolSelected.tokenA.logoURI}
                      />
                    ) : null}
                    {state.poolSelected ? (
                      <img
                        class="TokenImg"
                        src={state.poolSelected.tokenB.logoURI}
                      />
                    ) : null}
                    <div class="TokenNameSection">
                      <div class="TokenAction">Pool {"->"}</div>
                      <select
                        class="TokenNameSelect"
                        value={
                          state.poolSelected
                            ? state.poolSelected.name
                            : "default"
                        }
                        onChange={handlePoolSelect}
                      >
                        <option value="default" disabled={state.poolSelected}>
                          Select Pool
                        </option>
                        {state.poolList.map((p) => {
                          return <option value={p.name}>{p.name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <br />
                <div class="LineContainer">
                  <div class="Line" />
                </div>
                <div class="titleStep">Select Pool Options</div>
                <br />
                <div
                  class="SelectPoolOptions"
                  style={{ margin: "auto", width: "460px", height: "111px" }}
                >
                  <div class="row">
                    <div class="col-7">
                      <div class="TokenNameSection">
                        <div class="selectedFeeWidth">
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "start",
                            }}
                          >
                            {state.selectedPoolOptions && (
                              <span class="FeeWidth">
                                {getFeeWidthFormat(
                                  state.selectedPoolOptions.fee
                                ) + " Fee"}
                              </span>
                            )}
                            {state.selectedPoolOptions && (
                              <span class="FeeWidth">
                                {getFeeWidthFormat(
                                  state.selectedPoolOptions.width
                                ) + " Width"}
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <span
                              class="EditButton"
                              onClick={() => showPoolOptionsModal()}
                            >
                              Edit
                            </span>
                            {state.showSelectPoolOptionModal && (
                              <Widget
                                props={{
                                  poolOptions: state.poolOptions,
                                  poolOptionsSelected:
                                    state.selectedPoolOptions,
                                  setPoolOption,
                                  closeModal,
                                }}
                                src={
                                  "owa-is-bos.near/widget/Maverick-LP-OptionsModal"
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="row" style={{ color: "white" }}>
                        <div class="col-6 PoolOptionDetails">
                          {state.selectedPoolOptions
                            ? state.selectedPoolOptions.tokenA.symbol +
                              " Balance"
                            : ""}
                        </div>
                        <div class="col-6 PoolOptionDetails">
                          {state.selectedPoolOptions
                            ? state.selectedPoolOptions.tokenB.symbol +
                              " Balance"
                            : ""}
                        </div>
                        <div class="col-6" style={{ fontSize: "12px" }}>
                          {state.selectedPoolOptions
                            ? formatNumberBalanceToken(
                                state.selectedPoolOptions.tokenABalance
                              )
                            : ""}
                        </div>
                        <div class="col-6" style={{ fontSize: "12px" }}>
                          {state.selectedPoolOptions
                            ? formatNumberBalanceToken(
                                state.selectedPoolOptions.tokenBBalance
                              )
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="row" style={{ color: "white" }}>
                        <div class="col-4 PoolOptionDetails">TVL</div>
                        <div class="col-4 PoolOptionDetails">Vol. 24h</div>
                        <div class="col-4 PoolOptionDetails">Fees 24h</div>
                        <div class="col-4" style={{ fontSize: "10px" }}>
                          {state.selectedPoolOptions
                            ? formatNumber(state.selectedPoolOptions.tvl.amount)
                            : ""}
                        </div>
                        <div class="col-4" style={{ fontSize: "10px" }}>
                          {state.selectedPoolOptions
                            ? formatNumber(
                                state.selectedPoolOptions.volume.amount
                              )
                            : ""}
                        </div>
                        <div class="col-4" style={{ fontSize: "10px" }}>
                          {state.selectedPoolOptions
                            ? formatNumber(state.selectedPoolOptions.feeVolume)
                            : ""}
                        </div>
                        <div class="col-4" style={{ fontSize: "10px" }}>
                          {state.selectedPoolOptions ? (
                            <span
                              style={{
                                color:
                                  state.selectedPoolOptions.tvlChange < 0
                                    ? "rgba(255, 255, 255, 0.5)"
                                    : "rgb(38, 189, 0)",
                              }}
                            >
                              {state.selectedPoolOptions.tvlChange < 0
                                ? "↓"
                                : state.selectedPoolOptions.tvlChange == 0
                                ? ""
                                : "↑"}
                              {formatAPR(state.selectedPoolOptions.tvlChange)}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div class="col-4" style={{ fontSize: "10px" }}>
                          {state.selectedPoolOptions ? (
                            <span
                              style={{
                                color:
                                  state.selectedPoolOptions.volumeChange < 0
                                    ? "rgba(255, 255, 255, 0.5)"
                                    : "rgb(38, 189, 0)",
                              }}
                            >
                              {state.selectedPoolOptions.volumeChange < 0
                                ? "↓"
                                : state.selectedPoolOptions.volumeChange == 0
                                ? ""
                                : "↑"}
                              {formatAPR(
                                state.selectedPoolOptions.volumeChange
                              )}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div class="col-4" style={{ fontSize: "10px" }}>
                          {state.selectedPoolOptions ? (
                            <span
                              style={{
                                color:
                                  state.selectedPoolOptions.feeChange < 0
                                    ? "rgba(255, 255, 255, 0.5)"
                                    : "rgb(38, 189, 0)",
                              }}
                            >
                              {state.selectedPoolOptions.feeChange < 0
                                ? "↓"
                                : state.selectedPoolOptions.feeChange == 0
                                ? ""
                                : "↑"}
                              {formatAPR(state.selectedPoolOptions.feeChange)}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {state.step == 2 && (
              <div>
                <div class="titleStep">Select Mode</div>
                <br />
                <div class="SelectModeContainer">
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
                      <div class="SelectModeSelect">
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
                      class="PoolModeImg"
                    ></img>
                  )}
                </div>
              </div>
            )}
            {state.step == 3 && (
              <div style={{ height: "314px" }}>
                {state.poolModeSelected.name == "Mode Static" && (
                  <>
                    <div class="titleStep">Select Distribution</div>
                    <br />
                    <div class="RequiredAssetsContainer">
                      <div class="row SelectDistributionContainer">
                        <div
                          class="col-6"
                          style={{ display: "flex", justifyContent: "end" }}
                        >
                          <div class="SelectDistributionMode">
                            <div class="TokenSection">
                              <div class="TokenNameSection">
                                <div class="TokenAction">
                                  Distribution mode {"->"}
                                </div>
                                <select
                                  class="TokenNameSelect"
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
                <div class="titleStep">Required Assets</div>
                <br class="br-div" />
                <div
                  class="TokenABContainer"
                  style={{
                    filter:
                      state.poolModeSelected.name == "Mode Left"
                        ? "blur(3px)"
                        : "",
                  }}
                >
                  <div class="TokenSection">
                    {state.poolSelected ? (
                      <img
                        class="TokenImg"
                        src={state.poolSelected.tokenA.logoURI}
                      />
                    ) : null}
                    <div class="TokenNameSection" style={{ color: "white" }}>
                      <div class="TokenAction">Token A {"->"}</div>
                      {state.poolSelected.tokenA.symbol}
                    </div>
                  </div>
                  {state.poolModeSelected.name == "Mode Left" ? null : (
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
                <br class="br-div" />
                <div
                  class="TokenABContainer"
                  style={{
                    filter:
                      state.poolModeSelected.name == "Mode Right"
                        ? "blur(3px)"
                        : "",
                  }}
                >
                  <div class="TokenSection">
                    {state.poolSelected ? (
                      <img
                        class="TokenImg"
                        src={state.poolSelected.tokenB.logoURI}
                      />
                    ) : null}
                    <div class="TokenNameSection" style={{ color: "white" }}>
                      <div class="TokenAction">Token B {"->"}</div>
                      {state.poolSelected.tokenB.symbol}
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
                  <div
                    style={{
                      width: "110px",
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "4px",
                      height: "40px",
                      border: "1px solid #8D8DFD",
                    }}
                    onClick={back}
                  >
                    <div class={"ConfirmText"}>Back</div>
                  </div>
                )}
              </div>
              <div
                class="col-6"
                style={{ display: "flex", justifyContent: "right" }}
              >
                {state.step < 3 && state.poolList.length > 0 && (
                  <div
                    style={{
                      width: "110px",
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "4px",
                      background: "rgb(141, 141, 253)",
                      height: "40px",
                    }}
                    onClick={next}
                  >
                    <div class={"ConfirmText"}>Next</div>
                  </div>
                )}

                {state.step == 3
                  ? state.addingLiquidity
                    ? confirmButtonDisabled
                    : state.validation
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
                          state.amountInputTokenB < state.tokenBBalance.fixed
                        ? validateButton
                        : validateButtonDisabled
                      : validateButtonDisabled
                    : state.poolModeSelected.id == 1
                    ? state.tokenABalance
                      ? state.amountInputTokenA > 0 &&
                        state.amountInputTokenA < state.tokenABalance.fixed
                        ? validateButton
                        : validateButtonDisabled
                      : validateButtonDisabled
                    : state.tokenBBalance
                    ? state.amountInputTokenB > 0 &&
                      state.amountInputTokenB < state.tokenBBalance.fixed
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
          <div>
            <Web3Connect
              className="LoginButton ConfirmText"
              connectLabel="Connect Wallet"
            />
          </div>
        )}
      </div>
    </div>
  </Theme>
);
