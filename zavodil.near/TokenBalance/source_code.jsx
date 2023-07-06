State.init({
  tokenId: props.tokenId ?? "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  network: props.network ?? "ETH",
});

const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/QmVLdPM2v8R5qxhshCbKSTNAwnxtVm8FD6bQznqiirAkMT"
).body;

console.log(state);

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
  <Theme>
    <Widget
      src="zavodil.near/widget/TokenData"
      props={{
        tokenId: state.tokenId,
        network: state.network,
        onLoad: (assetData) => {
          assetData.metadata.symbol = assetData.metadata.symbol.toUpperCase();
          State.update({ assetData });
        },
      }}
    />
    {state.assetData && (
      <button class="input-asset-token" style={{ paddingRight: "4px" }}>
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
              {state.assetData.balance_hr}
              {state.assetData.metadata.symbol}
            </span>
          </div>
        </span>
      </button>
    )}
  </Theme>
);
