const { address, chainId, onSuccess, onError } = props;

if (!address || !chainId) return;
if (!ethers.utils.isAddress(address)) return;

const TokenContract = new ethers.Contract(
  address,
  [
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
  ],
  Ethers.provider().getSigner()
);
const result = { address: address };
const keys = ["name", "symbol", "decimals"];
const getInfo = (key) => {
  TokenContract[key]()
    .then((res) => {
      result[key] = res;
      if (keys.length) {
        getInfo(keys.pop());
      } else {
        onSuccess(result);
      }
    })
    .catch((err) => {
      onError();
    });
};
getInfo(keys.pop());
