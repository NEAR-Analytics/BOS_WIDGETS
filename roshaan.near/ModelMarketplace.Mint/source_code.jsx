// constants
const mpcContract = `signer.canhazgas.testnet`;
const { accountId } = context;
const chainId = 11155111; // SEPOLIA
const nearGas = 300000000000000;

if (!accountId) return <h4>Please Sign In with your Near Account</h4>;

const gasPricePreFetch = fetch(
  `https://sepolia.beaconcha.in/api/v1/execution/gasnow`
);

// if there's a txHash in the url props
let txHash = props.transactionHashes;
if (txHash) {
  txHash = txHash.split(",")[0];
}
// get pending tx or user args path, to address
const baseTx = Storage.privateGet("baseTx");
const txPayload = Storage.privateGet("txPayload");
const to = Storage.privateGet("to");
const path = 1;

initState({
  amount: "0.1",
  to: props.to,
  path: 1,
});

const flashAlert = (alert, dur) => {
  State.update({
    alert,
  });
  setTimeout(() => State.update({ alert: null }), dur || 3000);
};

const refreshBalance = () => {
  State.update({
    balance: "loading...",
  });
  getEthereumAddress(state.path || path);
};

const getSepoliaProvider = () => {
  return new ethers.providers.JsonRpcProvider(
    "https://ethereum-sepolia.publicnode.com"
  );
};


// spoof Ethereum publicKey to match mock contract
const getEthereumAddress = (path) => {
  const signingKey = new ethers.utils.SigningKey(
    ethers.utils.sha256(ethers.utils.toUtf8Bytes(accountId + "," + path))
  );
  const address = ethers.utils.computeAddress(signingKey.privateKey);
  getSepoliaProvider()
    .getBalance(address)
    .then((balance) => {
      State.update({
        address,
        balance: ethers.utils.formatEther(balance),
      });
    });
};

if (!state.mpcKey) {
  return State.update({
    mpcKey: Near.view(mpcContract, "public_key"),
  });
}

if (!state.address) {
  return getEthereumAddress(state.path || path);
}

const decodeTx = () => {
  if (!baseTx || !txPayload) return;

  const res = fetch(`https://rpc.testnet.near.org`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "EXPERIMENTAL_tx_status",
      params: [txHash, "md1.testnet"],
    }),
  });

  if (!res || !res.ok) {
    return setTimeout(decodeTx, 500);
  }

  console.log("Near TX res", res);

  const args = JSON.parse(
    atob(res.body.result.transaction.actions[0].FunctionCall.args)
  );
  const sigRes = JSON.parse(atob(res.body.result.status.SuccessValue));

  const sig = {
    r: "0x" + sigRes[0].substring(2),
    s: "0x" + sigRes[1],
    v: sigRes[0].substring(0, 2) === "02" ? 0 : 1,
  };
  const recoveredAddress = ethers.utils.recoverAddress(
    args.payload,
    ethers.utils.joinSignature(sig)
  );
  if (recoveredAddress !== state.address) {
    console.log("signature failed to recover to correct address");
    return;
  }

  if (JSON.stringify(args.payload) !== JSON.stringify(txPayload)) return;

  // console.log("txHex", txHex);
  const signedTx = ethers.utils.serializeTransaction(baseTx, sig);
  console.log("Ethereum Signed TX", signedTx);

  getSepoliaProvider()
    .send("eth_sendRawTransaction", [signedTx])
    .then((hash) => {
      flashAlert(
        "TX Sent! Explorer link will appear soon and balance will update automatically in 30s"
      );
      setTimeout(() => {
        flashAlert(
          <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank">
            Explorer Link
          </a>,
          60000
        );
      }, 4000);
      setTimeout(refreshBalance, 50000);
      setTimeout(refreshBalance, 120000);
    })
    .catch((e) => {
      if (/nonce too low/gi.test(JSON.stringify(e))) {
        console.log("tx has been tried, removing localStorage");
        Storage.privateSet("baseTx", null);
        Storage.privateSet("txPayload", null);
        return;
      }
      if (/gas too low|underpriced/gi.test(JSON.stringify(e))) {
        console.log(e);
        flashAlert(
          "Insufficient funds or gas too low. Try sending a smaller amount."
        );
        return;
      }
      console.log(e);
    });
};

if (!state.decoded && txHash && state.address) {
  decodeTx();
  return State.update({ decoded: true });
}

// Use MPC to sign

try {
  const a = ethers.utils.getAddress("0x");
  console.log(a);
} catch (e) { }

const sign = () => {
  let to = props.to;
  try {
    to = ethers.utils.getAddress(to);
  } catch (e) {
    return flashAlert(
      "Invalid to address. Please add a proper Ethereum address to send ETH to."
    );
  }

  getSepoliaProvider()
    .getTransactionCount(state.address)
    .then((nonce) => {
      // Ethereum TX
      const amount = props.amount;
      // 2 gwei + some randomness
      const gasPriceFetch = fetch(
        `https://sepolia.beaconcha.in/api/v1/execution/gasnow`
      );

      const gasPriceData = gasPriceFetch || gasPricePreFetch;
      const { rapid, fast, standard } = gasPriceData.body.data;
      const gasPrice = Math.max(rapid, fast, standard);
      console.log(gasPrice);
      if (!gasPrice)
        return flashAlert(
          "Unable to get gas price. Please refresh and try again."
        );

      const gasLimit = 53000,
        value = ethers.utils.hexlify(ethers.utils.parseUnits(amount));

      if (value === "0x00") {
        return flashAlert("Amount is zero. Please try a non-zero amount.");
      }

      const baseTx = {
        to,
        nonce,
        data: [],
        value: value,
        gasLimit,
        gasPrice,
        chainId,
      };

      // check balance
      if (
        !state.balance ||
        new BN(ethers.utils.parseUnits(state.balance).toString()).lt(
          new BN(ethers.utils.parseUnits(amount).toString()).add(
            new BN(gasPrice).mul(new BN(gasLimit))
          )
        )
      ) {
        return flashAlert("Insufficient funds");
      }

      Storage.privateSet("baseTx", baseTx);
      const unsignedTx = ethers.utils.serializeTransaction(baseTx);
      const txHash = ethers.utils.keccak256(unsignedTx);
      const payload = Object.values(ethers.utils.arrayify(txHash));
      Storage.privateSet("txPayload", payload);

      Near.call(
        mpcContract,
        "sign",
        {
          payload,
          path: state.path || path,
        },
        nearGas
      );
    });
};

const Theme = styled.div`
  box-sizing: border-box;
  margin: auto;
  text-align: center;

  .alert {
    background-color: #eeeeff
  }

  .container {
  text-align: left;
    width: 516px;

  }
  .group {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 16px;
    line-height: 32px;
    > div, > input {
      margin-right: 16px;
    }
    > input {
      border: 1px solid #ddd;
      border-radius: 8px !important;
      padding: 0 4px;
      width: 100px;
    }
    > div:nth-child(1) {
      width: 40px;
    }
    > .address {
      width: 416px;
    }
  }
`;

return (
  <Theme>
    <div className="container">
      {/*
      // Use real kdf with mpcKey
      <iframe
      style={{ display: "none" }}
      src={"https://near-mpc-kdf-iframe.pages.dev/"}
      message={state.message}
      onMessage={(res) => {
        if (res.loaded) {
          State.update({
            message: { publicKey: state.mpcKey, accountId, path },
          });
        }
        if (res.address) {
          State.update({
            address: res.address,
          });
        }
      }}
    />
    */}
      {state.alert && <p className="alert">{state.alert}</p>}

      <p>
        Sending Ethereum Address:
        <br />
        <a
          href={`https://sepolia.etherscan.io/address/${state.address}`}
          target="_blank"
        >
          {state.address}
        </a>
      </p>

      <div className="group">
        <div>Path</div>
        <input
          className="amount"
          type="text"
          value={state.path || path}
          onChange={({ target: { value } }) => {
            getEthereumAddress(value);
            Storage.privateSet("path", value);
            State.update({ path: value });
          }}
        />
        <div>
          + &nbsp;<strong>{accountId}</strong>
        </div>
      </div>

        <>
          <div className="group">
            <button onClick={sign}>Pay Fee</button>
          </div>
        </>
      )
    </div>
  </Theme>
);
