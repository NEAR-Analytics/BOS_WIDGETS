const wethContractAddress = "0x7b79995e5f793a07bc00c21412e50ecae098e7f9";

const wethAbi = fetch(
  "https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=0x7b79995e5f793a07bc00c21412e50ecae098e7f9"
);

if (!wethAbi.ok) return "loading...";

// const iface = new ethers.utils.Interface(borrowerOperationAbi.body);

const wrap = () => {
  const wethContract = new ethers.Contract(
    wethContractAddress,
    wethAbi.body.result,
    Ethers.provider().getSigner()
  );

  wethContract.deposit({
    value: ethers.BigNumber.from(
      (props.amount * 1000000000000000000).toString()
    ),
    // gasPrice: state.gasPrice,
    gasLimit: 25000000,
  });
};

const unwrap = () => {
  const wethContract = new ethers.Contract(
    wethContractAddress,
    wethAbi.body.result,
    Ethers.provider().getSigner()
  );

  wethContract.withdraw({
    ethers.BigNumber.from(
      (props.amount * 1000000000000000000).toString()
    ),
    value: ethers.BigNumber.from(
      (props.amount * 1000000000000000000).toString()
    ),
    // gasPrice: state.gasPrice,
    gasLimit: 25000000,
  });
};

if (
  state.sender &&
  state.chainId === 11155111 &&
  state.isOpenTrove === undefined
) {
  const troveManagerContract = new ethers.Contract(
    troveManagerAddress,
    troveManagerAbi.body,
    Ethers.provider().getSigner()
  );

  troveManagerContract.getTroveStatus(state.sender).then((res) => {
    const isOpenTrove = ethers.utils.formatEther(res).includes("1");
    State.update({ isOpenTrove });
  });
}

if (props.action === "wrap" && props.amount) {
} else if (props.action === "unwrap" && props.amount) {
} else {
  props.resendPrompt(props);
}

return <div></div>;
