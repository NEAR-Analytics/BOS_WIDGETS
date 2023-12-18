State.init({
  selectedToken: 0,
});

const signer = Ethers.send("eth_requestAccounts", [])[0];

if (ethers !== undefined && signer) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });

        const tokenList = fetch(
          `https://raw.githubusercontent.com/SainyTK/token-list/main/src/tokens/${chainIdData.chainId}.json`
        );

        if (!tokenList.error) {
          State.update({
            tokenList: JSON.parse(tokenList.body),
            isError: false,
          });
        } else {
          State.update({ tokenList: [], isError: true });
        }
      }
    });
}

if (!signer) {
  return <Web3Connect />;
}

if (state.isError) {
  return <></>;
}

const selectedToken = state.tokenList[state.selectedToken];

function handleSelect(index) {
  State.update({ selectedToken: index });

  if (typeof props.onChange === "function") {
    props.onChange(state.tokenList[state.selectedToken]);
  }
}

return (
  <div style={{ width: "282px" }}>
    <div class="dropdown" style={{ width: "282px" }}>
      <button
        class="btn dropdown-toggle border"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          width: "282px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selectedToken ? (
          <span>
            <img
              src={selectedToken.logoURI}
              width={24}
              height={24}
              className="rounded-full mx-1"
            />
            <span>{selectedToken.symbol}</span>
          </span>
        ) : (
          <span>Select a token</span>
        )}
      </button>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {state.tokenList &&
          state.tokenList.map((token, index) => (
            <li key={index} onClick={() => handleSelect(index)}>
              <div class="dropdown-item" href="#">
                <img
                  src={token.logoURI}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>{token.symbol}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  </div>
);
