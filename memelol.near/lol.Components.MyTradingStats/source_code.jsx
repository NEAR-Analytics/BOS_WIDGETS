const { format, Token } = VM.require(`memelol.near/widget/lol.Utils`);
const { Button } = VM.require(`memelol.near/widget/lol.Components.Button`);
const { contractName } = props;

const Stats = styled.div`
  background: ${(props) => props.color} !important;

  .stat-block {
    width: 400px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    display: flex;

    @media screen and (max-width: 786px) {
      width: 100%;
      flex-direction: column;

      h2 {
        font-size: 2rem;
      }
    }
  }
`;

const [myStats, setMyStats] = useState({
  buy: 0,
  sell: 0,
  ftBalance: 0,
  completePuzzles: 0,
});

const checkRefSwaps = async () => {
  const baseUrl = `https://api.pikespeak.ai/event-historic/${context.accountId}?limit=100000&timestampStart=2024-01-08%2000%3A00%3A00&contractFilter=v2.ref-finance.near&filters=SWAP`;

  asyncFetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
    },
  }).then((resp) => {
    const filterTxn = (inContract, outContract, method) =>
      resp.body
        .map((swap) => {
          const tx = swap.transaction_view;

          return tx.token_in === inContract && tx.token_out === outContract
            ? parseFloat(tx[method])
            : 0;
        })
        .reduce((a, b) => a + b, 0);

    const stats = myStats;
    stats.buy = filterTxn("wrap.near", "memelol.near", "amount_in").toFixed(2);
    stats.sell = filterTxn("memelol.near", "wrap.near", "amount_out").toFixed(
      2
    );

    setMyStats(stats);
  });
};

const checkFTBalance = () => {
  const ftBalance = Near.view(contractName, "ft_balance_of", {
    account_id: context.accountId,
  });
  const stats = myStats;
  stats.ftBalance = Big(ftBalance).div(Big(10).pow(24)).toNumber().toFixed();

  setMyStats(stats);
};

if (context.accountId) {
  checkRefSwaps();
  checkFTBalance();
}

const PREMIUM_HOLD_AMOUNT = 50;

const StatBlock = ({ text, value, color, near, children }) => (
  <div className="d-flex gap-4 flex-column">
    <div className="stat-block">
      <small>{text}</small>
      {near !== undefined ? (
        <Token near={near} size="30">
          <h2 className={`font ${color}`}>{format(parseFloat(value))}</h2>
        </Token>
      ) : (
        <h2 className={`font ${color}`}>{value}</h2>
      )}
    </div>
    {children}
  </div>
);

return (
  <div className="mint-section my-stats">
    <h1 className="font">My Profile</h1>

    <Stats
      className="mint-section"
      color={
        myStats.buy - myStats.sell > PREMIUM_HOLD_AMOUNT
          ? "rgb(255 177 255 / 70%)"
          : "#efefef"
      }
    >
      <StatBlock
        text="Account Level"
        value={
          myStats.buy - myStats.sell > PREMIUM_HOLD_AMOUNT ? "Premium" : "Base"
        }
      >
        <div style={{ fontSize: "14px", textAlign: "left" }}>
          <i className="bi bi-info-circle" />
          Increase your trading activity to have at least
          <b>{PREMIUM_HOLD_AMOUNT} NEAR</b> in a diff and unlock <b>Premium</b>{" "}
          features
        </div>
      </StatBlock>
    </Stats>
    <Stats className="mint-section" color="rgb(255 242 158 / 30%)">
      <h2 className="font">Trading Stats</h2>
      <div className="d-flex gap-2 flex-column">
        <StatBlock
          text="Bought $LOL on"
          value={myStats.buy}
          color="text-success"
          near={true}
        />
        <StatBlock
          text="Sold $LOL on"
          value={myStats.sell}
          color="text-danger"
          near={true}
        />
        <hr />
        <StatBlock
          text="Trading Diff"
          value={(myStats.buy - myStats.sell).toFixed(2)}
          color={`text-${
            myStats.buy - myStats.sell > 0 ? "success" : "danger"
          }`}
          near={true}
        />
      </div>
    </Stats>
    <Stats className="mint-section" color="rgb(148 182 255 / 30%)">
      <div className="d-flex gap-2 flex-column">
        <StatBlock text="Hodling" value={myStats.ftBalance} near={false} />
      </div>
    </Stats>
  </div>
);
