const { address } = props;
if (!address) {
  console.log("no address");
  return "";
}

const account = Ethers.send("eth_requestAccounts", [])[0];
if (!account) {
  console.log("no account");
  return "";
}

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
TokenContract.balanceOf(account).then((rawBalance) => {
  props?.onLoad(rawBalance._hex);
});

return "";
