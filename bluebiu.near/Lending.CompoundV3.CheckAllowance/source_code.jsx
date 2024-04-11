const { account, spender, token, toast, onLoad } = props;

const checkAllowance = (amount, cb) => {
  const TokenContract = new ethers.Contract(
    token.address,
    [
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
    ],
    Ethers.provider().getSigner()
  );
  TokenContract.allowance(account, spender).then((allowanceRaw) => {
    cb(
      !allowanceRaw.lt(Big(amount).mul(Big(10).pow(token.decimals)).toFixed(0))
    );
  });
};

const handleApprove = (amount, onSuccess, onError) => {
  const toastId = toast?.loading({
    title: `Approve ${amount} ${token.symbol}`,
  });

  const TokenContract = new ethers.Contract(
    token.address,
    [
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
    ],
    Ethers.provider().getSigner()
  );
  TokenContract.approve(
    spender,
    ethers.utils.parseUnits(
      Big(amount).toFixed(token.decimals).toString(),
      token.decimals
    )
  )
    .then((tx) => {
      tx.wait().then((res) => {
        const { status, transactionHash } = res;
        toast?.dismiss(toastId);
        if (status !== 1) throw new Error("");
        onSuccess();
        toast?.success({
          title: "Approve Successfully!",
          text: `Approved ${amount} ${token.symbol}`,
          tx: transactionHash,
          chainId,
        });
        onApprovedSuccess();
      });
    })
    .catch((err) => {
      onError();
      toast?.dismiss(toastId);
      toast?.fail({
        title: "Approve Failed!",
        text: err?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : `Approved ${amount} ${token.symbol}`,
      });
    });
};

useEffect(() => {
  onLoad({
    checkAllowance,
    handleApprove,
  });
}, []);
