const CLAIM_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "address[]", name: "_tokens", type: "address[]" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const account = Ethers.send("eth_requestAccounts", [])[0];
const { loading, market, dapp, record, supplies, onSuccess, onError } = props;

if (!loading || !dapp.rewardAddress) return "";

const { markets } = dapp;
const supplyAddrs = supplies.map((item) => item.address);
const nativeReward = Object.values(markets).find(
  (item) => item.symbol === "valBNB"
);
const vTokenAddrs = Object.values(markets)
  .filter((item) => supplyAddrs.includes(item.address))
  .map((item) => item.variableDebtTokenAddress);
const _tokens = [nativeReward.address, ...vTokenAddrs];

const CollateralContract = new ethers.Contract(
  dapp.rewardAddress,
  CLAIM_ABI,
  Ethers.provider().getSigner()
);

CollateralContract.claim(account, _tokens)
  .then((tx) => {
    tx.wait().then((res) => {
      onSuccess(res);
    });
  })
  .catch((err) => {
    onError(err);
  });

return "";
