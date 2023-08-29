const {
  token,
  config,
  sender,
  loadApprove,
  amountIn,
  isApprovedOut,
  forceReload,
  sourceBridge,
} = props;

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

const queryString = `${token.ethereum_address}-${token.near_address}-${isApprovedOut}-${forceReload}-${amountIn}`;

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

const handleApprove = (amountIn, tokenIn) => {
  TokenContract.approve(
    config.ethLockerAddress,
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

if (sourceBridge !== "eth" || !token.ethereum_address) {
  loadApprove({
    isApproved: true,
    forceReload: !forceReload,
    handleApprove,
  });

  return "";
}

const TokenContract = new ethers.Contract(
  token.ethereum_address,
  Erc20Abi,
  Ethers.provider().getSigner()
);

const getAllowance = () => {
  TokenContract.allowance(sender, config.ethLockerAddress).then(
    (allowanceRaw) => {
      const parsedAllowance = Big(Number(allowanceRaw._hex))
        .div(Big(10).pow(token.decimals))
        .toFixed();

      const isApproved = Number(parsedAllowance) >= Number(amountIn);

      loadApprove({
        isApproved: isApproved,
        handleApprove: handleApprove,
        forceReload: !forceReload,
      });
      State.update({
        isApproved: isApproved,
        forceReload: !forceReload,
      });
    }
  );
};

return "";
