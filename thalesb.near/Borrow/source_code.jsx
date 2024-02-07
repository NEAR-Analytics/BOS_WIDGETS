State.init({
  refetchKey,
  forceRefetch: false,
});

const { getUserPosition } = VM.require("thalesb.near/widget/compound-requests");

const SectionHeader = styled.span`
  color: #fff;

  font-size: 18px;
  font-weight: 700;
`;

const abi = fetch(
  "https://docs.compound.finance/public/files/comet-interface-abi-98f438b.json"
);

if (!abi) return "Loading...";

useEffect(() => {
  if (Ethers.provider()) {
    Ethers.provider()
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        State.update({ address: accounts[0] });
      });
  }
}, [Ethers]);

useEffect(() => {
  if (!state.address) return;

  getUserPosition({
    userAddress: state.address,
    cometAddress: props.selectedItem.contractInfo.address,
    rpcUrl: props.selectedItem.contractInfo.httpRpcUrl,
    force: state.forceRefetch,
    collateralAssets: selectedItem.collateralAssets,
  }).then((position) => {
    State.update({ position, forceRefetch: false });
  });
}, [state.address, state.forceRefetch]);

function handleBorrowError(e) {
  if (props.addToast) {
    props.addToast(e?.reason || e?.message, "error");
  }

  console.error(e);
}

function borrow(amount) {
  const contract = new ethers.Contract(
    props.selectedItem.contractInfo.address,
    abi.body,
    Ethers.provider().getSigner()
  );

  contract
    .decimals()
    .then((decimals) => {
      contract
        .withdraw(
          props.selectedItem.address,
          ethers.utils.parseUnits(Number(amount).toFixed(decimals), decimals)
        )
        .then((tx) => {
          props.addToast(`Transaction sent ${tx.hash}`, "success");
          State.update({
            loadingBorrow: true,
          });
          tx.wait()
            .then(() => {
              props.addToast("Transaction confirmed", "success");
              State.update({ refetchKey: Math.random(), loadingBorrow: false });
            })
            .catch(handleBorrowError);
        })
        .catch(handleBorrowError);
    })
    .catch(handleBorrowError);
}

useEffect(() => {
  const interval = setInterval(() => {
    State.update({ forceRefetch: true });
  }, 15 * 1000);

  return () => {
    clearInterval(interval);
  };
}, []);

return (
  <Widget
    src="thalesb.near/widget/Input"
    props={{
      type: "borrow",
      onConfirm: (address, amount) => {
        borrow(amount);
      },
      loading: state.loadingBorrow,
      balance: Number(state.position.borrowCapacityBase || 0),
      min:
        state.position.minBorrowAmount &&
        state.position.borrowedInBase < state.position.minBorrowAmount
          ? state.position.minBorrowAmount
          : 0,
      selectedItem: props.selectedItem,
    }}
  />
);
