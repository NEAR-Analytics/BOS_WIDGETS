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

const { market, actionText, amount, loading, onSuccess, onError } = props;
const account = Ethers.send("eth_requestAccounts", [])[0];
if (!loading || !account) return "";
const CNativeTokenContract = new ethers.Contract(
  "0x009a0b7C38B542208936F1179151CD08E2943833",
  [
    {
      inputs: [],
      name: "supply",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ],
  Ethers.provider().getSigner()
);
const CTokenContract = new ethers.Contract(
  "0x009a0b7C38B542208936F1179151CD08E2943833",
  CTOKEN_ABI,
  Ethers.provider().getSigner()
);

if (actionText === "Deposit") {
  if (market.underlyingToken.address === "native") {
    CNativeTokenContract.supply(market.address, 0, {
      value: ethers.utils.parseUnits(
        Big(amount).toFixed(market.underlyingToken.decimals).toString(),
        market.underlyingToken.decimals
      ),
    })
      .then((tx) => {
        tx.wait().then((res) => {
          onSuccess(res);
        });
      })
      .catch((err) => {
        onError(err);
      });
  } else {
    CTokenContract.supply(
      market.address,
      ethers.utils.parseUnits(
        Big(amount).toFixed(market.underlyingToken.decimals).toString(),
        market.underlyingToken.decimals
      ),
      {
        gasLimit: 50000,
      }
    )
      .then((tx) => {
        tx.wait().then((res) => {
          onSuccess(res);
        });
      })
      .catch((err) => {
        onError(err);
      });
  }
  return "";
}
if (actionText === "Withdraw") {
  CTokenContract.redeemUnderlying(
    market.address,
    ethers.utils.parseUnits(amount, market.underlyingToken.decimals)
  )
    .then((tx) => {
      tx.wait().then((res) => {
        onSuccess(res);
      });
    })
    .catch((err) => {
      onError();
    });
  return "";
}

if (actionText === "Borrow") {
  CTokenContract.borrow(
    market.address,
    ethers.utils.parseUnits(amount, market.underlyingToken.decimals)
  )
    .then((tx) => {
      tx.wait().then((res) => {
        onSuccess(res);
      });
    })
    .catch((err) => {
      console.log(err);
      onError();
    });
  return "";
}
if (actionText === "Repay") {
  CTokenContract.repayBorrow(
    market.address,
    ethers.utils.parseUnits(amount, market.underlyingToken.decimals)
  )
    .then((tx) => {
      tx.wait().then((res) => {
        onSuccess(res);
      });
    })
    .catch((err) => {
      console.log(err);
      onError();
    });
}

return "";
