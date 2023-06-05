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
            }
        }
    }
`;

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
  deposits: [],
  withdrawls: [],
});

const { chainId, withdrawls, deposits } = state;

const isMainnet = chainId === 1 || chainId === 1101;

const getDeposits = () => {};

const getWithdrawals = () => {
  if (!sender) return;

  const list = fetch(
    `https://open-api-v2-staging.polygon.technology/zkevm-${
      isMainnet ? "mainnet" : "testnet"
    }/withdraw/address?userAddress=${sender}`
  );

  if (!list.body.success) {
    return;
  }

  State.update({
    withdrawls: list.body.result.filter(
      (tx) => tx.status === "READY_TO_CLAIM" || tx.status === "CLAIMING"
    ),
  });
};

getWithdrawals();

const refreshList = () => {
  getWithdrawals();
};

const claimTransaction = (tx) => {
  console.log("claimTransaction", tx);
};

return (
  <Layout>
    <h3>Pending transactions:</h3>
    <button class="refresh" onClick={refreshList}>
      refresh list
    </button>
    <ul>
      {withdrawls.map((t) => {
        const txUrl = `https://${
          isMainnet ? "" : "testnet-"
        }zkevm.polygonscan.com/tx/${t.transactionHash}`;

        const token = tokens.find(
          (token) =>
            t.childToken.toLowerCase() === token.address.toLowerCase() &&
            token.chainId === chainId
        );

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
            </div>
            <button onClick={() => claimTransaction(t)}>Claim</button>
          </li>
        );
      })}
    </ul>
  </Layout>
);
