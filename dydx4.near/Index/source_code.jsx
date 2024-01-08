State.init({
  orderSize: "0.0001",
  orderPrice: "2500",
  orderMarketId: "ETH-USD",
  orderType: "LIMIT",
  nonce: 0,
});

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

const etherProviderEnabled = !!Ethers?.provider();

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

    wallet.getAccounts().then(([dydx_account]) => {
      console.log("dYdX account derived", dydx_account);
      State.update({
        dydx_account: dydx_account.address,
        wallet: wallet,
        mnemonic,
        updateMarketPrice: true,
      });
    });
  });
};

// console.log("state wallet", state.wallet);

const apiUrl = "https://indexer.v4testnet.dydx.exchange/v4";
const accountId = state.dydx_account;
const headers = {
  Accept: "application/json",
};

const loadAccount = () => {
  asyncFetch(`${apiUrl}/addresses/${accountId}`, { headers }).then((r) =>
    State.update({ account: r?.body?.subaccounts[0], all_accounts: r?.body })
  );

  asyncFetch(
    `${apiUrl}/orders?address=${accountId}&subaccountNumber=0&limit=100`,
    {
      headers,
    }
  ).then((r) => State.update({ orders: r?.body }));
};

function getRandomClientId() {
  let min = 1000000;
  let max = 99999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const updateOrders = () => {
  const nonce = state.nonce ?? 0;
  State.update({ nonce: nonce + 1 });
};

if (state.updateMarketPrice == true) {
  const url = `https://indexer.v4testnet.dydx.exchange/v4/perpetualMarkets?ticker=${state.orderMarketId}`;
  let data = fetch(url);
  if (data.ok) {
    console.log(data);
    let price = data?.body?.markets?.[state.orderMarketId]?.oraclePrice;
    if (price) {
      State.update({ orderPrice: price, updateMarketPrice: false });
    } else {
      State.update({ updateMarketPrice: false });
    }
  }
}

const placeUserOrder = (side) => {
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
  let price = Number(state.orderPrice);
  let size = Number(state.orderSize);
  let clientId = getRandomClientId();
  let timeInForce = "GTT";
  let execution = "DEFAULT";
  let postOnly = false;
  let reduceOnly = false;

  let network_config = {
    env: "dydx-testnet-4",
    indexerConfig: {
      restEndpoint: "https://dydx-testnet.imperator.co",
      websocketEndpoint: "wss://dydx-testnet.imperator.co/v4/ws",
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

  let network = new Network(
    network_config.env,
    network_config.indexerConfig,
    network_config.validatorConfig
  );

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

  placeOrder(network, state.mnemonic, "dydx", 0, params).then(
    (placeOrderResp) => {
      console.log("placeOrder resp ", placeOrderResp);
      updateOrders();
    }
  );
};

if (state.dydx_account == undefined) {
  const toSign = {
    domain: {
      name: "dYdX V4",
      chainId: 5,
    },
    primaryType: "dYdX",
    types: {
      dYdX: [{ name: "action", type: "string" }],
    },
    message: {
      action: "dYdX Chain Onboarding",
    },
  };

  /*return getWalletFromEvmSignature(
    "0x4405ee8175ef8e4b0f760145f732badb93b0c826f69108d10339a4e32648d97a377dd3119ff98d8260a18aa3b221adb56d29ccd2361fcbe5474e2cbc14b949561c"
  );*/

  Ethers.provider()
    .getSigner()
    ._signTypedData(toSign.domain, { dYdX: toSign.types.dYdX }, toSign.message)
    .then((signature) => getWalletFromEvmSignature(signature));
} else {
  useEffect(() => {
    loadAccount();
  }, [state.account, state.orders, state.nonce]);

  return (
    <div class="mb-5">
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
              onChange={(e) =>
                State.update({
                  orderMarketId: e.target.value,
                  updateMarketPrice: true,
                })
              }
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
                value={state.orderPrice}
                onChange={(e) => State.update({ orderPrice: e.target.value })}
              />
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
                <OrderSide side={order.side}>{order.side}</OrderSide>
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
      {/*
      <hr />
      state:
      {JSON.stringify(state)}
      */}
    </div>
  );
}

return (
  <>
    Ethereum Account: {state.sender}
    <Web3Connect connectLabel="Connect Web3 Wallet to continue" />
  </>
);
