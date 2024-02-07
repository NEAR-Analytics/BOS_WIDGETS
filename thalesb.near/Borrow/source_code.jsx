/**
 * Renders the Borrow component.
 * Allows the user to borrow a specified amount from a contract.
 *
 * @returns {JSX.Element} The Borrow component.
 */
const { getMinimumBorrowAmount } = VM.require(
  "thalesb.near/widget/compound-requests"
);

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
  getMinimumBorrowAmount({
    cometAddress: props.selectedItem.contractInfo.address,
    rpcUrl: props.selectedItem.contractInfo.httpRpcUrl,
  }).then((balance) => {
    State.update({ minimumBorrowAmount: balance });
  });
}, [props.selectedItem.contractInfo.address]);

function handleBorrowError(e) {
  if (props.addToast) {
    props.addToast(e?.reason || e?.message, "error");
  }

  console.error(e);
}

/**
 * Borrow function to withdraw a specified amount from a contract.
 *
 * @param {number} amount - The amount to be borrowed.
 */
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

return (
  <Widget
    src="thalesb.near/widget/Input"
    props={{
      type: "borrow",
      onConfirm: (address, amount) => {
        borrow(amount);
      },
      loading: state.loadingBorrow,
      balance: Math.floor((props.borrowBalance + Number.EPSILON) * 1000) / 1000,
      min:
        state.minimumBorrowAmount && props.borrowedBalance < 1
          ? state.minimumBorrowAmount
          : 0,
      selectedItem: props.selectedItem,
    }}
  />
);
