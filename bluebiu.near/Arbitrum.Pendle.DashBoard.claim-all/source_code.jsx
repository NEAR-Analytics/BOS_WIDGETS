const { claimList, onLoadGas, onLoadFunc, sender, callback } = props;

if (claimList.length === 0) return "";

const DELAY = 1000 * 60 * 5;
const timer = Storage.privateGet("priceTimer");
const AccessKey = Storage.get(
  "AccessKey",
  "guessme.near/widget/ZKEVMWarmUp.add-to-quest-card"
);
function getPrice() {
  asyncFetch("/dapdap/get-token-price-by-dapdap", {
    Authorization: AccessKey,
  })
    .then((res) => {
      const data = JSON.parse(res.body);
      data.native = data.aurora;
      delete data.aurora;
      Storage.privateSet("tokensPrice", data);
      setTimeout(getPrice, DELAY);
    })
    .catch((err) => {
      setTimeout(getPrice, DELAY);
    });
}
if (!Storage.privateGet("priceTimer")) {
  getPrice();
  Storage.privateSet("priceTimer", 1);
}
console.log("getPrice: ", getPrice);

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "sys",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "yts",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "markets",
        type: "address[]",
      },
    ],
    name: "redeemDueInterestAndRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const prices = Storage.privateGet("tokensPrice");

const ETHPrice = prices?.["ETH"];
console.log("ETHPrice: ", ETHPrice);

const l2NodeUrl = "https://arb1.arbitrum.io/rpc";

const user = sender;

const signer = Ethers.provider().getSigner();

const sys = claimList
  .filter((claim) => claim.type === "SY")
  .map((claim) => claim.address);

const yts = claimList
  .filter((claim) => claim.type === "YT")
  .map((claim) => claim.address);

const markets = claimList
  .filter((claim) => claim.type === "PENDLE_LP")
  .map((claim) => claim.address);

const inputs = [user, sys, yts, markets];

//   use ethers to estimate gas on redeemDueInterestAndRewards

const contractAddress = "0x0000000001E4ef00d069e71d6bA041b0A16F7eA0";

const contract = new ethers.Contract(contractAddress, abi, signer);

const estimateGasPrice = () => {
  console.log("gas11111: ", claimList);

  const gasPrice = Ethers.getGasPrice();
  if (gasPrice) {
    State.update({ gasPrice: Number(gasPrice._hex).toString() });
  }
};

const estimateGasLimit = () => {
  // if (claimList.length === 0) return;

  const contractAddress = "0x0000000001E4ef00d069e71d6bA041b0A16F7eA0";

  const contract = new ethers.Contract(contractAddress, abi, signer);

  const iface = new ethers.utils.Interface(abi);

  console.log("inputs: ", inputs);

  contract.estimateGas
    .redeemDueInterestAndRewards(...inputs)
    .then((gasLimit) => {
      console.log("gasLimit111: ", gasLimit);
      State.update({ gasLimit });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

const claimAction = (gasLimit) => {
  const contract = new ethers.Contract(contractAddress, abi, signer);

  contract.redeemDueInterestAndRewards(...inputs, { gasLimit }).then((tx) => {
    callback(tx);
  });
};

if (!state.gasPrice) {
  estimateGasPrice();
}

const qs = claimList.length;

if (qs !== state.qs) {
  estimateGasLimit();
}

if (state.gasPrice && state.gasLimit && ETHPrice && qs !== state.qs) {
  console.log(
    "state.gasPrice  state.gasLimit: ",
    state.gasPrice.toString(),
    state.gasLimit.toString()
  );
  const cost = ethers.utils.formatEther(
    Big(state.gasPrice).times(Big(state.gasLimit)).toFixed()
  );

  const gasValue = "$" + parseFloat(Big(cost).times(Big(ETHPrice)).toFixed(8));

  if (state.gasLimit && qs !== state.qs) {
    onLoadFunc(() => claimAction(state.gasLimit));
  }

  onLoadGas({
    gasCost: cost + "ETH",
    gasValue,
  });

  State.update({
    qs,
  });
}
