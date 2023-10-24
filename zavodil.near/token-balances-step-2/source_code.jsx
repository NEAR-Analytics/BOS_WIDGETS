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

// set list of tokens
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
      // decode responce
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex).toFixed(0);
    });
};

const loadCoingeckData = (tokenId) => {
  let dataUrl = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${tokenId}`;

  const data = fetch(dataUrl);
  if (data.ok) {
    return {
      name: data.body.name,
      symbol: data.body.symbol,
      icon: data.body.image.small,
      decimals: data.body.detail_platforms["ethereum"].decimal_place,
      price: Number(data.body.market_data.current_price.usd),
    };
  }
};

const loadTokensData = () => {
  // load balances of all tokens
  tokens.map((tokenId) => {
    getTokenBalance(state.sender, tokenId).then((value) => {
      // save balance of every token to the state
      State.update({ [tokenId]: { balance: value, ...state[tokenId] } });
    });
  });

  tokens.map((tokenId) => {
    const tokenData = loadCoingeckData(tokenId);
    // save balance of every token to the state
    State.update({ [tokenId]: { ...tokenData, ...state[tokenId] } });
  });
};

const renderToken = (tokenId) => {
  const tokenBalance = Big(state[tokenId].balance ?? 0)
    .div(new Big(10).pow(state[tokenId].decimals ?? 1))
    .toFixed(4);
  const tokenBalanceUSD = (tokenBalance * state[tokenId].price).toFixed(2);
  return (
    <li>
      {state[tokenId].name}: {tokenBalance}{" "}
      <img src={state[tokenId].icon} width="16" alt={state[tokenId].symbol} />
      {`(${tokenBalanceUSD} USD)`}
    </li>
  );
};

if (state.sender) {
  loadTokensData();

  return (
    <>
      <ul>{tokens.map((tokenId) => renderToken(tokenId))}</ul>

      <p>Your account: {state.sender} </p>
    </>
  );
} else {
  // output connect button
  return <Web3Connect />;
}
