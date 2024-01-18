const Layout = styled.div`
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    padding: 8px 16px;
    background-color: #151718;
    border-radius: 12px;
    max-width: 240px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: #fff;

    h3 {
        font-size: 14px;
    }

    .refresh {
        border: none;
        background: rgba(255, 255, 255, 0.6);
    }

    ul {
        list-style: none;
        margin-top: 16px;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;

        li {
            background: #2d2f30;
            padding: 4px 8px;
            display: flex;
            justify-content: space-between;
            gap: 4px;

            .info {
                display: flex;
                flex-direction: column;
                gap: 4px;

                .token {
                    font-weight: bold;
                }

                a{ 
                    color: lightblue;
                }

                .date {
                    font-size: 10px;
                    color: rgba(255, 255, 255, 0.6);
                }
            }

            button {
                font-size: 12px;
                color: #fff;
                background: #8247E5;
                border: none;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100px;
            }
        }
    }
`;

const bridgeAbi = [
  {
    inputs: [
      {
        internalType: "bytes32[32]",
        name: "smtProof",
        type: "bytes32[32]",
      },
      {
        internalType: "uint32",
        name: "index",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "mainnetExitRoot",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "rollupExitRoot",
        type: "bytes32",
      },
      {
        internalType: "uint32",
        name: "originNetwork",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "originTokenAddress",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "destinationNetwork",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "destinationAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "metadata",
        type: "bytes",
      },
    ],
    name: "claimAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const bridgeIface = new ethers.utils.Interface(bridgeAbi);

const sender = Ethers.send("eth_requestAccounts", [])[0];

const tokens = props.tokens ?? [];

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    });
}

State.init({
  deposit: [],
  withdraw: [],
  isToastOpen: false,
});

const onOpenChange = (v) => {
  State.update({
    isToastOpen: false,
  });
};

const { chainId, withdraw, deposit, isToastOpen, variant, title, description } =
  state;

const isMainnet = chainId === 1 || chainId === 1101;

const BRIDGE_CONTRACT_ADDRESS = isMainnet
  ? "0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe"
  : "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7";

const getTransactions = (type) => {
  if (!sender) return;

  asyncFetch(
    `https://open-api-v2-staging.polygon.technology/zkevm-${
      isMainnet ? "mainnet" : "testnet"
    }/${type}/address?userAddress=${sender}`
  ).then((res) => {
    if (!res.body.success) {
      return;
    }
    State.update({
      [type]: res.body.result.filter((tx) => tx.status !== "CLAIMED"),
    });
  });
};

const refreshList = () => {
  getTransactions("withdraw");
  getTransactions("deposit");
};

refreshList();

const claimTransaction = (tx) => {
  console.log("chainId", chainId);
  const isPolygonNetwork = chainId === 1101 || chainId === 1442;
  if (isPolygonNetwork) {
    State.update({
      isToastOpen: true,
      variant: "error",
      title: "Invalid network",
      description: "Switch to ethereum network to claim transactions",
    });
    return;
  }

  const url = `https://proof-generator.polygon.technology/api/zkevm/${
    isMainnet ? "mainnet" : "testnet"
  }/merkle-proof?net_id=1&deposit_cnt=${tx.counter}`;

  asyncFetch(url).then((res) => {
    if (!res.ok) {
      console.log("merkele proof errror", res);
      return;
    }

    const { proof } = res.body;

    const encodedData = bridgeIface.encodeFunctionData(
      "claimAsset(bytes32[32],uint32,bytes32,bytes32,uint32,address,uint32,address,uint256,bytes)",
      [
        proof["merkle_proof"],
        tx.counter,
        proof["main_exit_root"],
        proof["rollup_exit_root"],
        0,
        tx.childToken,
        0,
        tx.depositReceiver,
        tx.amounts[0],
        "0x",
      ]
    );

    Ethers.provider()
      .getSigner()
      .sendTransaction({
        to: BRIDGE_CONTRACT_ADDRESS,
        data: encodedData,
        value: amountBig,
        gasLimit: ethers.BigNumber.from("500000"),
      })
      .then((tx) => {
        consle.log("tx:", tx);
        refreshList();
      })
      .catch((e) => {
        console.log("error:", e);
        refreshList();
      });
  });
};

const noWithdrawls = withdraw?.length === 0;
const noDeposits = deposit?.length === 0;
const isEmpty = noWithdrawls && noDeposits;

return (
  <Layout>
    <h3>Pending transactions:</h3>
    <button class="refresh" onClick={refreshList}>
      refresh list
    </button>
    <ul>
      {!noWithdrawls && <div>Withdrawls:</div>}
      {withdraw.map((t) => {
        const txUrl = `https://${
          isMainnet ? "" : "testnet-"
        }zkevm.polygonscan.com/tx/${t.transactionHash}`;

        const token = tokens.find(
          (token) => t.childToken.toLowerCase() === token.address.toLowerCase()
        );

        if (!token) return null;

        const amount = ethers.utils.formatUnits(
          t.amounts[0],
          token?.decimals || 18
        );

        const isPending = t.status === "BRIDGED";

        return (
          <li>
            <div class="info">
              <span class="token">
                {amount} {token?.symbol}
              </span>
              <a href={txUrl} target="_blank">
                Tx info
              </a>
              <span class="date">{t.timestamp.slice(0, -8)}</span>
            </div>
            <button disabled={isPending} onClick={() => claimTransaction(t)}>
              <span>Claim</span>
              {isPending && <span>(pending... arrive in ~60 mins)</span>}
            </button>
          </li>
        );
      })}

      {!noDeposits && <div>Deposits:</div>}

      {deposit.map((t) => {
        const txUrl = `https://${isMainnet ? "" : "goerli."}etherscan.io/tx/${
          t.transactionHash
        }`;

        const token = tokens.find(
          (token) => t.rootToken.toLowerCase() === token.address.toLowerCase()
        );

        if (!token) return null;

        const amount = ethers.utils.formatUnits(
          t.amounts[0],
          token?.decimals || 18
        );

        return (
          <li>
            <div class="info">
              <span class="token">
                {amount} {token?.symbol}
              </span>
              <a href={txUrl} target="_blank">
                Tx info
              </a>
              <span class="date">{t.timestamp.slice(0, -8)}</span>
              <span>Funds will arrive in ~15 mins</span>
            </div>
          </li>
        );
      })}
      {isEmpty && (
        <li>
          <span>0 pending transactions</span>
        </li>
      )}
    </ul>
    <Widget
      src="proxlabs.near/widget/toast"
      props={{ open: isToastOpen, variant, title, description, onOpenChange }}
    />
  </Layout>
);
