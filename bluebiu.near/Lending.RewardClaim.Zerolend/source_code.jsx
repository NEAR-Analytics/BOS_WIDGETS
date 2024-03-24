const {
  account,
  loading,

  markets,
  rewardAddress,
  onSuccess,
  onError,
} = props;

if (!loading || !rewardAddress) return "";

const arr = markets
  .map((item) => [
    item.aTokenAddress,
    // item.stableDebtTokenAddress,
    item.variableDebtTokenAddress,
  ])
  .flat();
const addrs = [...new Set(arr)];

const claimProvider = new ethers.Contract(
  rewardAddress,
  [
    {
      inputs: [
        { internalType: "address[]", name: "assets", type: "address[]" },
        { internalType: "address", name: "to", type: "address" },
      ],
      name: "claimAllRewards",
      outputs: [
        {
          internalType: "address[]",
          name: "rewardsList",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "claimedAmounts",
          type: "uint256[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  Ethers.provider().getSigner()
);

claimProvider
  .claimAllRewards(addrs, account)
  .then((tx) => {
    tx.wait().then((res) => {
      onSuccess(res);
    });
  })
  .catch((err) => {
    onError(err);
  });

return "";
