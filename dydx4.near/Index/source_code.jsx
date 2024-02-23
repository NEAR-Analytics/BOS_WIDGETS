const defaultChainId = 11155111;
const defaultChainName = "Sepolia testnet";

const orderOpen = "OPEN";
const orderFilled = "FILLED";
const orderCancelled = "CANCELED";
const orderPending = "PENDING";

if (state === undefined) {
  State.init({
    orderSize: "0.002",
    orderPrice: "2500",
    orderMarketId: "ETH-USD",
    orderType: "MARKET",
    nonce: 0,
    assetMenuOpen: false,
    orderFilter: orderOpen,
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

.lds-ring {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 14px;
  height: 14px;
  margin: 1px;
  border: 1px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.component, .orders-log {
    border-color: rgb(74, 74, 99)!important;
    border-image: none!important;
}

.order-tabs ul {
     position: relative;
  width: fit-content;
  margin-top: -1px;
    font-family: "Lexend",Helvetica;
    font-weight: 400;
    color: transparent;
    font-size: 14px;
  color: #818099;  
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}

.order-tabs .nav-link {
    color: #ffffff99;
    cursor: pointer;
}

.order-tabs .nav-link.active {
    color: #101019
}

.assets-menu {
  z-index: 10;
  display: flex;
  padding: 12px 14px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 12px;
  position: absolute;
  right: 23.5px;
  top: 97px;
  border-radius: 4px;
  border: 1px solid #4A4A63;
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(12px);
  cursor: pointer
}

.assets-menu-item {
  color: #FFF;
  font-family: Inter, Helvetica;
  font-weight: 400;    
  font-size: 15px;
  letter-spacing: 0px;
  font-size: 15px;
  font-style: normal;
  line-height: normal;
}
`,
  });
}

const Theme = state.theme;

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
      .catch((err) =>
        State.update({ is_loading: false, error_msg: JSON.stringify(err) })
      );
  });
};

// console.log("state wallet", state.wallet);

const apiUrl = "https://indexer.v4testnet.dydx.exchange/v4";
const accountId = state.dydx_account;
const headers = {
  Accept: "application/json",
};

const fundAccount = () => {
  faucetDydx(state.dydx_account, 0)
    .then((r) => {
      if (r.status == 202) {
        console.log("fundAccount", r);
        loadAccount();
      } else {
        State.update({
          error_msg: JSON.stringify(r),
        });
      }
    })
    .catch((ex) =>
      State.update({
        error_msg: `${state.error_msg}. Error: ${JSON.stringify(ex)}`,
      })
    );
};

const loadAccount = () => {
  if (accountId) {
    asyncFetch(`${apiUrl}/addresses/${accountId}`, { headers })
      .then((status) => {
        if (status.ok) {
          State.update({
            account: status?.body?.subaccounts[0],
            all_accounts: status?.body,
          });
        } else {
          State.update({
            error_msg: "Account not found. Trying to run faucet",
          });
          fundAccount();
        }
      })
      .catch((err) => {
        console.log("err", err);
        State.update({ error_msg: JSON.stringify(err) });
      });
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
        // console.log("orders num", r?.body.length);
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

let tokenImage =
  "https://plum-dear-manatee-739.mypinata.cloud/ipfs/Qme6bjSGWP8vjXqrXgbjHCNSwrc16cPYTREbo9aL2Uuuok";
if (state.orderMarketId == "BTC-USD") {
  tokenImage =
    "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png";
}

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
  State.update({ is_loading: true, error_msg: "" });
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
  State.update({ is_loading: true, error_msg: "" });

  if (!state.orderMarketId || !state.orderSize || !state.orderType) {
    State.update({ is_loading: false, error_msg: "NO DATA" });
    return;
  }

  if (!state.orderPrice && type == "LIMIT") {
    State.update({ is_loading: false, error_msg: "NO PRICE FOR LIMIT ORDER" });
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
    execution,
    postOnly,
    reduceOnly,
    triggerPrice: price,
  };

  //  console.log(params);

  if (type == "MARKET") {
    getDydxLatestBlockHeight(getNetwork()).then((latestBlockHeight) => {
      console.log("latestBlockHeight", latestBlockHeight);
      params.goodTilBlock = latestBlockHeight + 11;
      placeDydxShortOrder(getNetwork(), state.mnemonic, "dydx", 0, params)
        .then((placeOrderResp) => {
          console.log("placeDydxShortOrder resp ", placeOrderResp);
          State.update({ is_loading: false, error_msg: "" });
          updateOrders();
        })
        .catch((err) =>
          State.update({ is_loading: false, error_msg: JSON.stringify(err) })
        );
    });
  } else {
    placeDydxOrder(getNetwork(), state.mnemonic, "dydx", 0, params)
      .then((placeOrderResp) => {
        console.log("placeOrder resp ", placeOrderResp);
        State.update({ is_loading: false, error_msg: "" });
        updateOrders();
      })
      .catch((err) =>
        State.update({ is_loading: false, error_msg: JSON.stringify(err) })
      );
  }
};

const isOrderOpen = () => [orderOpen].includes(state.orderFilter);
const isOrderFilled = () => [orderFilled].includes(state.orderFilter);
const isOrderCancelled = () => [orderCancelled].includes(state.orderFilter);
const isOrderPending = () => [orderPending].includes(state.orderFilter);

let activeAssetIcon = (
  <span class="me-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="7"
      viewBox="0 0 9 7"
      fill="none"
    >
      <path
        d="M1 3.5L3.5 6L8.5 1"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
);

const SignInWithMetamask = () => {
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

  /*return getWalletFromEvmSignature(
    "0x0779917cb0d970a483165e49cac6f10baf6ef7fc907f209835874dc678387bac127d1431a6f81e82c193788923a70a90b138dbfd384b941fa91a0dc0d768104a1b"
  );*/

  Ethers.provider()
    .getSigner()
    ._signTypedData(toSign.domain, { dYdX: toSign.types.dYdX }, toSign.message)
    .then((signature) => getWalletFromEvmSignature(signature));
};

if (state.dydx_account == undefined && state.chainId == defaultChainId) {
  SignInWithMetamask();
} else {
  if (!!state.chainId && state.chainId !== defaultChainId) {
    return (
      <div>
        <div>{`Please switch to ${defaultChainName}`}</div>
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

  /*if (state?.account?.address) {
    getDydxAccountBalances(getNetwork(), state?.account?.address).then(
      (data) => {
        console.log("getDydxAccountBalances", data);
      }
    );
  }*/

  return (
    <Theme class="mb-5">
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
                    $
                    {Number(state.account.equity).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
                <div class="collateral">
                  <div class="text-wrapper">Free collateral</div>
                  <div class="div">
                    $
                    {Number(state.account.freeCollateral).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 2 }
                    )}
                  </div>
                </div>
                <div class="collateral">
                  <div class="text-wrapper">{state.orderMarketId}</div>
                  <div class="div">
                    $
                    {Number(state.orderPrice).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
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
                  <div class="title">Place Order</div>
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

                <div class="heading">
                  <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C10.0899 13 13 10.0899 13 6.5C13 2.91015 10.0899 0 6.5 0ZM7.13854 2.36358C7.13854 2.01213 6.85363 1.72722 6.50218 1.72722C6.15072 1.72722 5.86581 2.01213 5.86581 2.36358V2.90904H5.51733C4.96815 2.90904 4.45115 3.14318 4.07716 3.54388C3.70456 3.9431 3.50218 4.47572 3.50218 5.02267C3.50218 5.56962 3.70456 6.10225 4.07716 6.50146C4.45115 6.90217 4.96815 7.13631 5.51733 7.13631H5.86581V8.81813H4.13854C3.78708 8.81813 3.50218 9.10304 3.50218 9.45449C3.50218 9.80594 3.78708 10.0909 4.13854 10.0909H5.86581V10.6363C5.86581 10.9878 6.15072 11.2727 6.50218 11.2727C6.85363 11.2727 7.13854 10.9878 7.13854 10.6363V10.0909H7.48702C8.0362 10.0909 8.5532 9.85671 8.92719 9.45601C9.2998 9.05679 9.50218 8.52416 9.50218 7.97722C9.50218 7.43027 9.2998 6.89764 8.92719 6.49843C8.5532 6.09772 8.0362 5.86358 7.48702 5.86358H7.13854V4.18176H8.47187C8.82333 4.18176 9.10824 3.89685 9.10824 3.5454C9.10824 3.19394 8.82333 2.90904 8.47187 2.90904H7.13854V2.36358ZM5.51733 4.18176H5.86581V5.86358H5.51733C5.33515 5.86358 5.15075 5.78644 5.00759 5.63306C4.86305 5.47819 4.7749 5.25932 4.7749 5.02267C4.7749 4.78603 4.86305 4.56715 5.00759 4.41228C5.15075 4.2589 5.33515 4.18176 5.51733 4.18176ZM7.13854 8.81813V7.13631H7.48702C7.66921 7.13631 7.8536 7.21345 7.99676 7.36683C8.1413 7.5217 8.22945 7.74057 8.22945 7.97722C8.22945 8.21386 8.1413 8.43274 7.99676 8.5876C7.8536 8.74099 7.66921 8.81813 7.48702 8.81813H7.13854Z"
                        fill="white"
                        fill-opacity="0.6"
                      />
                    </svg>
                  </div>

                  <div class="title" style={{ fontWeight: "normal" }}>
                    Order Pair
                  </div>
                  <div class="tab-pair">
                    <div
                      style={{
                        display: "flex",
                        padding: "6px 0px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        cursor: "pointer",
                      }}
                      onClick={(e) =>
                        State.update({ assetMenuOpen: !state.assetMenuOpen })
                      }
                    >
                      <div class="title" style={{ fontWeight: "normal" }}>
                        {state.orderMarketId}
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="7"
                        height="4"
                        viewBox="0 0 7 4"
                        fill="none"
                      >
                        <path
                          d="M6 0.75L3.5 3.25L1 0.75"
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {state.assetMenuOpen && (
                  <div class="assets-menu">
                    <div
                      class="assets-menu-item"
                      onClick={(e) => {
                        State.update({
                          userOrderPrice: undefined,
                          orderMarketId: "ETH-USD",
                          assetMenuOpen: false,
                        });
                        updateOrders();
                      }}
                    >
                      {state.orderMarketId == "ETH-USD" ? (
                        activeAssetIcon
                      ) : (
                        <></>
                      )}
                      ETH-USD
                    </div>
                    <div
                      class="assets-menu-item"
                      onClick={(e) => {
                        State.update({
                          userOrderPrice: undefined,
                          orderMarketId: "BTC-USD",
                          assetMenuOpen: false,
                        });
                        updateOrders();
                      }}
                    >
                      {state.orderMarketId == "BTC-USD" ? (
                        activeAssetIcon
                      ) : (
                        <></>
                      )}
                      BTC-USD
                    </div>
                  </div>
                )}

                <div class="inputs">
                  <div class="div-2">
                    <div class="token-label">
                      <img class="img" src={tokenImage} />
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
                        <div class="img" />
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
                    <div
                      class="text-wrapper-8"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        State.update({ userOrderPrice: state.orderPrice })
                      }
                    >
                      ${state.orderPrice}
                    </div>
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

                {state.error_msg && (
                  <div
                    class="div-2 title"
                    style={{
                      color: "white",
                      justifyContent: "flex-start",
                      borderRadius: "10px",
                      gap: "10px",
                      backgroundColor: "rgb(129, 37, 37)",
                    }}
                    role="alert"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle cx="12" cy="12" r="10" fill="white" />

                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V13ZM13 15.9888C13 15.4365 12.5523 14.9888 12 14.9888C11.4477 14.9888 11 15.4365 11 15.9888V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V15.9888Z"
                        fill="red"
                      />
                    </svg>
                    {state.error_msg}
                  </div>
                )}

                {state.is_loading && (
                  <div
                    class="div-2 title"
                    style={{
                      color: "white",
                      justifyContent: "flex-start",
                      borderRadius: "10px",
                      gap: "10px",
                    }}
                    role="alert"
                  >
                    <div class="lds-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    Loading...
                  </div>
                )}
              </div>
              <div class="orders-log">
                <div class="heading">
                  <img
                    class="img"
                    src="https://plum-dear-manatee-739.mypinata.cloud/ipfs/QmbEJL2wNjLQ948Sa6fwvoidRWVWULeaXJsFYpNZ9qG9Kh"
                  />
                  <div class="title">Orders log </div>
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

                <div class="order-tabs">
                  <ul class="nav nav-tabs">
                    <li class="nav-item">
                      <a
                        class={`nav-link ${isOrderOpen() ? "active" : ""}`}
                        onClick={() => State.update({ orderFilter: orderOpen })}
                        aria-current="page"
                        href="#"
                      >
                        Open
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class={`nav-link ${isOrderFilled() ? "active" : ""}`}
                        onClick={() =>
                          State.update({ orderFilter: orderFilled })
                        }
                        href="#"
                      >
                        Filled
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class={`nav-link ${isOrderCancelled() ? "active" : ""}`}
                        onClick={() =>
                          State.update({ orderFilter: orderCancelled })
                        }
                        href="#"
                      >
                        Canceled
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class={`nav-link ${isOrderPending() ? "active" : ""}`}
                        onClick={() =>
                          State.update({ orderFilter: orderPending })
                        }
                        href="#"
                      >
                        Pending
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="transactions">
                  {(state.orders ?? []).length == 0 && (
                    <div class="text-wrapper-10">No transactions yet</div>
                  )}
                  {(state.orders ?? [])
                    .filter((order) => {
                      if (isOrderPending()) {
                        return (
                          !(
                            order.status == orderCancelled ||
                            order.status == orderFilled ||
                            order.status == orderOpen
                          ) &&
                          order.ticker.toLowerCase() ==
                            state.orderMarketId.toLowerCase()
                        );
                      } else {
                        return (
                          [state.orderFilter].includes(order.status) &&
                          order.ticker.toLowerCase() ==
                            state.orderMarketId.toLowerCase()
                        );
                      }
                    })
                    .sort((a, b) => {
                      return b.updatedAtHeight - a.updatedAtHeight;
                    })
                    .map((order) => (
                      <div class="transaction">
                        <div class="pair">
                          <div
                            class={`order-log-${order.side.toLowerCase()}-wrapper`}
                          >
                            <div
                              class={`order-log-${order.side.toLowerCase()}`}
                              title={order.status}
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
                          <div
                            class="cancel"
                            style={{
                              backgroundColor: "rgb(129, 37, 37)",
                              border: "1px solid rgb(197, 51, 51)",
                            }}
                          >
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
                              style={{ color: "white" }}
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
      {/*JSON.stringify(state.orders)*/}
    </Theme>
  );
}

return (
  <>
    <h1>DyDx v4</h1>
    <h4>Sign message with Metamask to sign in</h4>
    <button onClick={() => SignInWithMetamask()}>Sign In</button>
    <hr />
    <div>Your Ethereum Account: {state.sender}</div>
    <Web3Connect connectLabel="Connect Web3 Wallet to continue" />
  </>
);
