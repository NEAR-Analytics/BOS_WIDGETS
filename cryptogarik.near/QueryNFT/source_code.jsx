const image = props.image;
const onChange = props.onChange;

State.init({
  url: image.url,
  nft: image.nft ?? {},
});

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
        <input
          type="text"
          value={state.nft.tokenId}
          onChange={updateTokenData}
        />
        {state.tokenData && (
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
