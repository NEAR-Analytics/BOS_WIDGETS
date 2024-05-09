const CTOKEN_ABI = [
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "mintAmount", type: "uint256" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
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
  {
    constant: false,
    inputs: [],
    name: "mintNative",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
];

const { market, actionText, amount, loading, onSuccess, onError } = props;

if (!loading) return "";

const CTokenContract = new ethers.Contract(
  market.address,
  CTOKEN_ABI,
  Ethers.provider().getSigner()
);

if (actionText === "Deposit") {
  if (market.underlyingToken.address === "native") {
    CTokenContract.mintNative({
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
    CTokenContract.mint(
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
