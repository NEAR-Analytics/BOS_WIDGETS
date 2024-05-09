const CTOKEN_ABI = [
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "uAmount", type: "uint256" },
    ],
    name: "supply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "redeemAmount", type: "uint256" },
    ],
    name: "redeemUnderlying",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "borrowAmount", type: "uint256" },
    ],
    name: "borrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "repayAmount", type: "uint256" }],
    name: "repayBorrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const { market, actionText, amount, loading, onSuccess, onError } = props;
const account = Ethers.send("eth_requestAccounts", [])[0];
if (!loading || !account) return "";

const CNativeTokenContract = new ethers.Contract(
  market.address,
  [
    {
      inputs: [account],
      name: "supply",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ],
  Ethers.provider().getSigner()
);

const CTokenContract = new ethers.Contract(
  market.address,
  CTOKEN_ABI,
  Ethers.provider().getSigner()
);

if (actionText === "Deposit") {
  if (market.underlyingToken.address === "native") {
    CNativeTokenContract.supply(account, 0, {
      value: ethers.utils.parseUnits(amount, market.underlyingToken.decimals),
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
      account,
      ethers.utils.parseUnits(amount, market.underlyingToken.decimals)
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
