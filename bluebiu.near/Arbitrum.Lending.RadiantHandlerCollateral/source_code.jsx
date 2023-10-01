const abi = [
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "bool", name: "useAsCollateral", type: "bool" },
    ],
    name: "setUserUseReserveAsCollateral",
    outputs: [],
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
  data,
} = props;

if (!loading) return "";

const isEnter = actionText === "Enable as Collateral";

const CollateralContract = new ethers.Contract(
  data.lendingPoolAddress,
  abi,
  Ethers.provider().getSigner()
);

CollateralContract.setUserUseReserveAsCollateral(
  data.underlyingAsset.address,
  isEnter
)
  .then((tx) => {
    tx.wait().then((res) => {
      onSuccess(res);
    });
  })
  .catch(() => {
    onError();
  });

return "";
