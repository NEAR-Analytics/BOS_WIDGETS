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
  }).then((wallet) => {
    let w = new DirectSecp256k1HdWallet(mnemonic, {
      prefix: "dydx",
      seed: wallet.seed,
    });

    w.getAccounts().then(([dydx_account]) => {
      console.log("dYdX account derived", dydx_account);
      State.update({ dydx_account: dydx_account.address });
    });
  });
};

const apiUrl = "https://indexer.v4testnet.dydx.exchange/v4";
const accountId = state.dydx_account;
const headers = {
  Accept: "application/json",
};

const loadAccount = () => {
  asyncFetch(`${apiUrl}/addresses/${accountId}`, { headers }).then((r) =>
    State.update({ account: r?.body?.subaccounts[0] })
  );

  asyncFetch(
    `${apiUrl}/orders?address=${accountId}&subaccountNumber=0&limit=100`,
    {
      headers,
    }
  ).then((r) => State.update({ orders: r?.body }));
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

  /*getWalletFromEvmSignature(
    "0xb33020bc2b4c2be8cf28dd6fcaf06dc94f856cd85041ca34afc648c0a1a12298361d3c494404c1b7a6cdec71305c81da8ad318434dac6d9a706c500a650391fa1b"
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
    <div>
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
