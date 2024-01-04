State.init({
  showListNFTsSection: false,
  showMintNFTSection: false,
  showTokenMetadataSection: false,
});

const showListNFTsSection = () => {
  State.update({
    showListNFTsSection: !state.showListNFTsSection,
    showMintNFTSection: false,
  });
};

const showMintNFTSection = () => {
  State.update({
    showListNFTsSection: false,
    showMintNFTSection: !state.showMintNFTSection,
  });
};

const showTokenMetadataSection = () => {
  const tokenData = Near.view(state.nft.contractId, "nft_token", {
    token_id: state.nft.tokenId,
  });
  State.update({ showTokenMetadataSection: true, tokenData });
  console.log(tokenData);
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
        <div>
          <button onClick={showListNFTsSection}>List NFTs</button>
          <button onClick={showMintNFTSection}>Mint NFT</button>
        </div>
        <div>
          <div className="mt-2">
            {state.showListNFTsSection ? (
              <div>
                <h5>Your NFTs</h5>
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
                  disabled
                  placeholder="Choose a NFT"
                />
                {state.nft.contractId && state.nft.tokenId ? (
                  <div>
                    <button onClick={showTransferSection}>Transfer</button>
                    <button onClick={showTokenMetadataSection}>
                      Show metadata
                    </button>
                  </div>
                ) : null}
                {state.tokenData && (
                  <div>
                    <div>
                      <h5>Token metadata</h5>
                    </div>
                    <div>{"Title: " + state.tokenData.metadata.title}</div>
                    <div>
                      {"Description: " +
                        (state.tokenData.metadata.description || "-")}
                    </div>
                    <div>{"Media: " + state.tokenData.metadata.media}</div>
                    <div>
                      {"Extra: " + (state.tokenData.metadata.extra || "-")}
                    </div>
                  </div>
                )}
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
            ) : null}
          </div>
          <div className="mt-2">
            {state.showMintNFTSection ? (
              <Widget
                src={`cryptogarik.near/widget/MintNFT`}
                props={{
                  onChange: ({ contractId, tokenId }) => {
                    State.update({
                      nft: { contractId: contractId, tokenId: tokenId },
                    });
                  },
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  </div>
);
