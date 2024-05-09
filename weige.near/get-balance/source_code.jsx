const { onLoad, sender, inputToken, config } = props;

const chains = config.chains;

const address =
  props.chainId === chains.l1.id ? inputToken.addressL1 : inputToken.addressL2;

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

const parseBalance = (rawBalance) => {
  return Big(rawBalance).div(Big(10).pow(inputToken.decimals)).toFixed();
};

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
      onLoad({ balance: parseBalance(receiverBalanceHex.toString()) });
    });
};

const getNativeBalance = () => {
  const provider = Ethers.provider();
  provider.getBalance(sender).then((res) => {
    onLoad({
      balance: parseBalance(res.toString()),
    });
  });
};

if (inputToken.symbol == "ETH") {
  getNativeBalance();
} else {
  getErc20Balance();
}

return "";
