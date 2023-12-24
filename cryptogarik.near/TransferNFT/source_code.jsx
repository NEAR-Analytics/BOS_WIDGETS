const image = props.image;
const onChange = props.onChange;

State.init({
  url: image.url,
  nft: image.nft ?? {},
  receiverId: "",
});

const handleReceiverIdChange = (event) => {
  State.update({
    receiverId: event.target.value,
  });
  console.log("receiverId: ", state.receiverId);
};

const handleTransfer = () => {
  if (!(state.nft.contractId && state.nft.tokenId && state.receiverId)) {
    return;
  }

  Near.call({
    contractName: state.nft.contractId,
    methodName: "nft_transfer",
    args: {
      token_id: state.nft.tokenId,
      receiver_id: state.receiverId,
    },
    deposit: 1,
  });
};

return (
  <div>
    <div
      className="p-2"
      style={{
        background: "#fdfdfd",
        border: "solid 1px #dee2e6",
        borderTop: 0,
        borderBottomLeftRadius: ".375rem",
        borderBottomRightRadius: ".375rem",
        minHeight: "9em",
      }}
    >
      <div>
        NFT contract
        <input type="text" value={state.nft.contractId} />
        NFT token id
        <input type="text" value={state.nft.tokenId} />
        Receiver id
        <input
          type="text"
          value={state.receiverId}
          onChange={handleReceiverIdChange}
        />
        <div>
          <button onClick={handleTransfer}>Transfer</button>
        </div>
        <div className="mt-2">
          <Widget
            src={`sainthiago.near/widget/nft-selector`}
            props={{
              onChange: ({ contractId, tokenId }) => {
                State.update({
                  nft: { contractId: contractId, tokenId: tokenId },
                });
              },
            }}
          />
        </div>
      </div>
    </div>
  </div>
);
