// constants

const ETHEREUM_CHAIN_ID = 1;
const ZKSYNC_CHAIN_ID = 324;
const SEPOLIA_CHAIN_ID = 11155111;
const ZKSYNC_SEPOLIA_CHAIN_ID = 300;
const L1_MESSENGER_ADDRESS = "0x0000000000000000000000000000000000008008";
const l2TxGasLimit = "900000";
const l2TxGasLimitWithdraw = "6000000";
const l2TxGasPerPubdataByte = "800";
const l2MaxGasPrice = "2";
const depositDisabledMsg =
  "For deposits, please switch to Ethereum mainnet or Sepolia testnet.";
const withdrawDisabledMsg =
  "For withdrawals, please switch to zkSync mainnet or zkSync testnet.";
const sortByBlockNumber = (a, b) => b.blockNumber - a.blockNumber;
const l2DepositFee = ethers.utils.formatUnits(
  Big(l2MaxGasPrice)
    .mul(ethers.utils.parseUnits(l2TxGasLimit, "gwei"))
    .toString(),
  "wei"
);
const catchApproveError = (e) => {
  console.error("approve error:", e);
  if (e.message) {
    if (/rejected/gi.test(e.message)) {
      e.message = "You rejected the transaction.";
    }
    State.update({ isLoading: false, log: e.message });
    setTimeout(() => State.update({ log: null }), 3000);
    return;
  }
  State.update({ isLoading: false });
};
const approvedTx = (tx, zkSync) => {
  State.update({
    log: "Approved",
    explorerLink: `https://${network === "testnet" ? "sepolia." : ""}${
      zkSync ? "explorer.zksync.io/" : "etherscan.io/"
    }tx/${tx.hash}`,
    isLoading: false,
  });
};

// state
const defaultDeposit = {
  network: {
    id: "l1",
    name: "Ethereum",
  },
  assets: [
    {
      id: "eth",
      name: "ETH",
      selected: true,
      balance: "0.00",
    },
    {
      id: "usdc",
      name: "USDC",
      selected: false,
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
      id: "eth",
      name: "ETH",
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
    deposits: [],
    withdrawals: [],
    ethDeposits: [],
    ethWithdrawals: [],
    tokens: [],
  });
  return "";
}

// providers
const ethereumProvider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/eth"
);
const zksyncProvider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.era.zksync.io"
);
const sepoliaProvider = new ethers.providers.JsonRpcProvider(
  "https://ethereum-sepolia.publicnode.com"
);
const zksyncSepoliaProvider = new ethers.providers.JsonRpcProvider(
  "https://sepolia.era.zksync.dev"
);
const providersByChainId = {
  [ETHEREUM_CHAIN_ID]: ethereumProvider,
  [ZKSYNC_CHAIN_ID]: zksyncProvider,
  [SEPOLIA_CHAIN_ID]: sepoliaProvider,
  [ZKSYNC_SEPOLIA_CHAIN_ID]: zksyncSepoliaProvider,
};

// get account
const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) {
  return (
    <div className="w3button">
      <Web3Connect connectLabel="Connect to a wallet" />
    </div>
  );
}

if (!state.chainId) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      let network = "incorrect";
      if (chainId === SEPOLIA_CHAIN_ID || chainId === ZKSYNC_SEPOLIA_CHAIN_ID) {
        network = "testnet";
      }
      if (chainId === ETHEREUM_CHAIN_ID || chainId === ZKSYNC_CHAIN_ID) {
        network = "mainnet";
      }
      console.log("chainId", chainId, network);
      let log, depositDisabled;
      if (chainId === ZKSYNC_CHAIN_ID || chainId === ZKSYNC_SEPOLIA_CHAIN_ID) {
        log = depositDisabledMsg;
        depositDisabled = true;
      }
      const L1ExplorerLink = `https://${
        network === "testnet" ? "sepolia." : ""
      }etherscan.io/tx/`;
      const L2ExplorerLink = `https://${
        network === "testnet" ? "sepolia." : ""
      }zksync.io/tx/`;

      State.update({
        chainId,
        network,
        log,
        depositDisabled,
        L1ExplorerLink,
        L2ExplorerLink,
      });
    });
  return "";
}
const { chainId, network } = state;

if (!network) {
  return "";
}

if (network === "incorrect") {
  return (
    <p>Please switch to Ethereum or zkSync mainnet (or Sepolia testnets)</p>
  );
}

// https://era.zksync.io/docs/dev/building-on-zksync/useful-address.html
const contracts = {
  mainnet: {
    l1Provider: ethereumProvider,
    l2Provider: zksyncProvider,
    bridge: {
      L1ETHBridgeProxy: "0x32400084C286CF3E17e7B677ea9583e60a000324",
      L1ERC20BridgeProxy: "0x57891966931Eb4Bb6FB81430E6cE0A03AAbDe063",
      L2ERC20Bridge: "0x11f943b2c77b743AB90f4A0Ae7d5A4e7FCA3E102",
    },
    eth: {
      decimals: 18,
      deposit: "0x32400084C286CF3E17e7B677ea9583e60a000324",
      withdraw: "0x000000000000000000000000000000000000800A", // l2 token
    },
    usdc: {
      deposit: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // l1 token
      withdraw: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4", // l2 token
      decimals: 6,
    },
  },
  testnet: {
    l1Provider: sepoliaProvider,
    l2Provider: zksyncSepoliaProvider,
    bridge: {
      L1ERC20BridgeProxy: "0x2Ae09702F77a4940621572fBcDAe2382D44a2cbA",
      L2ERC20Bridge: "0x681A1AFdC2e06776816386500D2D461a6C96cB45",
    },
    eth: {
      deposit: "0x9A6DE0f62Aa270A8bCB1e2610078650D539B1Ef9",
      withdraw: "0x000000000000000000000000000000000000800A",
      decimals: 18,
    },
    usdc: {
      deposit: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      withdraw: "0xaF2B4bCe93c39626C829b8e9dD537cCEB938D87D",
      decimals: 6,
    },
  },
};

const tokens = {
  eth: {
    icon: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
    decimals: 18,
  },
  usdc: {
    icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    decimals: 6,
  },
};

// fetch ABIs

const zkL2Abi = fetch(
  "https://gist.githubusercontent.com/mattlockyer/628e679517ba187b2ddca79de3b33673/raw/8a12d5abfb375f2b6a3003e649c0bd6dfaf68e52/zksyncL2Abi.json"
);

const zkAbi = fetch(
  "https://gist.githubusercontent.com/mattlockyer/35ebdd13e5dfcf612c11e7087e9d1e59/raw/3967fe7d0cf16f813c069cc6021f9663bb1650a6/zksyncL1Abi.json"
);

const zkEthAbi = fetch(
  "https://gist.githubusercontent.com/mattlockyer/80b8323c91669cb5c662fc649a8d74dc/raw/70168542489641d19d0157a87e6b01528bac1063/zkEthAbi.json"
);

const zkEthTokenAbi = fetch(
  "https://gist.githubusercontent.com/mattlockyer/52a6b1213903abcb8268a2415ab33b52/raw/b63c89cad21112fbd3f460ed2d42338e650360b7/l2EthToken.json"
);

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);

// wait for all abi to load
if (
  !zkAbi.ok ||
  !erc20Abi.ok ||
  !zkL2Abi.ok ||
  !zkEthAbi.ok ||
  !zkEthTokenAbi.ok
) {
  return "";
}

const erc20IFace = new ethers.utils.Interface(erc20Abi.body);
const zkL1EthIFace = new ethers.utils.Interface(zkEthAbi.body);
const zkL2EthTokenIFace = new ethers.utils.Interface(zkEthTokenAbi.body);
const zkL1IFace = new ethers.utils.Interface(zkAbi.body);
const zkL2IFace = new ethers.utils.Interface(zkL2Abi.body);

// create contract instances for reads

const L1Bridge = new ethers.Contract(
  contracts[network].bridge.L1ERC20BridgeProxy,
  zkAbi.body,
  contracts[network].l1Provider
);

const L1EthBridge = new ethers.Contract(
  contracts[network].eth.deposit,
  zkEthAbi.body,
  contracts[network].l1Provider
);

const L2BridgeEth = new ethers.Contract(
  contracts[network].eth.withdraw,
  zkEthTokenAbi.body,
  contracts[network].l2Provider
);

const L2Bridge = new ethers.Contract(
  contracts[network].bridge.L2ERC20Bridge,
  zkL2Abi.body,
  contracts[network].l2Provider
);

// proof testing

function getWithdrawalLog(txHash, cb, index) {
  if (!index) index = 0;
  contracts[network].l2Provider
    .send("eth_getTransactionReceipt", [txHash])
    .then((receipt) => {
      if (!receipt) return cb(null);

      const log = receipt.logs.filter(
        (log) =>
          log.address == L1_MESSENGER_ADDRESS &&
          log.topics[0] ==
            ethers.utils.id("L1MessageSent(address,bytes32,bytes)")
      )[index];

      cb({
        log,
        l1BatchTxId: receipt.l1BatchTxIndex,
      });
    });
}

function getWithdrawalL2ToL1Log(txHash, cb, index) {
  if (!index) index = 0;
  contracts[network].l2Provider
    .send("eth_getTransactionReceipt", [txHash])
    .then((receipt) => {
      if (!receipt) return cb(null);
      const messages = Array.from(receipt.l2ToL1Logs.entries()).filter(
        ([_, log]) => log.sender == L1_MESSENGER_ADDRESS
      );
      const [l2ToL1LogIndex, l2ToL1Log] = messages[index];

      cb({
        l2ToL1LogIndex,
        l2ToL1Log,
      });
    });
}

function getWithdrawArgs(txHash, cb, rawProof, index) {
  if (!index) index = 0;

  getWithdrawalLog(
    txHash,
    ({ log, log: { l1BatchNumber, data }, l1BatchTxId }) => {
      // console.log("getWithdrawalLog", log);
      getWithdrawalL2ToL1Log(txHash, ({ l2ToL1LogIndex }) => {
        // console.log("getWithdrawalL2ToL1Log", l2ToL1LogIndex);
        contracts[network].l2Provider
          .send("zks_getL2ToL1LogProof", [txHash, l2ToL1LogIndex])
          .then((proof) => {
            if (!proof) {
              return console.log("log proof not found");
            }
            const abiCoder = new ethers.utils.AbiCoder();
            const message = abiCoder.decode(["bytes"], data)[0];

            cb({
              l1BatchNumber,
              l2MessageIndex: proof.id,
              l2TxNumberInBlock: l1BatchTxId,
              message,
              sender,
              proof: rawProof ? proof : proof.proof,
            });
          });
      });
    }
  );
}

function isWithdrawalFinalized(txHash, isEth, cb, returnArgs) {
  if (!isEth) isEth = false;
  getWithdrawArgs(
    txHash,
    (res) => {
      if (!res) {
        if (returnArgs) {
          return cb({
            finalized: false,
          });
        }
        cb(false);
      }
      const args = [ethers.BigNumber.from(res.l1BatchNumber), res.proof.id];
      (isEth
        ? L1EthBridge.isEthWithdrawalFinalized(...args)
        : L1Bridge.isWithdrawalFinalized(...args)
      ).then((finalized) => {
        if (returnArgs) {
          return cb({
            finalized,
            withdrawalArgs: {
              ...res,
              proof: res.proof.proof,
            },
          });
        }
        cb(finalized);
      });
    },
    true
  );
}

// TX logs - getting deposits and withdrawals

if (!state.initLogs) {
  State.update({ initLogs: true });

  // eth deposits

  L2BridgeEth.queryFilter(L2BridgeEth.filters.Transfer(sender, sender)).then(
    (ethDeposits) => {
      State.update({
        ethDeposits: ethDeposits.map((d) => ({ ...d, isEth: true })),
      });
    }
  );

  L2BridgeEth.queryFilter(L2BridgeEth.filters.Withdrawal(null, sender)).then(
    (withdrawals) => {
      const ethWithdrawals = [],
        { length } = withdrawals;
      let ret = 0;
      const check = (i) => {
        const w = { ...withdrawals[i] };
        isWithdrawalFinalized(
          w.transactionHash,
          true,
          (res) => {
            Object.assign(w, res, { isEth: true });
            ethWithdrawals.push(w);
            ret++;
            if (ret === length) {
              State.update({
                ethWithdrawals,
              });
            }
          },
          true
        );
      };
      for (let i = 0; i < length; i++) check(i);
    }
  );

  // erc20

  L2Bridge.queryFilter(L2Bridge.filters.FinalizeDeposit(sender)).then(
    (deposits) => {
      State.update({
        deposits,
      });
    }
  );

  // TODO get finalized status for erc20 withdrawals

  L2Bridge.queryFilter(L2Bridge.filters.WithdrawalInitiated(sender)).then(
    (_withdrawals) => {
      const withdrawals = [],
        { length } = _withdrawals;
      let ret = 0;
      const check = (i) => {
        const w = { ..._withdrawals[i] };
        isWithdrawalFinalized(
          w.transactionHash,
          false,
          (res) => {
            Object.assign(w, res, { isEth: false });
            withdrawals.push(w);
            ret++;
            if (ret === length) {
              State.update({
                withdrawals,
              });
            }
          },
          true
        );
      };
      for (let i = 0; i < length; i++) check(i);
    }
  );

  return "";
}

// deposits

const handleDepositEth = (data) => {
  const amount = ethers.utils.parseUnits(data.amount);
  const value = amount.add(ethers.utils.parseUnits(l2DepositFee, "wei"));

  const encodedData = zkL1EthIFace.encodeFunctionData(
    "requestL2Transaction(address,uint256,bytes,uint256,uint256,bytes[],address)",
    [sender, amount, "0x", l2TxGasLimit, l2TxGasPerPubdataByte, [], sender]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: contracts[network].eth.deposit,
      data: encodedData,
      value,
      gasLimit: ethers.BigNumber.from("500000"),
    })
    .then(approvedTx)
    .catch(catchApproveError);
};

// TODO deposit on txBridge is missing the final address arg
// NOT "deposit(address,address,uint256,uint256,uint256,address)"
// BUT "deposit(address,address,uint256,uint256,uint256)"

const handleDeposit = (data) => {
  console.log("handleDeposit", data);
  State.update({ isLoading: true, log: undefined, explorerLink: undefined });

  if (data.assetId === "eth") {
    return handleDepositEth(data);
  }

  handleApprove(data, (approveSuccess) => {
    if (!approveSuccess) {
      return console.log("approval was not successful");
    }

    const l1Token = contracts[network][data.assetId].deposit;
    const amountBig = ethers.utils.parseUnits(
      data.amount,
      tokens[data.assetId].decimals
    );

    const value = ethers.utils.parseUnits(l2DepositFee, "wei");

    const encodedData = zkL1IFace.encodeFunctionData(
      "deposit(address,address,uint256,uint256,uint256,address)",
      [sender, l1Token, amountBig, l2TxGasLimit, l2TxGasPerPubdataByte, sender]
    );

    Ethers.provider()
      .getSigner()
      .sendTransaction({
        to: contracts[network].bridge.L1ERC20BridgeProxy,
        data: encodedData,
        value,
        gasLimit: ethers.BigNumber.from("500000"),
      })
      .then(approvedTx)
      .catch(catchApproveError);
  });
};

const handleApprove = (data, callback) => {
  console.log("handleApprove", data);
  const contract = new ethers.Contract(
    contracts[network][data.assetId].deposit,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );
  const { decimals } = tokens[data.assetId];
  const amountBig = ethers.utils.parseUnits(data.amount, decimals);

  contract
    .allowance(sender, contracts[network].bridge.L1ERC20BridgeProxy)
    .then((rawAllowance) => {
      console.log("rawAllowance", rawAllowance);
      const hasAllowance = amountBig.lte(rawAllowance);
      if (hasAllowance) {
        return callback(true);
      }
      console.log("amountBig", amountBig);
      contract
        .approve(contracts[network].bridge.L1ERC20BridgeProxy, amountBig)
        .then((tx) => {
          approvedTx(tx);
          callback(true);
        })
        .catch((e) => {
          catchApproveError(e);
          callback(false);
        });
    });
};

// withdrawals

const handleFinalizeEthWithdrawal = (withdrawal) => {
  const { l1BatchNumber, l2MessageIndex, l2TxNumberInBlock, message, proof } =
    withdrawal.withdrawalArgs;

  const contract = new ethers.Contract(
    contracts[network].eth.deposit,
    zkEthAbi.body,
    Ethers.provider().getSigner()
  );

  console.log(l1BatchNumber, l2MessageIndex, l2TxNumberInBlock, message, proof);

  contract
    .finalizeEthWithdrawal(
      l1BatchNumber,
      l2MessageIndex,
      l2TxNumberInBlock,
      message,
      proof,
      {}
    )
    .then((res) => console.log(res));
};

const withdrawalActions = [
  {
    labelComplete: "(finalized)",
    completeKey: "finalized",
    actionLabel: "Finalize",
    action: handleFinalizeEthWithdrawal,
  },
];

const handleWithdrawEth = (data) => {
  const value = ethers.utils.parseUnits(data.amount);

  const encodedData = zkL2EthTokenIFace.encodeFunctionData(
    "withdraw(address)",
    [sender]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: contracts[network][data.assetId].withdraw,
      data: encodedData,
      value,
      gasLimit: ethers.BigNumber.from(l2TxGasLimitWithdraw),
    })
    .then((tx) => {
      approvedTx(tx, true);
    })
    .catch(catchApproveError);
};

const handleWithdraw = (data) => {
  console.log("handleWithdraw", data);
  State.update({ isLoading: true, log: undefined, explorerLink: undefined });

  if (data.assetId === "eth") {
    return handleWithdrawEth(data);
  }

  const l2Token = contracts[network][data.assetId].withdraw;
  const amountBig = ethers.utils.parseUnits(
    data.amount,
    tokens[data.assetId].decimals
  );
  console.log("encodedData", sender, l2Token, amountBig);
  const encodedData = zkL2IFace.encodeFunctionData(
    "withdraw(address,address,uint256)",
    [sender, l2Token, amountBig]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: contracts[network].bridge.L2ERC20Bridge,
      data: encodedData,
      gasLimit: ethers.BigNumber.from(l2TxGasLimitWithdraw),
    })
    .then((tx) => {
      approvedTx(tx, true);
    })
    .catch(catchApproveError);
};

const tab = !state.tab || state.tab === "deposit" ? "deposit" : "withdraw";
const clone = (o) => JSON.parse(JSON.stringify(o));
const { deposit, withdraw } = state;

// balances

const getTokenBalance = (sender, isL1, tokenAddress, decimals, callback) => {
  if (!sender) return;
  const encodedData = erc20IFace.encodeFunctionData("balanceOf", [sender]);
  const provider = isL1
    ? contracts[network].l1Provider
    : contracts[network].l2Provider;

  provider
    .call({
      to: tokenAddress,
      data: encodedData,
    })
    .then((rawBalance) => {
      if (rawBalance === "0x") {
        return callback(0);
      }
      const receiverBalanceHex = erc20IFace.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );
      const balance = Big(receiverBalanceHex.toString())
        .div(Big(10).pow(decimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");

      callback(balance);
    });
};

if (sender && !state.balancesUpdated) {
  // l1
  contracts[network].l1Provider.getBalance(sender).then((balance) => {
    const cloned = clone(deposit || defaultDeposit);
    const formatted = ethers.utils.formatUnits(balance);
    cloned.assets[0].balance = formatted.substring(
      0,
      formatted.indexOf(".") + 5
    );
    State.update({ deposit: cloned });

    // USDC
    getTokenBalance(
      sender,
      true,
      contracts[network].usdc.deposit,
      tokens.usdc.decimals,
      (balance) => {
        cloned.assets[1].balance = balance;
        State.update({ deposit: cloned });
      }
    );
  });

  //l2;
  contracts[network].l2Provider
    .send("eth_getBalance", [sender])
    .then((balance) => {
      const cloned = clone(withdraw || defaultWithdraw);
      const formatted = ethers.utils.formatUnits(balance);
      cloned.assets[0].balance = formatted.substring(
        0,
        formatted.indexOf(".") + 5
      );
      State.update({ withdraw: cloned });

      // USDC
      getTokenBalance(
        sender,
        false,
        contracts[network].usdc.withdraw,
        tokens.usdc.decimals,
        (balance) => {
          cloned.assets[1].balance = balance;
          State.update({ withdraw: cloned });
        }
      );
    });

  State.update({ balancesUpdated: true });
  return "";
}

// bridge-ui functions

const onAction = (data) => {
  if (!data.amount) return;
  if (data.action === "deposit") handleDeposit(data);
  if (data.action === "withdraw") handleWithdraw(data);
};

const onTabChange = (tab) => {
  let log = null;

  const depositDisabled =
    tab === "deposit" &&
    (chainId === ZKSYNC_CHAIN_ID || chainId === ZKSYNC_SEPOLIA_CHAIN_ID);
  const withdrawDisabled =
    tab === "withdraw" &&
    (chainId === ETHEREUM_CHAIN_ID || chainId === SEPOLIA_CHAIN_ID);

  if (depositDisabled) {
    log = depositDisabledMsg;
  }
  if (withdrawDisabled) {
    log = withdrawDisabledMsg;
  }

  State.update({
    deposit: clone(withdraw),
    withdraw: clone(deposit),
    depositDisabled,
    withdrawDisabled,
    tab,
    log,
  });
};

const { deposits, withdrawals, ethDeposits, ethWithdrawals } = state;
const allDeposits = [...deposits, ...ethDeposits].sort(sortByBlockNumber);
const allWithdrawals = [...withdrawals, ...ethWithdrawals].sort(
  sortByBlockNumber
);

return (
  <>
    <Widget
      src="mattlock.near/widget/bridge-ui"
      props={{
        ...state,
        onTabChange,
        onAction,
        title: "zkBridge",
        tokens,
        allDeposits,
        allWithdrawals,
        withdrawalActions,
      }}
    />
  </>
);
