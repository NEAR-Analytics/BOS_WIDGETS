State.init({
  tokenId: props.tokenId ?? "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  network: props.network ?? "ETH",
  coinGeckoTokenId:
    props.coinGeckoTokenId ?? "0x6b175474e89094c44da98b954eedeac495271d0f",
  hideZeroBalance: props.hideZeroBalance ?? true,
  fractionDigits: props.fractionDigits ?? 2,
});

const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/QmVLdPM2v8R5qxhshCbKSTNAwnxtVm8FD6bQznqiirAkMT"
).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}
`,
  });
}
const Theme = state.theme;

return (
  <>
    <Widget
      src="zavodil.near/widget/TokenData2"
      props={{
        tokenId: state.tokenId,
        coinGeckoTokenId: state.coinGeckoTokenId,
        network: state.network,
        onLoad: (assetData) => {
          assetData.metadata.symbol = assetData.metadata.symbol.toUpperCase();
          State.update({ assetData });
        },
      }}
    />
    <Theme>
      {state.assetData &&
        (!state.hideZeroBalance ||
          parseFloat(state.assetData.balance_hr).toFixed(state.fractionDigits) >
            0) && (
          <button
            class="input-asset-token"
            style={{ paddingRight: "4px", display: "inline-block" }}
          >
            <span class="input-asset-token-menu">
              <div class="input-asset-token-name">
                <div class="input-asset-token-icon">
                  {state.assetData.metadata.icon ? (
                    <img
                      alt={`${state.assetData.metadata.name} logo`}
                      src={state.assetData.metadata.icon}
                      class="input-asset-token-icon-img"
                    />
                  ) : (
                    <>Undefined</>
                  )}
                </div>
                <span class="input-asset-token-ticker">
                  {parseFloat(state.assetData.balance_hr).toFixed(
                    state.fractionDigits
                  )}
                  {state.assetData.metadata.symbol}
                </span>
              </div>
            </span>
          </button>
        )}
    </Theme>
  </>
);
