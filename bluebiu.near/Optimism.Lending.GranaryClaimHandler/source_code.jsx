const CLAIM_ABI = [
  {
    inputs: [
      { internalType: "address[]", name: "assets", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "claimAllRewards",
    outputs: [
      {
        internalType: "address[]",
        name: "rewardTokens",
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
];
const account = Ethers.send("eth_requestAccounts", [])[0];
const { loading, market, dapp, onSuccess, onError } = props;

if (!loading) return "";

const CollateralContract = new ethers.Contract(
  dapp.rewardAddress,
  CLAIM_ABI,
  Ethers.provider().getSigner()
);
CollateralContract.claimAllRewards(market.allPools, account)
  .then((tx) => {
    tx.wait().then((res) => {
      onSuccess(res);
    });
  })
  .catch(() => {
    onError();
  });

return "";
