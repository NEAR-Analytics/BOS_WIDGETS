const { token, sender, onLoad, forceReload } = props;

const { accountId } = context;

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

const shrinkToken = (value, decimals) => {
  return new Big(value || 0).div(Big(10).pow(decimals || 24));
};

const expandToken = (value, decimals) => {
  return new Big(value).mul(Big(10).pow(decimals));
};

const account = fetch("https://rpc.mainnet.near.org", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "dontcare",
    method: "query",
    params: {
      request_type: "view_account",
      finality: "final",
      account_id: accountId,
    },
  }),
});

const getBalanceNear = () => {
  let amount;

  if (!accountId) {
    return "0";
  }

  if (token.name === "NEAR") amount = account.body.result.amount;
  else {
    amount = Near.view(token.near_address, "ft_balance_of", {
      account_id: accountId,
    });
  }

  return !amount ? "0" : shrinkToken(amount, token.decimals).toFixed();
};

const getErc20Balance = () => {
  const Interface = new ethers.utils.Interface(Erc20Abi);
  return Ethers.provider()
    .call({
      to: token.ethereum_address,
      data: Interface.encodeFunctionData("balanceOf", [sender]),
    })
    .then((rawBalance) => {
      const receiverBalanceHex = Interface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );
      const rawAmount = receiverBalanceHex.toString();

      return shrinkToken(rawAmount, token.decimals).toFixed();
    });
};

const getNativeEthBalance = () => {
  const provider = Ethers.provider();
  return provider.getBalance(sender).then((rawBalance) => {
    return shrinkToken(rawBalance.toString(), token.decimals).toFixed();
  });
};

const ethBalance = () => {
  if (token.ethereum_address === "") {
    return getNativeEthBalance();
  } else {
    console.log("token111: ", token);

    return getErc20Balance();
  }
};

if (sender && onLoad && token) {
  const nearBalance = getBalanceNear();
  console.log("nearBalance: ", nearBalance);

  ethBalance().then((amount) => {
    console.log("eth amount: ", amount);
    onLoad({
      nearBalance,
      ethBalance: amount,
    });
  });
}

return "";
