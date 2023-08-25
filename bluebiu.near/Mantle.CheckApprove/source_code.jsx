const {
  tokenIn,
  selectedDex,
  config,
  sender,
  loadApprove,
  amountIn,
  isApprovedOut,
  forceReload,
} = props;
const selectedDexItem = config.dapps.find((dapp) => dapp.name === selectedDex);
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

const queryString = `${tokenIn.address}-${selectedDex}-${isApprovedOut}-${forceReload}-${amountIn}`;

State.init({
  isApproved: true,
});

if (queryString !== state.cacheString) {
  State.update({
    cacheString: queryString,
  });
} else {
  return <div></div>;
}

if (!sender) return <div></div>;

const TokenContract = new ethers.Contract(
  tokenIn.symbol === config.NATIVE_TOKEN_SYMBOL
    ? config.WRAP_NATIVE_TOKEN_ADDRESS
    : tokenIn.address,
  Erc20Abi,
  Ethers.provider().getSigner()
);

const handleApprove = (amountIn, tokenIn) => {
  TokenContract.approve(
    selectedDexItem.swapRouter,
    ethers.utils.parseUnits(amountIn, tokenIn.decimals)
  )
    .then((tx) => {
      tx.wait().then((res) => {
        const { status, transactionHash } = res;
        console.log("status: ", status);

        loadApprove({
          isApproved: status === 1,
          handleApprove: handleApprove,
        });
      });
    })
    .catch((e) => {
      console.log(e, "error:");
    });
};

const getAllowance = () => {
  TokenContract.allowance(sender, selectedDexItem.swapRouter).then(
    (allowanceRaw) => {
      const parsedAllowance = Big(Number(allowanceRaw._hex))
        .div(Big(10).pow(tokenIn.decimals))
        .toFixed();
      console.log(
        "allowanceRaw: ",
        Number(allowanceRaw._hex),
        parsedAllowance,
        amountIn
      );

      const isApproved = Number(parsedAllowance) >= Number(amountIn);

      loadApprove({
        isApproved: isApproved,
        handleApprove: handleApprove,
      });
      State.update({
        isApproved: isApproved,
      });
    }
  );
};

getAllowance();

return <div></div>;
