const CLAIM_ABI = [
  {
    inputs: [
      { internalType: "address", name: "holder", type: "address" },
      {
        internalType: "contract PToken[]",
        name: "pTokens",
        type: "address[]",
      },
    ],
    name: "claimWpc",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const account = Ethers.send("eth_requestAccounts", [])[0];
const { loading, market, dapp, record, onSuccess, onError } = props;

if (!loading || !dapp.rewardAddress) return "";

const RewardContract = new ethers.Contract(
  dapp.rewardAddress,
  CLAIM_ABI,
  Ethers.provider().getSigner()
);

RewardContract.claimWpc()
  .then((tx) => {
    tx.wait().then((res) => {
      onSuccess(res);
    });
  })
  .catch((err) => {
    onError(err);
  });

return "";
