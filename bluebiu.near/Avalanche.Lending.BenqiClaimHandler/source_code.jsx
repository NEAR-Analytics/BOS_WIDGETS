const CLAIM_ABI = [
  {
    constant: false,
    inputs: [
      {
        internalType: "uint8",
        name: "rewardType",
        type: "uint8",
      },
      {
        internalType: "address payable",
        name: "holder",
        type: "address",
      },
    ],
    name: "claimReward",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
const account = Ethers.send("eth_requestAccounts", [])[0];
const { loading, market, dapp, record, onSuccess, onError } = props;

if (!loading) return "";

const CollateralContract = new ethers.Contract(
  dapp.unitrollerAddress,
  CLAIM_ABI,
  Ethers.provider().getSigner()
);
console.log(record.symbol === "QI" ? 0 : 1, account);
CollateralContract.claimReward(record.symbol === "QI" ? 0 : 1, account)
  .then((tx) => {
    tx.wait().then((res) => {
      onSuccess(res);
    });
  })
  .catch(() => {
    onError();
  });

return "";
