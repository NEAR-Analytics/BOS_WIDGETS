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
      });
    });
  });
};

console.log("state wallet", state.wallet);

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

const myPlaceOrder = () => {
  /*
   {"ETH-USD":{"market":"ETH-USD","status":"OPEN","side":"SHORT","size":"-0.006","maxSize":"-0.002","entryPrice":"2314.53333333333333333333","exitPrice":null,"realizedPnl":"0.011682","unrealizedPnl":"0.99803070199999999999998","createdAt":"2023-12-07T14:46:04.743Z","createdAtHeight":"2985583","closedAt":null,"sumOpen":"0.006","sumClose":"0","netFunding":"0.011682"}}

   {
  "clobPairId": "1",
  "ticker": "ETH-USD",
  "status": "ACTIVE",
  "lastPrice": "0",
  "oraclePrice": "2152.855895",
  "priceChange24H": "-59.931317",
  "volume24H": "416750.4603",
  "trades24H": 7805,
  "nextFundingRate": "0",
  "initialMarginFraction": "0.05",
  "maintenanceMarginFraction": "0.03",
  "basePositionNotional": "1000000",
  "openInterest": "1267.480",
  "atomicResolution": -9,
  "quantumConversionExponent": -9,
  "tickSize": "0.1",
  "stepSize": "0.001",
  "stepBaseQuantums": 1000000,
  "subticksPerTick": 100000
}

   */
  //let subaccountNumber = 0;
  let marketId = "BTC-USD";
  let type = "LIMIT";
  let side = "BUY";
  let price = 40_500;
  let size = 0.0001;
  let clientId = 1234;
  let timeInForce = "GTT";
  let execution = "DEFAULT";
  let postOnly = false;
  let reduceOnly = false;
  console.log("state.all_accounts", state.all_accounts);
  console.log("state.wallet", state.wallet);
  console.log("state.account", state.account);
  /*LocalWallet.fromMnemonic(state.mnemonic, "dydx").then((localWallet) => {
    console.log("localWallet", localWallet);*/

  //const subAccount = new SubaccountClient(localWallet, 0);
  console.log("subAccount", subAccount);
  //console.log("compositeClient", CompositeClient);
  //console.log("Network", Network);
  //console.log("compositeClient", CompositeClient.placeOrder);

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
  console.log("network 333", network);
  //CompositeClient.connect(Network.testnet()).then((compositeClient) => {
  //let _cc0 = await CompositeClient.connect(network);
  //console.log("cco", _cc0);

  //let _cc = CompositeClient.connect(network).then((compositeClient) => {
  console.log("subAccount", subAccount);
  let params = {
    //subaccount: subAccount,
    marketId,
    type,
    side,
    price,
    size,
    clientId,
    timeInForce,
    goodTilTimeInSeconds: 0,
    execution,
    postOnly,
    reduceOnly,
    triggerPrice,
  };

  let _cc = placeOrder(network, state.mnemonic, "dydx", 0, params).then(
    (placeOrderResp) => {
      /*if (!compositeClient) return;
    console.log("compositeClient", compositeClient);
    console.log("compositeClient.placeOrder", compositeClient.placeOrder);
    compositeClient
      .placeOrder(
        subAccount,
        marketId,
        type,
        side,
        price,
        size,
        clientId,
        timeInForce,
        goodTilTimeInSeconds ?? 0,
        execution,
        postOnly,
        reduceOnly,
        triggerPrice ?? undefined
      )
      .then((resp) => {
        console.log("placeOrder resp ", resp);
      });*/
      console.log("placeOrder resp ", placeOrderResp);
    }
  );
  console.log("_cc", _cc);
  //});
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

  /*
  getWalletFromEvmSignature(
    "0xb33020bc2b4c2be8cf28dd6fcaf06dc94f856cd85041ca34afc648c0a1a12298361d3c494404c1b7a6cdec71305c81da8ad318434dac6d9a706c500a650391fa1b"
  );
  */

  Ethers.provider()
    .getSigner()
    ._signTypedData(toSign.domain, { dYdX: toSign.types.dYdX }, toSign.message)
    .then((signature) => getWalletFromEvmSignature(signature));
} else {
  useEffect(() => {
    loadAccount();
  }, [state.account, state.orders, state.nonce]);

  return (
    <div>
      {Test1}
      <button
        onClick={() => {
          myPlaceOrder();
        }}
      >
        Place Order
      </button>
      <ul>
        <li>Address: {state.account.address}</li>
        <li>Equity: {state.account.equity}</li>
        <li>Free Collateral: {state.account.freeCollateral}</li>
        <li>
          Open Perpetual Positions:{" "}
          {JSON.stringify(state.account.openPerpetualPositions)}
        </li>

        <li>
          Orders:{" "}
          <ol>
            {(state.orders ?? []).map((order) => (
              <li>
                {order.side} {order.ticker} at {order.price}. Size: {order.size}
                , filled: {order.totalFilled} . Updated: {order.updatedAt}
                {/*JSON.stringify(order)*/}
              </li>
            ))}
          </ol>
        </li>
      </ul>
      <button
        onClick={() => {
          const nonce = state.nonce ?? 0;
          State.update({ nonce: nonce + 1 });
        }}
      >
        Refresh
      </button>
      <hr />
      state:
      {JSON.stringify(state)}
    </div>
  );
}

return (
  <>
    Ethereum Account: {state.sender}
    <Web3Connect connectLabel="Connect Web3 Wallet to continue" />
  </>
);
