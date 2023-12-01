// constants

const GOERLI_CHAIN_ID = 5;
const ZKSYNC_GOERLI_CHAIN_ID = 280;

// state
const defaultDeposit = {
  network: {
    id: "l1",
    name: "Ethereum",
  },
  assets: [
    {
      id: "weth",
      name: "wETH",
      selected: false,
      balance: "0.00",
    },
    {
      id: "usdc",
      name: "USDC",
      selected: true,
      balance: "0.00",
    },
  ],
};
const defaultWithdraw = {
  network: {
    id: "l2",
    name: "zkSync Era",
  },
  assets: [
    {
      id: "weth",
      name: "wETH",
      selected: false,
      balance: "0.00",
    },
    {
      id: "usdc",
      name: "USDC",
      selected: true,
      balance: "0.00",
    },
  ],
};
if (!state.initialized) {
  initState({
    initialized: true,
    deposit: defaultDeposit,
    withdraw: defaultWithdraw,
    amount: "0.0",
  });
  return "";
}

// providers
const goerliProvider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/eth_goerli"
);

const zksyncGoerliProvider = new ethers.providers.JsonRpcProvider(
  "https://testnet.era.zksync.dev"
);
// get account
const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) {
  return (
    <div className="w3button">
      <Web3Connect connectLabel="Connect to a wallet" />
    </div>
  );
}

// fetch ABIs
const zkL2Abi = fetch(
  "https://gist.githubusercontent.com/mattlockyer/628e679517ba187b2ddca79de3b33673/raw/8a12d5abfb375f2b6a3003e649c0bd6dfaf68e52/zksyncL2Abi.json"
);

const zkAbi = fetch(
  "https://gist.githubusercontent.com/kcole16/3aa22a29b14ea6a1a7377b38463697ef/raw/c8a7249231ac00c7c3c9f1dc6188fbf28c262cb5/abi.json"
);

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);

if (!zkAbi.ok || !erc20Abi.ok || !zkL2Abi.ok) {
  return "";
}

const iface = new ethers.utils.Interface(zkAbi.body);
const ifaceL2 = new ethers.utils.Interface(zkL2Abi.body);

if (!state.chainId) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      const network =
        chainId === GOERLI_CHAIN_ID || chainId === ZKSYNC_GOERLI_CHAIN_ID
          ? "testnet"
          : "mainnet";
      console.log("chainId", chainId, "network", network);
      State.update({ chainId, network });
    });
  return "";
}
const { chainId, network } = state;

// https://era.zksync.io/docs/dev/building-on-zksync/useful-address.html
const contracts = {
  mainnet: {
    bridge: {
      L1ERC20BridgeProxy: "0x57891966931Eb4Bb6FB81430E6cE0A03AAbDe063",
      L2ERC20Bridge: "0x11f943b2c77b743AB90f4A0Ae7d5A4e7FCA3E102",
    },
    weth: {
      deposit: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // l1 token
      withdraw: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91", // l2 token
      decimals: 18,
    },
    usdc: {
      //deposit: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // l1 token
      deposit: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // l1 token
      withdraw: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4", // l2 token
      decimals: 6,
    },
  },
  testnet: {
    bridge: {
      L1ERC20BridgeProxy: "0x927DdFcc55164a59E0F33918D13a2D559bC10ce7",
      L2ERC20Bridge: "0x00ff932A6d70E2B8f1Eb4919e1e09C1923E7e57b",
    },
    weth: {
      // deposit: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      deposit: "0xd35CCeEAD182dcee0F148EbaC9447DA2c4D449c4",
      withdraw: undefined, // not found yet
      decimals: 18,
    },
    usdc: {
      // deposit: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
      deposit: "0xd35CCeEAD182dcee0F148EbaC9447DA2c4D449c4",
      withdraw: "0x0faF6df7054946141266420b43783387A78d82A9",
      decimals: 6,
    },
  },
};

const l2TxGasLimit = "900000";
const l2TxGasPerPubdataByte = "800";

const tokens = {
  weth: {
    decimals: 18,
  },
  usdc: {
    decimals: 6,
  },
};

const L2ERC20Bridge = new ethers.Contract(
  "0x00ff932A6d70E2B8f1Eb4919e1e09C1923E7e57b",
  zkL2Abi.body,
  zksyncGoerliProvider
);

if (!state.bridgeAddress) {
  L2ERC20Bridge.l1Bridge().then((bridgeAddress) => {
    console.log("bridgeAddress", bridgeAddress);
    State.update({ bridgeAddress });
  });
  return "";
}

const onAction = (data) => {
  if (!data.amount) return;
  if (data.action === "deposit") handleDeposit(data);
  if (data.action === "withdraw") handleWithdraw(data);
};

const handleDeposit = (data) => {
  console.log("handleDeposit", data);
  State.update({ isLoading: true, log: undefined, explorerLink: undefined });
  const l1Token = contracts[network][data.assetId].deposit;
  const amountBig = ethers.utils.parseUnits(
    data.amount,
    tokens[data.assetId].decimals
  );
  const ethTransferCost = ethers.utils.parseUnits(
    "0.000581642",
    tokens.weth.decimals
  );

  const encodedData = iface.encodeFunctionData(
    "deposit(address,address,uint256,uint256,uint256)",
    [sender, l1Token, amountBig, l2TxGasLimit, l2TxGasPerPubdataByte]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: contracts[network].bridge.L1ERC20BridgeProxy,
      data: encodedData,
      value: ethTransferCost,
      gasLimit: ethers.BigNumber.from("500000"),
    });
  // .then(() => handleApprove(data))
  // .catch((e) => {
  //   console.error("deposit error:", e);
  //   State.update({ isLoading: false });
  // });
};

const handleApprove = (data) => {
  console.log("handleApprove", data);
  const contract = new ethers.Contract(
    contracts[network][data.assetId].deposit,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  const amountBig = ethers.utils.parseUnits(data.amount, tokenDecimals);

  contract
    .approve(contracts[network].bridge.L1ERC20BridgeProxy, amountBig)
    .then((tx) => {
      console.log("approved: ", tx);

      State.update({
        log: "The TX hash is: " + tx.hash,
        explorerLink:
          `https://${network === "testnet" ? "goerli." : ""}etherscan.io/tx/` +
          tx.hash,
        isLoading: false,
      });
    })
    .catch((e) => {
      console.error("approve error:", e);
      State.update({ isLoading: false });
    });
};

const handleWithdraw = (data) => {
  console.log("handleWithdraw", data);
  State.update({ isLoading: true, log: undefined, explorerLink: undefined });
  const l2Token = contracts[network][data.assetId].withdraw;
  const amountBig = ethers.utils.parseUnits(
    data.amount,
    tokens[data.assetId].decimals
  );
  console.log("encodedData", sender, l2Token, amountBig);
  const encodedData = ifaceL2.encodeFunctionData(
    "withdraw(address,address,uint256)",
    [sender, l2Token, amountBig]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: contracts[network].bridge.L2ERC20Bridge,
      data: encodedData,
      gasLimit: ethers.BigNumber.from("500000"),
    })
    .then((d) => {
      console.log("d", d);
    })
    .catch((e) => {
      console.error("withdraw error:", e);
      State.update({ isLoading: false });
    });
};

const getTokenBalance = (
  sender,
  _chainId,
  tokenAddress,
  decimals,
  callback
) => {
  if (!sender) return;
  const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
  const iface = new ethers.utils.Interface(erc20Abi);
  const encodedData = iface.encodeFunctionData("balanceOf", [sender]);
  const provider =
    _chainId === GOERLI_CHAIN_ID ? goerliProvider : zksyncGoerliProvider;

  provider
    .call({
      to: tokenAddress,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );
      const balance = Big(receiverBalanceHex.toString())
        .div(Big(10).pow(decimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");

      console.log("getTokenBalance balance", balance, _chainId, tokenAddress);

      if (callback) callback(balance);
    });
};

// FETCH SENDER ETH BALANCE
if (sender) {
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      // console.log(
      //   "balance of eth:",
      //   Big(balance).div(Big(10).pow(tokenDecimals)).toFixed(4)
      // );
    });
}

const tab = !state.tab || state.tab === "deposit" ? "deposit" : "withdraw";
const clone = (o) => JSON.parse(JSON.stringify(o));
const { deposit, withdraw } = state;

if (!state.balancesUpdated) {
  // update token balances
  // l1
  // getTokenBalance(sender, contracts[network].weth.deposit, tokens.weth.decimals, (balance) => {
  //   if (!deposit) return;
  //   const cloned = clone(deposit);
  //   cloned.assets[0].balance = balance;
  //   State.update({ deposit: cloned });
  // });

  // goerli USDC
  getTokenBalance(
    sender,
    GOERLI_CHAIN_ID,
    contracts[network].usdc.deposit,
    tokens.usdc.decimals,
    (balance) => {
      const cloned = clone(deposit || defaultDeposit);
      cloned.assets[1].balance = balance;
      State.update({ deposit: cloned });
    }
  );

  //l2;
  // getTokenBalance(sender, contracts[network].weth.withdraw, tokens.weth.decimals, (balance) => {
  //   if (!withdraw) return;
  //   const cloned = clone(withdraw);
  //   cloned.assets[0].balance = balance;
  //   State.update({ withdraw: cloned });
  // });

  // zksync usdc
  getTokenBalance(
    sender,
    ZKSYNC_GOERLI_CHAIN_ID,
    contracts[network].usdc.withdraw,
    tokens.usdc.decimals,
    (balance) => {
      const cloned = clone(withdraw || defaultWithdraw);
      cloned.assets[1].balance = balance;
      State.update({ withdraw: cloned });
    }
  );

  State.update({ balancesUpdated: true });

  return "";
}

const onTabChange = (tab) => {
  // console.log("onTabChange", deposit, withdraw);
  State.update({ deposit: clone(withdraw), withdraw: clone(deposit), tab });
};

console.log(deposit.assets, withdraw.assets);

return (
  <Widget
    src="mattlock.near/widget/bridge-ui"
    props={{ ...state, onTabChange, onAction, title: "zkBridge" }}
  />
);
