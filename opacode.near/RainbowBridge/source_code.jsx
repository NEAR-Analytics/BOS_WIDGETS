const sender = Ethers.send("eth_requestAccounts", [])[0];
// NOTE: Switching account in MetaMask doesn't update the sender.
if (!sender) return <Web3Connect connectLabel="Connect Web3 Wallet" />;

const networks = ["ethereum", "aurora"];
const testnetChainIds = {
  ethereum: 5,
  aurora: 1313161555,
};
const testnetNetworkNames = {
  ethereum: "Goerli Testnet",
  aurora: "Aurora Testnet",
};
const mainnetChainIds = {
  ethereum: 1,
  aurora: 1313161554,
};
const mainnetNetworkNames = {
  ethereum: "Ethereum Mainnet",
  aurora: "Aurora Mainnet",
};
const testnetConfig = {
  etherCustodianAddress: "0x84a82Bb39c83989D5Dc07e1310281923D2544dC2",
  erc20LockerAddress: "0xc115851ca60aed2ccc6ee3d5343f590834e4a3ab",
};
const mainnetConfig = {
  etherCustodianAddress: "0x6BFaD42cFC4EfC96f529D786D643Ff4A8B89FA52",
  erc20LockerAddress: "0x23ddd3e3692d1861ed57ede224608875809e127f",
};
const testnetTokens = {
  ETH: {
    symbol: "ETH",
    name: "Ether",
    ethereumAddress: undefined,
    nearAddress: "aurora",
    auroraAddress: undefined,
    decimals: 18,
    origin: "ethereum",
    icon: "https://rainbowbridge.app/static/tokens/eth.svg",
  },

  FAU: {
    symbol: "FAU",
    name: "FaucetToken",
    ethereumAddress: "0xba62bcfcaafc6622853cca2be6ac7d845bc0f2dc",
    nearAddress:
      "ba62bcfcaafc6622853cca2be6ac7d845bc0f2dc.factory.goerli.testnet",
    auroraAddress: "0xf93cd0e464f74c240d8ebb7ed55ce6b43452f913",
    decimals: 18,
    origin: "ethereum",
  },
};
const mainnetTokens = {
  ETH: {
    symbol: "ETH",
    name: "Ether",
    ethereumAddress: undefined,
    nearAddress: "aurora",
    auroraAddress: undefined,
    decimals: 18,
    origin: "ethereum",
    icon: "https://rainbowbridge.app/static/tokens/eth.svg",
  },
  "USDC.e": {
    symbol: "USDC.e",
    name: "USD Coin",
    ethereumAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    nearAddress: "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near",
    auroraAddress: "0xb12bfca5a55806aaf64e99521918a4bf0fc40802",
    decimals: 6,
    origin: "ethereum",
    icon: "https://rainbowbridge.app/static/tokens/usdc.svg",
  },
  AURORA: {
    symbol: "AURORA",
    name: "Aurora",
    ethereumAddress: "0xaaaaaa20d9e0e2461697782ef11675f668207961",
    nearAddress: "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
    auroraAddress: "0x8bec47865ade3b172a928df8f990bc7f2a3b9f79",
    decimals: 18,
    origin: "ethereum",
    icon: "https://rainbowbridge.app/static/tokens/aurora.svg",
  },
};

const fetchBalance = (tokenSymbol) => {
  const tokenAddress =
    state.tokens[tokenSymbol][`${state.sourceNetwork}Address`];
  if (tokenAddress?.length) {
    // erc-20
    const erc20 = new ethers.Contract(
      tokenAddress,
      [
        "function balanceOf(address) view returns (uint)",
        "function allowance(address owner, address spender) view returns (uint)",
      ],
      Ethers.provider()
    );
    erc20.balanceOf(sender).then((balance) => {
      State.update({
        senderBalance: ethers.BigNumber.from(balance),
        tokenSymbol,
      });
    });
    erc20
      .allowance(sender, state.config.erc20LockerAddress)
      .then((allowance) => {
        State.update({
          senderAllowance: ethers.BigNumber.from(allowance),
          tokenSymbol,
        });
      });
  } else if (tokenAddress === undefined) {
    Ethers.provider()
      .getBalance(sender)
      .then((balance) => {
        State.update({
          senderBalance: ethers.BigNumber.from(balance),
          tokenSymbol,
        });
      });
  } else {
    // Token address = null: not bridged on this network.
    State.update({
      senderBalance: ethers.BigNumber.from(0),
      senderAllowance: ethers.BigNumber.from(0),
      tokenSymbol,
    });
  }
};

const erc20Approve = () => {
  const tokenAddress =
    state.tokens[state.tokenSymbol][`${state.sourceNetwork}Address`];
  const erc20 = new ethers.Contract(
    tokenAddress,
    ["function approve(address,uint) public returns (bool)"],
    Ethers.provider().getSigner()
  );
  erc20
    .approve(state.config.erc20LockerAddress, state.bigNumberAmount)
    .then((tx) => {
      console.log(tx);
      State.update({ lastTxHash: tx.hash });
      tx.wait().then((receipt) => {
        console.log(receipt);
        fetchBalance(state.tokenSymbol);
        State.update({ lastTxHash: null });
      });
    });
};

const bridgeTokens = () => {
  if (state.sourceNetwork !== "ethereum") {
    console.log("Coming soon...");
    return;
  }
  if (state.tokenSymbol === "ETH") {
    const ethTokenLocker = new ethers.Contract(
      state.config.etherCustodianAddress,
      // NOTE: for some reason human readable abi gives
      // Error: Not a function call expression
      // when calling the payable contract, so use standard abi.
      //["function depositToEvm(string,uint256) payable"],
      [
        {
          inputs: [
            {
              internalType: "string",
              name: "ethRecipientOnNear",
              type: "string",
            },
            { internalType: "uint256", name: "fee", type: "uint256" },
          ],
          name: "depositToEVM",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );
    ethTokenLocker
      .depositToEVM(sender.slice(2).toLowerCase(), 0, {
        value: state.bigNumberAmount,
      })
      .then((tx) => {
        console.log(tx);
        State.update({ lastTxHash: tx.hash });
        tx.wait().then((receipt) => {
          console.log(receipt);
          const metadata = state.tokens[state.tokenSymbol];
          State.update({
            lastTxHash: null,
            lastestTransfer: {
              amount: state.bigNumberAmount.toString(),
              ethHash: tx.hash,
              nearReceipt: "",
              status: "pending",
              metadata: {
                address: tokenAddress,
                ...metadata,
              },
            },
          });
        });
      });
  } else if (state.tokenSymbol === "NEAR") {
    console.log("Coming soon...");
  } else {
    const erc20TokenLocker = new ethers.Contract(
      state.config.erc20LockerAddress,
      ["function lockToken(address,uint,string) public"],
      Ethers.provider().getSigner()
    );
    const tokenAddress =
      state.tokens[state.tokenSymbol][`${state.sourceNetwork}Address`];
    erc20TokenLocker
      .lockToken(
        tokenAddress,
        state.bigNumberAmount,
        `aurora:${sender.toLowerCase().slice(2)}`
      )
      .then((tx) => {
        console.log(tx);
        State.update({ lastTxHash: tx.hash });
        tx.wait().then((receipt) => {
          console.log(receipt);
          fetchBalance(state.tokenSymbol);
          const metadata = state.tokens[state.tokenSymbol];
          State.update({
            lastTxHash: null,
            lastestTransfer: {
              amount: state.bigNumberAmount.toString(),
              ethHash: tx.hash,
              nearReceipt: "",
              status: "pending",
              metadata: {
                address: tokenAddress,
                ...metadata,
              },
            },
          });
        });
      });
  }
};

initState({
  tokenSymbol: null,
  sourceTokenBalance: ethers.BigNumber.from(0),
  senderBalance: ethers.BigNumber.from(0),
  senderAllowance: ethers.BigNumber.from(0),
  amount: "",
  bigNumberAmount: ethers.BigNumber.from(0),
  sourceNetwork: "ethereum",
  destinationNetwork: "aurora",
  initialized: false,
  lastTxHash: null,
});

Ethers.provider()
  .getNetwork()
  .then((network) => {
    if (!state.initialized) {
      // Choose testnet or mainnet config depending on connected network.
      const walletChainId = network.chainId;
      const isTestnet =
        walletChainId === testnetChainIds.aurora ||
        walletChainId === testnetChainIds.ethereum;
      // Set the bridge direction on network switch:
      // bos.gg doesn't keep the component state on wallet network switch !
      const sourceNetwork =
        testnetChainIds.ethereum === walletChainId ||
        mainnetChainIds.ethereum === walletChainId
          ? "ethereum"
          : "aurora";
      State.update({
        walletChainId: network.chainId,
        chainIds: isTestnet ? testnetChainIds : mainnetChainIds,
        networkNames: isTestnet ? testnetNetworkNames : mainnetNetworkNames,
        config: isTestnet ? testnetConfig : mainnetConfig,
        tokens: isTestnet ? testnetTokens : mainnetTokens,
        isTestnet,
        sourceNetwork,
        destinationNetwork:
          sourceNetwork === "ethereum" ? "aurora" : "ethereum",
        initialized: true,
      });
    }
  })
  .catch((error) => console.log(error));

let transfers;
if (state.initialized) {
  transfers = useCache(
    () =>
      asyncFetch(
        `https://jvea2jh4jzwg4vykyhy3mcdh7i0yfosk.lambda-url.eu-central-1.on.aws/${
          state.isTestnet ? 5 : 1
        }/${sender}`
      )
        .then((res) => res?.body ?? [])
        .catch((error) => console.log(error)),
    "recentTransfers",
    { subscribe: true }
  );
}

const lastTransferIndexed =
  transfers &&
  transfers.find((t) => t.ethHash === state.lastestTransfer?.ethHash);
const recentTransfers =
  lastTransferIndexed || !state.lastestTransfer
    ? transfers
    : [state.lastestTransfer, ...(transfers ?? [])];

if (!state.theme) {
  State.update({
    theme: styled.div`
      .Container{
        box-sizing: border-box;
        margin: 8px auto;
        min-width: 320px;
        width: 100%;
        padding: 0px 32px;
        max-width: 560px;
        position: relative;
      }
      .Header{
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30px;
      }
      .networkIcon {
        border: 3px solid rgb(149,149,149);
        background-color: rgb(149,149,149);
      }
      tr {
        border-bottom: 1px solid;
        border-top: 1px solid;
      }
      table {
        width: 100%;
      }`,
  });
}
const Theme = state.theme;
const ethExplorerUrl = state.isTestnet
  ? "https://goerli.etherscan.io"
  : "https://etherscan.io";
const nearExplorerUrl = state.isTestnet
  ? "https://explorer.testnet.near.org"
  : "https://explorer.near.org";

const wrongWalletNetwork =
  state.walletChainId !== state.chainIds[state.sourceNetwork];
if (wrongWalletNetwork) {
  // Reset selection
  State.update({
    tokenSymbol: null,
    amount: "",
    senderBalance: ethers.BigNumber.from(0),
    senderAllowance: ethers.BigNumber.from(0),
    bigNumberAmount: ethers.BigNumber.from(0),
  });
}
if (!state.initialized) return <></>;
return (
  <Theme>
    <div class="Container">
      <h2 class="Header">
        {" "}
        🌈{" "}
        {state.isTestnet
          ? "Testnet Rainbow Bridge"
          : "Rainbow Bridge (alpha)"}{" "}
        🌈{" "}
      </h2>
      <div class="mb-3">
        <label for="selectSourceNetwork">Select Source Network</label>
        <select
          class="form-select"
          id="selectSourceNetwork"
          onChange={(e) => {
            State.update({ sourceNetwork: e.target.value });
            if (state.destinationNetwork === e.target.value) {
              State.update({
                destinationNetwork: networks.find(
                  (network) => network !== e.target.value
                ),
              });
            }
          }}
        >
          <option selected={state.sourceNetwork === "aurora"} value={"aurora"}>
            {state.networkNames.aurora}
          </option>
          <option
            selected={state.sourceNetwork === "ethereum"}
            value={"ethereum"}
          >
            {state.networkNames.ethereum}
          </option>
        </select>
        {state.walletChainId !== state.chainIds[state.sourceNetwork] && (
          <p>
            Connect your wallet network to{" "}
            {state.networkNames[state.sourceNetwork]}
          </p>
        )}
      </div>
      <div class="mb-3">
        <label for="selectDestinationNetwork">Select Destination Network</label>
        <select
          class="form-select"
          id="selectDestinationNetwork"
          onChange={(e) => {
            State.update({ destinationNetwork: e.target.value });
            if (state.sourceNetwork === e.target.value) {
              State.update({
                sourceNetwork: networks.find(
                  (network) => network !== e.target.value
                ),
              });
            }
          }}
        >
          <option
            selected={state.destinationNetwork === "aurora"}
            value={"aurora"}
          >
            {state.networkNames.aurora}
          </option>
          <option
            selected={state.destinationNetwork === "ethereum"}
            value={"ethereum"}
          >
            {state.networkNames.ethereum}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="selectToken">Select token</label>
        <select
          class="form-select"
          id="selectToken"
          disabled={wrongWalletNetwork}
          onChange={(e) => {
            if (e.target.value === "...") {
              State.update({
                tokenSymbol: null,
                amount: "",
                bigNumberAmount: ethers.BigNumber.from(0),
              });
              return;
            }
            State.update({
              tokenSymbol: e.target.value,
            });
            fetchBalance(e.target.value);
          }}
        >
          <option selected={state.tokenSymbol === null} value={null}>
            ...
          </option>
          {Object.keys(state.tokens).map((symbol) => (
            <option value={symbol}>{symbol}</option>
          ))}
        </select>
      </div>
      <div class="mb-3">
        <label for="amount" class="form-label">
          Enter the amount
        </label>
        <input
          value={state.amount}
          class="form-control"
          id="amount"
          disabled={wrongWalletNetwork || !state.tokenSymbol}
          placeholder=""
          onChange={(e) => {
            const bigNumberAmount = ethers.utils.parseUnits(
              e.target.value !== "" ? e.target.value : "0",
              state.tokens[state.tokenSymbol].decimals
            );
            State.update({ amount: e.target.value, bigNumberAmount });
          }}
        />
        {state.tokenSymbol && (
          <div>
            Balance:{" "}
            {ethers.utils.formatUnits(
              state.senderBalance,
              state.tokens[state.tokenSymbol].decimals
            )}{" "}
            {state.tokenSymbol}
          </div>
        )}
      </div>
      {state.tokenSymbol !== "ETH" &&
      state.senderAllowance.lt(state.bigNumberAmount) ? (
        <div class="mb-3">
          <button
            disabled={
              !state.tokenSymbol ||
              state.sourceNetwork === "aurora" ||
              state.bigNumberAmount.isZero() ||
              state.lastTxHash
            }
            onClick={erc20Approve}
          >
            {state.lastTxHash ? "Sending..." : "Allow transfer of tokens"}
          </button>
        </div>
      ) : (
        <div class="mb-3">
          <button
            disabled={
              !state.tokenSymbol ||
              state.sourceNetwork === "aurora" ||
              state.bigNumberAmount.isZero() ||
              state.senderBalance.lt(state.bigNumberAmount) ||
              state.lastTxHash
            }
            onClick={bridgeTokens}
          >
            {state.lastTxHash ? "Sending..." : "Bridge tokens"}
          </button>
        </div>
      )}
      {state.lastTxHash && (
        <div class="mb-3">
          <a
            href={`${ethExplorerUrl}/tx/${state.lastTxHash}`}
            target="_blank"
            rel="noreferrer"
          >
            View in Explorer
          </a>
        </div>
      )}
      <p>
        NOTE: Please make sure that your wallet is compatible with the
        Destination Network before sending tokens. Transfer time: 25 min.
      </p>
      <p>
        WIP: This component relies on a new indexed bridge transfers API. The
        user can view their recent transfers on any browser and will be able to
        finalize a transfer in one click without having to restore the transfer
        on
        <a href="https://rainbowbridge.app/" target="_blank" rel="noreferrer">
          rainbowbridge.app
        </a>
        . Currently only Ethereum ={">"} Aurora transfers available.
      </p>
      <h3> Recent transfers </h3>
      <table>
        <tbody>
          {recentTransfers &&
            recentTransfers.reverse().map((t, i) => (
              <tr>
                <td>
                  <img
                    src={
                      t.metadata.icon?.length
                        ? t.metadata.icon
                        : "https://rainbowbridge.app/static/tokens/aurora.svg"
                    }
                    width="25"
                    height="25"
                    style={{ "margin-bottom": "2px" }}
                  />
                  {ethers.utils.formatUnits(t.amount, t.metadata.decimals)}
                  {t.metadata.symbol}
                </td>
                <td>
                  <a
                    href={`${ethExplorerUrl}/tx/${t.ethHash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={"https://rainbowbridge.app/static/tokens/eth.svg"}
                      class="networkIcon"
                      width="30"
                      height="30"
                    />
                  </a>
                  ={">"}
                  <a
                    href={`${nearExplorerUrl}/receipts/${t.nearReceipt}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={"https://rainbowbridge.app/static/tokens/aurora.svg"}
                      class="networkIcon"
                      width="30"
                      height="30"
                    />
                  </a>
                </td>
                <td>{t.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </Theme>
);
