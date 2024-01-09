const image = props.image;
const onChange = props.onChange;

State.init({
  showTokenMetadataSection: false,
  showTokenTransferSection: false,
  url: image.url,
  nft: image.nft ?? {},
});

const showTokenMetadataSection = () => {
  const tokenData = Near.view(state.nft.contractId, "nft_token", {
    token_id: state.nft.tokenId,
  });
  State.update({
    showTokenMetadataSection: !state.showTokenMetadataSection,
    showTokenTransferSection: false,
    tokenData,
  });
};

const showTokenTransferSection = () => {
  State.update({
    showTokenMetadataSection: false,
    showTokenTransferSection: !state.showTokenTransferSection,
  });
};

const updateTokenData = () => {
  const tokenData = Near.view(state.nft.contractId, "nft_token", {
    token_id: state.nft.tokenId,
  });
  State.update({ tokenData });
  console.log(tokenData);
};

if (state.nft.contractId && state.nft.tokenId) {
  updateTokenData();
}

const handleReceiverIdChange = (event) => {
  State.update({
    showTokenMetadataSection: false,
    showTokenTransferSection: true,
    receiverId: event.target.value,
  });
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
        <input
          type="text"
          value={state.nft.contractId}
          disabled
          placeholder="Choose a NFT"
        />
        NFT token id
        <input
          type="text"
          value={state.nft.tokenId}
          onChange={updateTokenData}
          disabled
          placeholder="Choose a NFT"
        />
        {state.nft.contractId && state.nft.tokenId ? (
          <div>
            <button onClick={showTokenTransferSection}>Transfer</button>
            <button onClick={showTokenMetadataSection}>Show metadata</button>
          </div>
        ) : null}
        {state.showTokenTransferSection ? (
          <div>
            <input
              type="text"
              value={state.receiverId}
              placeholder="Enter receiver id"
              onChange={handleReceiverIdChange}
            />
            <button onClick={handleTransfer}>Send NFT</button>
          </div>
        ) : null}
        {state.showTokenMetadataSection && (
          <div>
            <div>
              <h5>Token metadata</h5>
            </div>
            <div>{"Title: " + state.tokenData.metadata.title}</div>
            <div>
              {"Description: " + (state.tokenData.metadata.description || "-")}
            </div>
            <div>{"Media: " + state.tokenData.metadata.media}</div>
            <div>{"Extra: " + (state.tokenData.metadata.extra || "-")}</div>
          </div>
        )}
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
