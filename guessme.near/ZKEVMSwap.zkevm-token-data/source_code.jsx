const { tokenId, coinGeckoTokenId } = props;

const wethAddress = "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9";

const ethAddress = "0x0000000000000000000000000000000000000000";

const accountId = context.accountId;
const debug = props.debug ?? false;

const NETWORK_ETH = "ETH";
const NETWORK_ZKSYNC = "ZKSYNC";
const NETWORK_ZKEVM = "ZKEVM";
const NETWORK_AURORA = "AURORA";
const NETWORK_POLYGON = "POLYGON";

const network = NETWORK_ZKEVM;

if (!tokenId) return;

const getErc20Balance = (tokenId, receiver) => {
  const iface = new ethers.utils.Interface(state.erc20Abi);

  // find out token decimals
  const encodedTokenDecimalsData = iface.encodeFunctionData("decimals", []);

  return Ethers.provider()
    .call({
      to: tokenId,
      data: encodedTokenDecimalsData,
    })
    .then((tokenDecimalsHex) => {
      const tokenDecimals = iface.decodeFunctionResult(
        "decimals",
        tokenDecimalsHex
      );

      const encodedBalanceData = iface.encodeFunctionData("balanceOf", [
        receiver,
      ]);

      return Ethers.provider()
        .call({
          to: tokenId,
          data: encodedBalanceData,
        })
        .then((rawBalance) => {
          const receiverBalanceHex = iface.decodeFunctionResult(
            "balanceOf",
            rawBalance
          );

          return {
            decimals: tokenDecimals[0],
            balance: Big(receiverBalanceHex).toFixed(),
          };
        });
    });
};

const getErc20Tokendata = (tokenId) => {
  let dataUrl = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${tokenId}`;

  const data = fetch(dataUrl);
  if (!data.ok) {
    return "Loading";
  }

  const tokenData = data.body;
  const metadata = {
    name: tokenData.name,
    symbol: tokenData.symbol,
    icon: tokenData.image.small,
  };

  const price = Number(tokenData.market_data.current_price.usd);

  return { metadata, price };
};

const getNativeBalance = () => {
  const provider = Ethers.provider();
  return provider.getBalance(state.ethAccountId).then((rawBalance) => {
    return rawBalance.toString();
  });
};

const ethMetadata = {
  icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
  name: "ETH",
  symbol: "ETH",
  decimals: 18,
};

const USDCMetadata = {
  icon: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
  name: "USDC Coin",
  symbol: "USDC",
  decimals: 6,
};

const tokenMetas = {
  "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035": USDCMetadata,
  "0x0000000000000000000000000000000000000000": ethMetadata,
  "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9": {
    icon: "https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295",
    name: "Wrapped Ether",
    symbol: "WETH",
    decimals: 18,
  },
  "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1": {
    name: "Wrapped BTC",
    symbol: "WBTC",
    decimals: 8,
    icon: "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744",
  },
  "0xa2036f0538221a77a3937f1379699f44945018d0": {
    symbol: "MATIC",
    name: "Matic Token",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
  },
  "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4": {
    symbol: "DAI",
    name: "Dai Stablecoin",
    decimals: 18,
    icon: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508",
  },
  "0x1E4a5963aBFD975d8c9021ce480b42188849D41d": {
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
    icon: "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707",
  },
};

if (state.ethAccountId === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ ethAccountId: accounts[0] });
  }
}

if (state.erc20Abi === undefined) {
  const erc20Abi = fetch(
    "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
  );
  if (!erc20Abi.ok) {
    return "Loading";
  }

  State.update({ erc20Abi: erc20Abi.body });
}

if (state.ethAccountId && state.erc20Abi) {
  if (tokenId !== ethAddress) {
    getErc20Balance(tokenId, state.ethAccountId).then(
      ({ decimals, balance }) => {
        if (balance !== undefined && balance !== null) {
          State.update({ balance });
        }
        if (state.metadata !== undefined) {
          const metadata = state.metadata;
          metadata.decimals = decimals;
          State.update({ metadata });
        }
        State.update({ tokenDecimals: decimals });
      }
    );

    let tokenIdForCoingeckoAPI;
    if ([NETWORK_ZKSYNC, NETWORK_ZKEVM, NETWORK_POLYGON].includes(network)) {
      tokenIdForCoingeckoAPI = coinGeckoTokenId;
    }

    const { metadata, price } = getErc20Tokendata(tokenIdForCoingeckoAPI);
    console.log("metadata: ", metadata);

    if (state.tokenDecimals && metadata && !metadata.decimals) {
      metadata.decimals = state.tokenDecimals;
    }

    State.update({
      metadata: tokenMetas[tokenId] || metadata,
      price,
    });
  } else {
    getNativeBalance().then((balance) => {
      State.update({ balance, tokenDecimals: 18, metadata: ethMetadata });
    });

    const { price } = getErc20Tokendata(coinGeckoTokenId);

    if (state.tokenDecimals && metadata && !metadata.decimals) {
      metadata.decimals = state.tokenDecimals;
    }
    State.update({ metadata: ethMetadata, price });
  }
}

if (
  state.balance !== undefined &&
  state.balance !== null

  // &&
  // state.metadata !== undefined &&
  // state.price !== undefined
) {
  const res = {
    balance: state.balance,
    balance_hr: new Big(state?.balance ?? 0)
      .div(new Big(10).pow(state?.metadata?.decimals ?? 1))
      .toFixed(4),
    balance_hr_full: new Big(state?.balance ?? 0)
      .div(new Big(10).pow(state?.metadata?.decimals ?? 1))
      .toFixed(),
    price: state.price,
    metadata: state.metadata,
  };

  if (typeof props.onLoad === "function") {
    props.onLoad(res);
    console.log("res: ", res);
  }
}

return <div />;
