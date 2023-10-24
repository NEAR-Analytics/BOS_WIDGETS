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
if (!state.tokensLoaded) {
  // load tokens list from the Social DB
  const tokens = Social.get(`zavodil.near/tokens-db/*`, "final");

  if (tokens) {
    State.update({
      tokensLoaded: true,
      tokens,
    });
  }
}

const tokens = Object.keys(state.tokens ?? {});

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
