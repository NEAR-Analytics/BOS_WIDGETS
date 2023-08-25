const { address, onLoad, isNative } = props;
if (!address) return "";

const Erc20Abi = [
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
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return "";
if (!Erc20Abi) return "";

const getErc20Balance = () => {
  const Interface = new ethers.utils.Interface(Erc20Abi);
  return Ethers.provider()
    .call({
      to: address,
      data: Interface.encodeFunctionData("balanceOf", [sender]),
    })
    .then((rawBalance) => {
      const receiverBalanceHex = Interface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      onLoad({ balance: receiverBalanceHex.toString(), loaded: true });
    });
};

const getNativeBalance = () => {
  const provider = Ethers.provider();
  provider.getBalance(sender).then((rawBalance) => {
    console.log("rawBalance: ", rawBalance.toString());
    onLoad({
      balance: rawBalance.toString(),
      loaded: true,
    });
  });
};

if (isNative) {
  getNativeBalance();
} else {
  getErc20Balance();
}

return <div></div>;
