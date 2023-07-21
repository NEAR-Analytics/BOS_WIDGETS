State.init({ styles: undefined, tab: 1 });

if (state.user === undefined) {
  State.update({ user: Ethers.send("eth_requestAccounts", [])[0] });
}
if (!state.user) return <Web3Connect />;

if (state.chainId === undefined && ethers !== undefined && state.user) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

if (state.chainId !== undefined && state.chainId != 43113) {
  Ethers.send("wallet_switchEthereumChain", [
    {
      chainId: "0xA869", // Hex representation of the desired chainId (43113)
    },
  ]);

  return (
    <TWStyles>
      <p class="text-3xl">
        Your current network is not supported please switch to Avalanche Fuji
        C-Chain
      </p>
    </TWStyles>
  );
}

const css = fetch(
  "https://gist.githubusercontent.com/Pikqi/658b6ee444d26dd69f0d5150797077dd/raw/d8f929729176bb30d86e2839443fddb83a87a685/tw-all-classes.css",
);

if (!css.ok) {
  return <Widget src="nui.sking.near/widget/Feedback.Spinner" />;
}

if (!state.styles) {
  State.update({
    styles: styled.div`
      font-family:
        Manrope,
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        Fira Sans,
        Droid Sans,
        Helvetica Neue,
        sans-serif;
      ${css.body}
    `,
  });
}

const TWStyles = state.styles;

return (
  <TWStyles>
    <div class="flex gap-3" />
    <button onClick={() => State.update({ tab: 1 })}>TAB 1</button>
    <button onClick={() => State.update({ tab: 2 })}>TAB 2</button>
    {state.tab === 1 ? (
      <div class="flex flex-col flex-gap 3">
        {new Array(3).fill(0).map((item, index) => (
          <p>{index}</p>
        ))}
      </div>
    ) : (
      <h1>TAB 2</h1>
    )}
  </TWStyles>
);
