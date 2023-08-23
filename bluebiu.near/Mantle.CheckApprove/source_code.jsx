const {
  tokenIn,
  selectedDex,
  config,
  sender,
  loadApprove,
  amountIn,
  isApprovedOut,
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

const queryString = `${tokenIn.address}-${selectedDex}-${isApprovedOut}`;

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
  tokenIn.address,
  Erc20Abi,
  Ethers.provider().getSigner()
);

const handleApprove = (amountIn, tokenIn) => {
  TokenContract.approve(
    selectedDexItem.factory,
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
    .catch(() => {});
};

const getAllowance = () => {
  TokenContract.allowance(sender, selectedDexItem.factory).then(
    (allowanceRaw) => {
      console.log("allowanceRaw: ", allowanceRaw);
      loadApprove({
        isApproved: !Big(Number(allowanceRaw._hex)).eq(0),
        handleApprove: handleApprove,
      });
      State.update({
        isApproved: !Big(Number(allowanceRaw._hex)).eq(0),
      });
    }
  );
};

if (tokenIn.symbol !== config.NATIVE_TOKEN_SYMBOL) {
  console.log("check allowance 11");

  getAllowance();
}

return <div></div>;
