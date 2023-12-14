// constants

const ETHEREUM_CHAIN_ID = 1;
const ZKSYNC_CHAIN_ID = 324;
const GOERLI_CHAIN_ID = 5;
const ZKSYNC_GOERLI_CHAIN_ID = 280;
const L1_MESSENGER_ADDRESS = "0x0000000000000000000000000000000000008008";
const l2TxGasLimit = "691703";
const l2TxGasLimitEth = "671358";
const l2TxGasPerPubdataByte = "800";

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
const goerliProvider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/eth_goerli"
);
const zksyncGoerliProvider = new ethers.providers.JsonRpcProvider(
  "https://testnet.era.zksync.dev"
);
const providersByChainId = {
  [ETHEREUM_CHAIN_ID]: ethereumProvider,
  [ZKSYNC_CHAIN_ID]: zksyncProvider,
  [GOERLI_CHAIN_ID]: goerliProvider,
  [ZKSYNC_GOERLI_CHAIN_ID]: zksyncGoerliProvider,
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
      if (chainId === GOERLI_CHAIN_ID || chainId === ZKSYNC_GOERLI_CHAIN_ID) {
        network = "testnet";
      }
      if (chainId === ETHEREUM_CHAIN_ID || chainId === ZKSYNC_CHAIN_ID) {
        network = "mainnet";
      }
      console.log("chainId", chainId, network);
      State.update({ chainId, network });
    });
  return "";
}
const { chainId, network } = state;

if (!network) {
  return "";
}

if (network === "incorrect") {
  return (
    <p>Please switch to Ethereum or zkSync mainnet (or Goerli testnets)</p>
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
    },
    weth: {
      deposit: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // l1 token
      withdraw: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91", // l2 token
      decimals: 18,
    },
    usdc: {
      deposit: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // l1 token
      withdraw: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4", // l2 token
      decimals: 6,
    },
  },
  testnet: {
    l1Provider: goerliProvider,
    l2Provider: zksyncGoerliProvider,
    bridge: {
      L1ERC20BridgeProxy: "0x927DdFcc55164a59E0F33918D13a2D559bC10ce7",
      L2ERC20Bridge: "0x00ff932A6d70E2B8f1Eb4919e1e09C1923E7e57b",
    },
    eth: {
      deposit: "TBD",
      withdraw: "TBD",
      decimals: 18,
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

const tokens = {
  eth: {
    decimals: 18,
  },
  usdc: {
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
  "https://gist.githubusercontent.com/mattlockyer/80b8323c91669cb5c662fc649a8d74dc/raw/bfecb8a4148a33ec03f7312f54bc68fc358e8ffe/zkEthAbi.json"
);

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);

if (!zkAbi.ok || !erc20Abi.ok || !zkL2Abi.ok) {
  return "";
}

const erc20IFace = new ethers.utils.Interface(erc20Abi.body);
const zkL1EthIFace = new ethers.utils.Interface(zkEthAbi.body);
const zkL1IFace = new ethers.utils.Interface(zkAbi.body);
const zkL2IFace = new ethers.utils.Interface(zkL2Abi.body);

// create contract instances

const L1Bridge = new ethers.Contract(
  contracts[network].bridge.L1ERC20BridgeProxy,
  zkAbi.body,
  contracts[network].l1Provider
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

function isWithdrawalFinalized(txHash, cb) {
  getWithdrawArgs(
    txHash,
    (res) => {
      L1Bridge.isWithdrawalFinalized(
        ethers.BigNumber.from(res.l1BatchNumber),
        res.proof.id
      ).then((res) => {
        cb(res);
      });
    },
    true
  );
}

if (!state.initLogs) {
  State.update({ initLogs: true });

  L2Bridge.queryFilter(L2Bridge.filters.FinalizeDeposit(sender)).then(
    (deposits) => {
      State.update({
        deposits,
      });
    }
  );

  L2Bridge.queryFilter(L2Bridge.filters.WithdrawalInitiated(sender)).then(
    (withdrawals) => {
      State.update({
        withdrawals,
      });
    }
  );

  // const txHash = `0x91180618b8453b820097aee15f37698691384a2cffd9108eb94d0c3070899e53`;
  // // const txHash = `0x973993b769d3aa3a956f15ac4b9f4d06d76b7b728656f74c3ff3155a34230879`;

  // isWithdrawalFinalized(txHash, (res) =>
  //   console.log("isWithdrawalFinalized", res)
  // );

  return "";
}

const onAction = (data) => {
  if (!data.amount) return;
  if (data.action === "deposit") handleDeposit(data);
  if (data.action === "withdraw") handleWithdraw(data);
};

// TODO HERE

const handleDepositEth = (data) => {
  const value = ethers.utils.parseUnits(data.amount);

  const encodedData = zkL1EthIFace.encodeFunctionData(
    "requestL2Transaction(address,uint256,bytes,uint256,uint256,bytes[],address)",
    [sender, value, "0x", l2TxGasLimitEth, l2TxGasPerPubdataByte, [], sender]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: contracts[network].bridge.L1ETHBridgeProxy,
      data: encodedData,
      value,
      gasLimit: ethers.BigNumber.from("500000"),
    });
};

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
    const ethTransferCost = ethers.utils.parseUnits(
      "0.000581642",
      tokens.eth.decimals
    );

    const encodedData = zkL1IFace.encodeFunctionData(
      "deposit(address,address,uint256,uint256,uint256,address)",
      [sender, l1Token, amountBig, l2TxGasLimit, l2TxGasPerPubdataByte, sender]
    );

    Ethers.provider()
      .getSigner()
      .sendTransaction({
        to: contracts[network].bridge.L1ERC20BridgeProxy,
        data: encodedData,
        value: ethTransferCost,
        gasLimit: ethers.BigNumber.from("500000"),
      });
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
          console.log("approved: ", tx);

          State.update({
            log: "Approval TX hash is: " + tx.hash,
            explorerLink:
              `https://${
                network === "testnet" ? "goerli." : ""
              }etherscan.io/tx/` + tx.hash,
            isLoading: false,
          });

          callback(true);
        })
        .catch((e) => {
          console.error("approve error:", e);
          State.update({ isLoading: false });
          callback(false);
        });
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
  const encodedData = zkL2IFace.encodeFunctionData(
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

const tab = !state.tab || state.tab === "deposit" ? "deposit" : "withdraw";
const clone = (o) => JSON.parse(JSON.stringify(o));
const { deposit, withdraw } = state;

if (!state.balancesUpdated) {
  // update token balances
  // l1

  // FETCH SENDER ETH BALANCE
  if (sender) {
    Ethers.provider()
      .getBalance(sender)
      .then((balance) => {
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
  }

  //l2;
  // getTokenBalance(sender, contracts[network].weth.withdraw, tokens.eth.decimals, (balance) => {
  //   if (!withdraw) return;
  //   const cloned = clone(withdraw);
  //   cloned.assets[0].balance = balance;
  //   State.update({ withdraw: cloned });
  // });

  // zksync/zksync goerli usdc
  getTokenBalance(
    sender,
    false,
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

const { deposits, withdrawals } = state;

return (
  <>
    <Widget
      src="mattlock.near/widget/bridge-ui"
      props={{ ...state, onTabChange, onAction, title: "zkBridge" }}
    />

    {deposits.map((d) => (
      <p>{d}</p>
    ))}
  </>
);
