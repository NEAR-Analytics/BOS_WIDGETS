const { address, chainIdNotSupport } = props;

if (!address) return "";

if (chainIdNotSupport) return "";

const account = Ethers.send("eth_requestAccounts", [])[0];
if (!account) return "";

if (address === "native") {
  const provider = Ethers.provider();
  provider.getBalance(account).then((rawBalance) => {
    props?.onLoad(rawBalance._hex);
  });
  return "";
}
const TokenContract = new ethers.Contract(
  address,
  [
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ],
  Ethers.provider().getSigner()
);
TokenContract.balanceOf(account)
  .then((rawBalance) => {
    props?.onLoad(rawBalance._hex);
  })
  .catch((err) => {});

return "";
