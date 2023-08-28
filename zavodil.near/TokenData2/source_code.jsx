const { tokenId, coinGeckoTokenId } = props;

const accountId = context.accountId;
const debug = props.debug ?? false;

const NETWORK_NEAR = "NEAR";
const NETWORK_ETH = "ETH";
const NETWORK_ZKSYNC = "ZKSYNC";
const NETWORK_ZKEVM = "ZKEVM";
const NETWORK_AURORA = "AURORA";
const NETWORK_POLYGON = "POLYGON";
const NETWORK_MANTLE = "MANTLE";

const network = props.network ?? NETWORK_NEAR;
const coingeckoNetworkHandle = props.coingeckoNetworkHandle;

if (!tokenId) return;

if (
  state.balance !== null &&
  state.balance !== undefined &&
  state.metadata !== undefined &&
  state.price !== undefined
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
  }

  return debug ? <>Debug: {JSON.stringify(res)}</> : <div />;
}

// HELPER METHODS FOR NETWORKS

// NEAR **************

const NEAR_LOGO = `data:image/svg+xml,%3Csvg width='35' height='35' fill='none' xmlns='http://www.w3.org/2000/svg' class='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv' focusable='false' aria-hidden='true' viewBox='0 0 35 35' style='width: 35px; height: 35px; filter: invert(100%25);'%3E%3Ccircle cx='17.5' cy='17.5' r='17.5' fill='%23fff'%3E%3C/circle%3E%3Cpath d='m24.027 9.022-4.174 6.2c-.288.422.267.934.666.578l4.107-3.578c.111-.089.266-.022.266.134v11.177c0 .156-.2.223-.288.111L12.174 8.756A2.053 2.053 0 0 0 10.552 8h-.444C8.954 8 8 8.956 8 10.133v15.734C8 27.044 8.954 28 10.131 28a2.14 2.14 0 0 0 1.82-1.022l4.173-6.2c.289-.422-.266-.934-.666-.578l-4.106 3.556c-.111.088-.267.022-.267-.134V12.467c0-.156.2-.223.289-.111l12.43 14.888c.4.49 1 .756 1.621.756h.444A2.133 2.133 0 0 0 28 25.867V10.133A2.133 2.133 0 0 0 25.869 8a2.15 2.15 0 0 0-1.842 1.022Z' fill='%23000'%3E%3C/path%3E%3C/svg%3E`;

const getNearNativeBalance = () => {
  const account = fetch("https://rpc.mainnet.near.org", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      },
    }),
  });
  if (!account) return;
  else return account?.body?.result?.amount;
};

const getRefPrice = (tokenId) => {
  const refPricesResponse = fetch(
    "https://indexer.ref.finance/list-token-price"
  );
  if (!refPricesResponse) return 0;
  const refPrices = JSON.parse(refPricesResponse.body);
  return parseFloat(refPrices?.[tokenId]?.price ?? 0);
};

// ETH *******************************
const getErc20Balance = (tokenId, receiver) => {
  const iface = new ethers.utils.Interface(state.erc20Abi);

  // find out token balance
  const encodedBalanceData = iface.encodeFunctionData("balanceOf", [receiver]);

  Ethers.provider()
    .call({
      to: tokenId,
      data: encodedBalanceData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      State.update({
        balance: Big(receiverBalanceHex).toFixed(),
      });
    });
};

const getErc20Tokendata = (tokenId) => {
  let dataUrl = `https://api.coingecko.com/api/v3/coins/${
    coingeckoNetworkHandle ?? "ethereum"
  }/contract/${tokenId}`;

  const data = fetch(dataUrl);
  if (!data.ok) {
    return "Loading";
  }

  const tokenData = data.body;

  const metadata = {
    name: tokenData.name,
    symbol: tokenData.symbol,
    icon: tokenData.image.small,
    decimals: tokenData.detail_platforms["ethereum"].decimal_place,
  };

  const price = Number(tokenData.market_data.current_price.usd);

  State.update({ metadata, price });
};

// DATA CONNECTOR *******************

switch (network) {
  case NETWORK_NEAR: {
    let balance, metadata, price;
    if (tokenId === "NEAR") {
      metadata = {
        name: "NEAR",
        symbol: "NEAR",
        icon: NEAR_LOGO,
        decimals: 24,
      };

      // NATIVE NEAR BALANCE
      balance = getNearNativeBalance();

      // REF PRICE
      price = getRefPrice("wrap.near");
    } else {
      // FT METADATA
      metadata = Near.view(tokenId, "ft_metadata");
      if (!metadata) return;
      metadata.icon = metadata.icon ?? NEAR_LOGO;

      // FT BALANCE
      balance = Near.view(tokenId, "ft_balance_of", {
        account_id: accountId,
      });

      // REF PRICE
      price = getRefPrice(tokenId);
    }
    State.update({
      balance,
      metadata,
      price,
    });

    break;
  }
  case NETWORK_ETH:
  case NETWORK_ZKSYNC:
  case NETWORK_AURORA:
  case NETWORK_ZKEVM:
  case NETWORK_POLYGON:
  case NETWORK_MANTLE: {
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

    let tokenIdForCoingeckoAPI =
      !!coingeckoNetworkHandle || !coingeckoNetworkHandle
        ? tokenId
        : coinGeckoTokenId;

    // LOAD TOKEN METADATA & PRICE
    getErc20Tokendata(tokenIdForCoingeckoAPI);

    // LOAD TOKEN BALANCE
    if (state.ethAccountId && state.erc20Abi && state.metadata?.decimals) {
      getErc20Balance(tokenId, state.ethAccountId);
    }

    break;
  }
}

return <div />;
