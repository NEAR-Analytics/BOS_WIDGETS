const { address, updateTokenBalance } = props;

const _account = Ethers.send("eth_requestAccounts", [])[0]

useEffect(() => {
  if (!address || !updateTokenBalance) return;
  const account = props.account || _account;

  if (!account) return;

  if (address === "native") {
    const provider = Ethers.provider();
    provider.getBalance(account).then((rawBalance) => {
      props?.onLoad(rawBalance._hex);
    });
    return;
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
    .catch((err) => {
      console.log(err);
    });
}, [address, updateTokenBalance]);

return "";
