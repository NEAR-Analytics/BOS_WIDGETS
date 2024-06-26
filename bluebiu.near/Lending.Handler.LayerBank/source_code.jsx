const CTOKEN_ABI = [
  {
    inputs: [
      { internalType: "address", name: "gToken", type: "address" },
      { internalType: "uint256", name: "uAmount", type: "uint256" },
    ],
    name: "supply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "gToken", type: "address" },
      { internalType: "uint256", name: "uAmount", type: "uint256" },
    ],
    name: "redeemUnderlying",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "gToken", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "borrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "gToken", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "repayBorrow",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const UNITROLLER_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "lTokens",
        type: "address[]",
      },
    ],
    name: "enterMarkets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "lToken",
        type: "address",
      },
    ],
    name: "exitMarket",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const { update, data, amount, account, onLoad } = props;

useEffect(() => {
  const isCollateral = data.actionText.includes("Collateral");
  if (!data.actionText || !data.underlyingToken) return;

  if (!isCollateral && !update) return;

  const isETH = data.underlyingToken.isNative;

  let options = {};
  let params = [];
  let method = "";
  let contract = null;

  if (["Deposit", "Repay", "Withdraw", "Borrow"].includes(data.actionText)) {
    if (!data.address || !amount) {
      return;
    }

    const parsedAmount = ethers.utils.parseUnits(
      Big(amount).toFixed(market.underlyingToken.decimals).toString(),
      data.underlyingToken.decimals
    );

    options = {
      value:
        isETH && (data.actionText === "Deposit" || data.actionText === "Repay")
          ? parsedAmount
          : 0,
      gasLimit: 4000000,
    };

    const CTokenContract = new ethers.Contract(
      data.config.unitrollerAddress,
      CTOKEN_ABI,
      Ethers.provider().getSigner()
    );

    contract = CTokenContract;

    if (data.actionText === "Deposit") {
      method = "supply";
      params = isETH ? [data.address, 0] : [data.address, parsedAmount];
    }

    if (data.actionText === "Withdraw") {
      method = "redeemUnderlying";
      params = [data.address, parsedAmount];
    }

    if (data.actionText === "Borrow") {
      method = "borrow";
      params = [data.address, parsedAmount];
    }

    if (data.actionText === "Repay") {
      method = "repayBorrow";
      params = isETH ? [data.address, 0] : [data.address, parsedAmount];
    }
  }

  if (isCollateral) {
    if (!data.config.unitrollerAddress || !data.underlyingToken) return;
    const isEnter = data.actionText === "Enable as Collateral";

    contract = new ethers.Contract(
      data.config.unitrollerAddress,
      UNITROLLER_ABI,
      Ethers.provider().getSigner()
    );

    method = isEnter ? "enterMarkets" : "exitMarket";

    params = isEnter ? [[data.address]] : [data.address];
  }

  if (!contract) return;

  const createTx = (gas) => {
    const _gas = gas ? Big(gas.toString()).mul(1.2).toFixed(0) : 4000000;
    contract.populateTransaction[method](...params, {
      ...options,
      gasLimit: _gas,
    })
      .then((res) => {
        onLoad({
          gas: _gas,
          unsignedTx: res,
          isError: false,
        });
      })
      .catch((err) => {
        onLoad({});
      });
  };

  contract.estimateGas[method](...params, options)
    .then((gas) => {
      console.log("estimateGas", gas);
      createTx(gas);
    })
    .catch((err) => {
      console.log("estimateGasError", err);
      createTx();
    });
}, [update]);

return "";
