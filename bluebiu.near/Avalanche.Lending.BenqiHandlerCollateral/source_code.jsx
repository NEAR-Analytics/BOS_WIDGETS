//  if use as collateral

const UNITROLLER_ABI = [
  {
    constant: false,
    inputs: [
      { internalType: "address[]", name: "qiTokens", type: "address[]" },
    ],
    name: "enterMarkets",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "qiTokenAddress", type: "address" },
    ],
    name: "exitMarket",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const {
  actionText,
  loading,
  unitrollerAddress,
  marketAddress,
  onSuccess,
  onError,
} = props;

if (!loading) return "";

const isEnter = actionText === "Enable as Collateral";
const CollateralContract = new ethers.Contract(
  unitrollerAddress,
  UNITROLLER_ABI,
  Ethers.provider().getSigner()
);
const method = isEnter ? "enterMarkets" : "exitMarket";
const parameters = isEnter ? [marketAddress] : marketAddress;
CollateralContract[method](parameters)
  .then((tx) => {
    tx.wait().then((res) => {
      onSuccess(res);
    });
  })
  .catch(() => {
    onError();
  });

return "";
