// Load current sender address if it was not loaded yet
if (state.sender == undefined && Ethers.provider()) {
  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then((accounts) => {
      if (accounts.length) {
        // save sender address to the state
        State.update({ sender: accounts[0] });
      }
    });
}

// Load ERC20 ABI JSON
const erc20Abi = fetch(
  "https://ipfs.near.social/ipfs/bafkreifgw34kutqcnusv4yyv7gjscshc5jhrzw7up7pdabsuoxfhlnckrq"
);
if (!erc20Abi.ok) {
  return "Loading";
}

// Create contract interface
const iface = new ethers.utils.Interface(erc20Abi.body);

// specify list of tokens
const tokens = [
  "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
  "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
  "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // UNI
];

// load receiver's balance for a giver token
const getTokenBalance = (receiver, tokenId) => {
  // encode `balanceOf` request
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  // send request to the network
  return Ethers.provider()
    .call({
      to: tokenId,
      data: encodedData,
    })
    .then((rawBalance) => {
      // decode response
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex).toFixed(0);
    });
};

// async function signMessage() {
//   return await signer.signMessage("message");
// }

// const signMessage = () => {
//   //   Ethers.provider().signMessage("hello");
//   return Ethers.provider().signMessage("hello");
// };

const signMessage = () => {
  Ethers.provider()
    .getSigner()
    .signMessage("sss")
    .then((data) => {
      State.update({ signature: data });
      //   console.log("data :", data);
    });
};

const verifyMessageX = () => {
  Ethers.
    // .verifyMessage("sss", state.signature)
    .then((data) => {
      State.update({ verify: data });
      //   console.log("data :", data);
    });
}

const verifyMessageX2 = () => {
  Ethers.provider()
    .getSigner().
    // .verifyMessage("sss", state.signature)
    .then((data) => {
      State.update({ verify: data });
      //   console.log("data :", data);
    });
};

const loadTokensData = () => {
  // load balances of all tokens
  tokens.map((tokenId) => {
    getTokenBalance(state.sender, tokenId).then((value) => {
      // save balance of every token to the state
      State.update({ [tokenId]: { balance: value, ...state[tokenId] } });
    });
  });
};

const renderToken = (tokenId) => (
  <li>
    {tokenId}: {state[tokenId].balance}
  </li>
);

if (state.sender) {
  loadTokensData();

  return (
    <>
      <ul>{tokens.map((tokenId) => renderToken(tokenId))}</ul>
      <p>Your account: {state.sender} </p>
      <button onClick={signMessage}> signMessage </button>

      <button onClick={verifyMessageX2}> CheckMessage </button>

      {state.signature ? <a>Have </a> : <a>Not Have</a>}

      <h4>{state.signature}</h4>
      <h4> {state.verify} </h4>
    </>
  );
} else {
  // output connect button for anon user
  return <Web3Connect />;
}
