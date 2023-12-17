State.init({
  selectedToken: 0,
});

const signer = Ethers.send("eth_requestAccounts", [])[0];

if (state.chainId === undefined && ethers !== undefined && signer) {
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

if (!signer || state.isError) {
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
  <div>
    <div class="dropdown">
      <button
        class="btn dropdown-toggle border"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedToken ? (
          <span>
            <img
              src={selectedToken.logoURI}
              width={36}
              height={36}
              className="rounded-full"
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
                  width={36}
                  height={36}
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

//  <option key={index} value={index}>
//               <img src={token.logoURI} width={36} height={36} />
//               <span>{token.symbol}</span>
//             </option>
// <select className="w-10 border rounded p-1 ">
//   {state.tokenList &&
//     state.tokenList.map((token, index) => (
//       <option key={index} value={index}>
//         <img src={token.logoURI} width={36} height={36} />
//         <span>{token.symbol}</span>
//       </option>
//     ))}
// </select>
