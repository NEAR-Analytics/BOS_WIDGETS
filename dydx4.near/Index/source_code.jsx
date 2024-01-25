const defaultChainId = 11155111;

if (state === undefined) {
  State.init({
    orderSize: "0.01",
    orderPrice: "2500",
    orderMarketId: "ETH-USD",
    orderType: "MARKET",
    nonce: 0,
  });

  // Auto refresh orders and account
  setInterval(() => {
    State.update((state) => ({
      ...state,
      nonce: state.account ? state.nonce + 1 : state.nonce,
    }));
  }, 3000);
}

const css = fetch(
  "https://plum-dear-manatee-739.mypinata.cloud/ipfs/QmQWyLP4c4XW36yUdx9AV7Ck8Zcqes9z8eX7aevySdYtHW"
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
console.log(state.theme);

const updateOrders = () => {
  const nonce = state.nonce ?? 0;
  State.update({ nonce: nonce + 1 });
};

const OrderMarket = styled.div`{
  display: inline-block;
  min-width: 180px;
  }`;
const OrderSide = styled.div`{
    min-width: 50px;
    text-align: center;
    display: inline-block;
    border-radius: 0.25rem;
    letter-spacing: 0.04em;
    user-select: none;
    padding: 0.156rem 0.219rem 0.156rem 0.25rem;
    color: ${(props) =>
      ["BUY", "LONG"].includes(props.side) ? "#21a677" : "#e45353"};
    background-color: ${(props) =>
      ["BUY", "LONG"].includes(props.side) ? "#3eb68a29" : "#d57676a1"};
}`;

const OrderSize = styled.div`{
    display: inline-block;
    text-align: center;
    min-width: 190px;
    border-radius: 0.25rem;
    letter-spacing: 0.04em;
    user-select: none;
    padding: 0.156rem 0.219rem 0.156rem 0.25rem;
    color: #757575;
    background-color: #d1d4dc;
}`;

const OrderAction = styled.div`{
    display: inline;
    text-align: center;
    min-width: 190px;
    border-radius: 0.25rem;
    letter-spacing: 0.04em;
    user-select: none;
    padding: 0.156rem 0.219rem 0.156rem 0.25rem;
}`;

const etherProviderEnabled = !!Ethers?.provider();

const switchNetwork = (chainId) => {
  if (etherProviderEnabled && chainId) {
    Ethers.send("wallet_switchEthereumChain", [
      { chainId: ethers.utils.hexValue(chainId) },
    ]);
  }
};

if (etherProviderEnabled) {
  Ethers.provider()
    .send("eth_chainId", [])
    .then((chainId) => {
      chainId = parseInt(chainId, 16);
      if (state.chainId !== chainId) {
        console.log("Set chainId", chainId);
        State.update({ chainId });
      }
    });

  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then((accounts) => {
      if (accounts.length && state.sender !== accounts[0]) {
        console.log("Set sender", accounts[0]);
        State.update({ sender: accounts[0] });
      }
    });
}

if (!state.sender) {
  return (
    <div class="mb-3">
      <Web3Connect connectLabel="Connect Web3 Wallet to continue" />
    </div>
  );
}

const stripHexPrefix = (input) => {
  if (input.indexOf("0x") === 0) {
    return input.slice(2);
  }

  return input;
};

const exportMnemonicAndPrivateKey = (entropy, path) => {
  const mnemonic = ethers.utils.entropyToMnemonic(entropy);
  // console.log("mnemonic", mnemonic);
  const seed = ethers.utils.mnemonicToSeed(mnemonic);
  const hdNode = ethers.utils.HDNode.fromSeed(seed);

  return {
    mnemonic,
    privateKey: hdNode.privateKey,
    publicKey: hdNode.publicKey,
  };
};

const deriveHDKeyFromEthereumSignature = (signature) => {
  const buffer = Buffer.from(stripHexPrefix(signature), "hex");

  if (buffer.length !== 65) {
    throw new Error("Signature must be 65 bytes");
  }

  // Remove the 'v' value by taking only the first 64 bytes of the signature
  const rsValues = buffer.subarray(0, 64);
  // Hash the 'r' and 's' values down to 32 bytes (256 bits) using Keccak-256
  const entropy = ethers.utils.keccak256(rsValues);

  return exportMnemonicAndPrivateKey(entropy);
};

let wallet;

const getWalletFromEvmSignature = (signature) => {
  console.log(signature);
  const { mnemonic, privateKey, publicKey } =
    deriveHDKeyFromEthereumSignature(signature);
  console.log("deriveHDKeyFromEthereumSignature", {
    mnemonic,
    privateKey,
    publicKey,
  });

  DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: "dydx",
  }).then((_wallet) => {
    wallet = new DirectSecp256k1HdWallet(mnemonic, {
      prefix: "dydx",
      seed: _wallet.seed,
    });
    console.log("derrived wallet", wallet);

    wallet
      .getAccounts()
      .then(([dydx_account]) => {
        console.log("dYdX account derived", dydx_account);
        State.update({
          dydx_account: dydx_account.address,
          wallet: wallet,
          mnemonic,
        });
        updateOrders();
      })
      .catch((err) => State.update({ error_msg: JSON.stringify(err) }));
  });
};

// console.log("state wallet", state.wallet);

const apiUrl = "https://indexer.v4testnet.dydx.exchange/v4";
const accountId = state.dydx_account;
const headers = {
  Accept: "application/json",
};

const loadAccount = () => {
  if (accountId) {
    asyncFetch(`${apiUrl}/addresses/${accountId}`, { headers })
      .then((r) =>
        State.update({
          account: r?.body?.subaccounts[0],
          all_accounts: r?.body,
        })
      )
      .catch((err) => State.update({ error_msg: JSON.stringify(err) }));
  }
};

const loadOrders = () => {
  if (accountId) {
    asyncFetch(
      `${apiUrl}/orders?address=${accountId}&subaccountNumber=0&limit=100`,
      {
        headers,
      }
    )
      .then((r) => {
        console.log("Fetch orders", r);
        State.update({ orders: r?.body });
      })
      .catch((err) => State.update({ error_msg: JSON.stringify(err) }));
  }
};

function getRandomClientId() {
  let min = 1000000;
  let max = 99999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const updateMarketPrice = () => {
  if (state.dydx_account && state.orderMarketId) {
    const url = `https://indexer.v4testnet.dydx.exchange/v4/perpetualMarkets?ticker=${state.orderMarketId}`;
    let data = fetch(url);
    if (data.ok) {
      console.log("perpetualMarkets", data);
      let price = data?.body?.markets?.[state.orderMarketId]?.oraclePrice;
      if (price) {
        State.update({ orderPrice: price });
        if (state.userOrderPrice === undefined) {
          State.update({ userOrderPrice: price });
        }
      }
    }
  }
};

const getNetwork = () => {
  let network_config = {
    env: "dydx-testnet-4",
    indexerConfig: {
      restEndpoint: "https://indexer.v4testnet.dydx.exchange",
      websocketEndpoint: "wss://indexer.v4testnet.dydx.exchange",
    },
    validatorConfig: {
      restEndpoint: "https://test-dydx.kingnodes.com",
      chainId: "dydx-testnet-4",
      denoms: {
        USDC_DENOM:
          "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
        USDC_DECIMALS: 6,
        USDC_GAS_DENOM: "uusdc",
        CHAINTOKEN_DENOM: "adv4tnt",
        CHAINTOKEN_DECIMALS: 18,
      },
      broadcastOptions: {
        broadcastPollIntervalMs: 3000,
        broadcastTimeoutMs: 60000,
      },
    },
  };

  return new Network(
    network_config.env,
    network_config.indexerConfig,
    network_config.validatorConfig
  );
};

const cancelUserOrder = (clientId, orderFlags, marketId) => {
  State.update({ is_loading: true });
  let params = {
    clientId,
    orderFlags,
    marketId,
    goodTilBlock: 0,
    goodTilTimeInSeconds: 999999,
  };

  cancelDydxOrder(getNetwork(), state.mnemonic, "dydx", 0, params)
    .then((cancelOrderResp) => {
      console.log("cancelOrderResp resp ", cancelOrderResp);
      State.update({ is_loading: false });
      updateOrders();
    })
    .catch((err) => State.update({ error_msg: JSON.stringify(err) }));
};

const placeUserOrder = (side) => {
  State.update({ is_loading: true });

  if (
    !state.orderMarketId ||
    !state.orderPrice ||
    !state.orderSize ||
    !state.orderType
  ) {
    console.log("NO DATA");
    return;
  }

  let marketId = state.orderMarketId;
  let type = state.orderType;
  let price = Number(state.userOrderPrice);
  let size = Number(state.orderSize);
  let clientId = getRandomClientId();
  let timeInForce = "GTT";
  let execution = "DEFAULT";
  let postOnly = false;
  let reduceOnly = false;

  let params = {
    marketId,
    type,
    side,
    price,
    size,
    clientId,
    timeInForce,
    goodTilTimeInSeconds: 999999,
    orderFlags: "0",
    execution,
    postOnly,
    reduceOnly,
    triggerPrice,
  };

  console.log(params);

  placeDydxOrder(getNetwork(), state.mnemonic, "dydx", 0, params)
    .then((placeOrderResp) => {
      console.log("placeOrder resp ", placeOrderResp);
      State.update({ is_loading: false });
      updateOrders();
    })
    .catch((err) => State.update({ error_msg: JSON.stringify(err) }));
};

if (state.dydx_account == undefined && state.chainId == defaultChainId) {
  const toSign = {
    domain: {
      name: "dYdX V4",
      chainId: defaultChainId,
    },
    primaryType: "dYdX",
    types: {
      dYdX: [{ name: "action", type: "string" }],
    },
    message: {
      action: "dYdX Chain Onboarding",
    },
  };

  return getWalletFromEvmSignature(
    "0x7eb5d09152acb9662b30d9bceb6e2142d5876439cbc9983df598c364b48f7eb76d41fc70436d93ad4875d307c891d104a3e8e33d23c17d041af4e0bb1057b6031c"
  );

  Ethers.provider()
    .getSigner()
    ._signTypedData(toSign.domain, { dYdX: toSign.types.dYdX }, toSign.message)
    .then((signature) => getWalletFromEvmSignature(signature));
} else {
  if (!!state.chainId && state.chainId !== defaultChainId) {
    return (
      <div>
        <div>{`Please switch to chainId ${defaultChainId}`}</div>
        <div>
          <button onClick={() => switchNetwork(defaultChainId)}>Switch</button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    loadAccount();
  }, [state.account]);

  useEffect(() => {
    loadOrders();
    updateMarketPrice();
  }, [state.nonce]);

  if (state?.account?.address) {
    getDydxAccountBalances(getNetwork(), state?.account?.address).then(
      (data) => {
        console.log("getDydxAccountBalances", data);
      }
    );
  }

  return (
    <Theme class="mb-5">
      {state.error_msg && (
        <div class="alert alert-primary" role="alert">
          {state.error_msg}
        </div>
      )}

      {state.is_loading && (
        <div class="alert alert-primary" role="alert">
          LOADING...
        </div>
      )}

      <div class="dydx-component-not">
        <div class="container-wrapper">
          <div class="container">
            <div class="header">
              <img
                class="dydx"
                src="https://plum-dear-manatee-739.mypinata.cloud/ipfs/QmStvRnpZbR1xxHgduM3diTswqgM9w4WtTJHYt4aN25ukL"
              />
              <div class="dydx-account">{state.dydx_account}</div>
              <div class="balance">
                <div class="collateral">
                  <div class="text-wrapper">Equity</div>
                  <div class="div">
                    ${Number(state.account.equity).toLocaleString()}
                  </div>
                </div>
                <div class="collateral">
                  <div class="text-wrapper">Free collateral</div>
                  <div class="div">
                    ${Number(state.account.freeCollateral).toLocaleString()}
                  </div>
                </div>
                <div class="collateral">
                  <div class="text-wrapper">{state.orderMarketId}</div>
                  <div class="div">
                    ${Number(state.orderPrice).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="component">
                <div class="heading">
                  <img
                    class="img"
                    src="https://plum-dear-manatee-739.mypinata.cloud/ipfs/QmbEJL2wNjLQ948Sa6fwvoidRWVWULeaXJsFYpNZ9qG9Kh"
                  />
                  <div class="title">Place Order {state.orderMarketId}</div>
                  <div class="tab">
                    <div
                      class={
                        state.orderType == "LIMIT"
                          ? "active-type"
                          : "inactive-type"
                      }
                      onClick={(e) => State.update({ orderType: "LIMIT" })}
                    >
                      <div class="text-wrapper-2">Limit</div>
                    </div>
                    <div
                      class={
                        state.orderType == "MARKET"
                          ? "active-type"
                          : "inactive-type"
                      }
                      onClick={(e) => State.update({ orderType: "MARKET" })}
                    >
                      <div class="text-wrapper-3">Market</div>
                    </div>
                  </div>
                </div>
                <div class="inputs">
                  <div class="div-2">
                    <div class="token-label">
                      <img
                        class="img"
                        src="https://plum-dear-manatee-739.mypinata.cloud/ipfs/Qme6bjSGWP8vjXqrXgbjHCNSwrc16cPYTREbo9aL2Uuuok"
                      />
                      <div class="text-wrapper-4">Amount</div>
                    </div>
                    <div class="amount">
                      <input
                        type="text"
                        class="text-wrapper-5 dark-bg input-textbox"
                        id="orderSize"
                        value={state.orderSize}
                        onChange={(e) =>
                          State.update({ orderSize: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {state.orderType == "LIMIT" && (
                    <div class="div-2">
                      <div class="token-label">
                        <img
                          class="img"
                          src="https://plum-dear-manatee-739.mypinata.cloud/ipfs/Qme6bjSGWP8vjXqrXgbjHCNSwrc16cPYTREbo9aL2Uuuok"
                        />
                        <div class="text-wrapper-4">Price</div>
                      </div>
                      <div class="amount">
                        <input
                          type="text"
                          class="text-wrapper-5 dark-bg input-textbox"
                          id="orderSize"
                          value={state.userOrderPrice}
                          onChange={(e) =>
                            State.update({ userOrderPrice: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div class="div-2">
                    <div class="token-label">
                      <div class="token">
                        <div class="text-wrapper-6">$</div>
                      </div>
                      <div class="text-wrapper-4">USD</div>
                    </div>
                    <div class="amount">
                      <div class="text-wrapper-5">
                        $
                        {(
                          Number(state.userOrderPrice ?? 0) *
                          Number(state.orderSize ?? 0)
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="summary">
                  <div class="div-3">
                    <div class="text-wrapper-7">Market price</div>
                    <div class="text-wrapper-8">${state.orderPrice}</div>
                  </div>
                </div>
                <div class="CTA">
                  <div class="buy">
                    <div
                      class="text-wrapper-12"
                      onClick={() => placeUserOrder("BUY")}
                    >
                      Buy
                    </div>
                  </div>
                  <div class="sell">
                    <div
                      class="text-wrapper-12"
                      onClick={() => placeUserOrder("SELL")}
                    >
                      Sell
                    </div>
                  </div>
                </div>
              </div>
              <div class="orders-log">
                <div class="heading">
                  <img
                    class="img"
                    src="https://plum-dear-manatee-739.mypinata.cloud/ipfs/QmbEJL2wNjLQ948Sa6fwvoidRWVWULeaXJsFYpNZ9qG9Kh"
                  />
                  <div class="title">Orders log</div>
                  <div class="refresh">
                    <div
                      class="text-wrapper-3 btn-refresh"
                      onClick={() => {
                        updateOrders();
                      }}
                    >
                      Refresh
                    </div>
                  </div>
                </div>
                <div class="transactions">
                  {(state.orders ?? []).length == 0 && (
                    <div class="text-wrapper-10">No transactions yet</div>
                  )}

                  {(state.orders ?? [])
                    .filter((order) =>
                      ["OPEN", "FILLED"].includes(order.status)
                    )
                    .map((order) => (
                      <div class="transaction">
                        <div class="pair">
                          <div
                            class={`order-log-${order.side.toLowerCase()}-wrapper`}
                          >
                            <div
                              class={`order-log-${order.side.toLowerCase()}`}
                            >
                              {order.side}
                            </div>
                          </div>
                          <div class="text-wrapper-14" title={order.status}>
                            {order.ticker}
                          </div>
                        </div>
                        <div class="p">
                          <span class="span">at</span>{" "}
                          <span class="text-wrapper-15"> ${order.price}</span>
                        </div>
                        <div class="p">
                          <span class="span">size</span>
                          <span class="text-wrapper-15"> {order.size} </span>
                          <span class="span">/ filled</span>
                          <span class="text-wrapper-15">
                            {" "}
                            {order.totalFilled}
                          </span>
                        </div>
                        <div class="time">
                          {order.updatedAt
                            ? new Date(order.updatedAt).toLocaleString()
                            : ""}
                        </div>

                        {order.status == "OPEN" && (
                          <div class="cancel">
                            <div
                              type="button"
                              class="text-wrapper-2"
                              aria-label="Close"
                              onClick={() => {
                                cancelUserOrder(
                                  order.clientId,
                                  64,
                                  order.ticker
                                );
                              }}
                            >
                              Cancel
                            </div>
                          </div>
                        )}
                        {order.status != "OPEN" && (
                          <div class="empty-cancel">
                            <div class="text-wrapper-2"></div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {state.account.address && (
        <div>
          <h2>Account Details</h2>
          <div>
            <div>Address: {state.account.address}</div>
            <div>Equity: ${state.account.equity}</div>
            <div>Free Collateral: ${state.account.freeCollateral}</div>

            {Object.keys(state.account.openPerpetualPositions ?? []).length >
              0 && (
              <>
                <h2 class="mt-5">Open Perpetual Positions</h2>
                {Object.keys(state.account.openPerpetualPositions ?? []).map(
                  (ticker) => {
                    let order = state.account.openPerpetualPositions[ticker];
                    return (
                      <div class="mb-2">
                        <OrderSide side={order.side}>{order.side}</OrderSide>
                        <OrderMarket>
                          {ticker} at ${Big(order.entryPrice).toFixed(4)}
                        </OrderMarket>{" "}
                        <OrderSize> Size: {order.size}</OrderSize>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : ""}
                        <OrderSize>
                          Realized PNL: {new Big(order.realizedPnl).toFixed(4)}
                        </OrderSize>
                        <OrderSize>
                          Unrealized PNL:{" "}
                          {new Big(order.unrealizedPnl).toFixed(4)}
                        </OrderSize>
                      </div>
                    );
                  }
                )}
              </>
            )}
          </div>
        </div>
      )}
      <div>
        <h2 class="mt-5">Place Order</h2>
        <div class="mb-3 row">
          <label for="orderPrice" class="col-sm-2 col-form-label">
            Type
          </label>
          <div class="col-sm-10">
            <select
              class="form-select"
              aria-label="Select a pair"
              onChange={(e) => State.update({ orderType: e.target.value })}
            >
              <option value="LIMIT" selected>
                Limit
              </option>
              <option value="MARKET">Market</option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label for="orderPrice" class="col-sm-2 col-form-label">
            Pair
          </label>
          <div class="col-sm-10">
            <select
              class="form-select"
              aria-label="Select a pair"
              onChange={(e) => {
                State.update({
                  orderMarketId: e.target.value,
                });
                updateOrders();
              }}
            >
              <option value="BTC-USD">BTC-USD</option>
              <option value="ETH-USD" selected>
                ETH-USD
              </option>
            </select>
          </div>
        </div>
        {state.orderType == "LIMIT" && (
          <div class="mb-3 row">
            <label for="orderPrice" class="col-sm-2 col-form-label">
              Price
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="orderPrice"
                value={state.userOrderPrice}
                onChange={(e) =>
                  State.update({ userOrderPrice: e.target.value })
                }
              />
              Current price: {state.orderPrice}
            </div>
          </div>
        )}
        <div class="mb-3 row">
          <label for="orderSize" class="col-sm-2 col-form-label">
            Size
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="orderSize"
              value={state.orderSize}
              onChange={(e) => State.update({ orderSize: e.target.value })}
            />
          </div>
        </div>

        <div class="mb-3 row">
          <div class="col">
            <button
              class="btn btn-success"
              onClick={() => placeUserOrder("BUY")}
            >
              Buy
            </button>
            <button
              class="btn btn-danger"
              onClick={() => placeUserOrder("SELL")}
            >
              Sell
            </button>
          </div>
        </div>
      </div>
      <div>
        {(state.orders ?? []).length == 0 && <div>Orders were not found</div>}
        {(state.orders ?? []).length > 0 && (
          <>
            <h2 class="mt-5">Orders Log</h2>
            {(state.orders ?? []).map((order) => (
              <div class="mb-2">
                {/*JSON.stringify(order)*/}
                <OrderSide side={order.side}>{order.side}</OrderSide>
                {order.status}
                <OrderMarket>
                  {order.ticker} at ${order.price}
                </OrderMarket>{" "}
                <OrderSize>
                  {" "}
                  Size: {order.size} / Filled: {order.totalFilled}
                </OrderSize>
                {order.updatedAt
                  ? new Date(order.updatedAt).toLocaleString()
                  : ""}
                {order.status == "OPEN" && (
                  <OrderAction>
                    <button
                      type="button"
                      class="btn-close btn-danger"
                      aria-label="Close"
                      onClick={() => {
                        cancelUserOrder(order.clientId, 64, order.ticker);
                      }}
                    ></button>
                  </OrderAction>
                )}
              </div>
            ))}
          </>
        )}
      </div>
      <button
        onClick={() => {
          updateOrders();
        }}
      >
        Refresh
      </button>
      <hr />
      {/*state:
      {JSON.stringify(state)}*/}
    </Theme>
  );
}

return (
  <>
    Ethereum Account: {state.sender}
    <Web3Connect connectLabel="Connect Web3 Wallet to continue" />
  </>
);
