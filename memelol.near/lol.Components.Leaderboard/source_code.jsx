const { format, Token } = VM.require(`memelol.near/widget/lol.Utils`);
const { contractName, assets } = props;

const WinnerCard = styled.div`
  display: flex;
  background: #fff;
  justify-content: center;
  font-size: 18px;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1.5rem;
  border: 3px solid black;
  border-radius: 20px;
  width: 45%;
  box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);
  position: relative;

  .profile {
    justify-content: start;
  }

  .text-truncate.text-muted {
    max-width: 200px;
  }

  .trophy {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;

    @keyframes jump-shaking {
      0% {
        transform: translateX(0);
      }
      25% {
        transform: translateY(-2px);
      }
      35% {
        transform: translateY(-2px) rotate(10deg);
      }
      55% {
        transform: translateY(-2px) rotate(-10deg);
      }
      65% {
        transform: translateY(-2px) rotate(5deg);
      }
      75% {
        transform: translateY(-2px) rotate(-5deg);
      }
      100% {
        transform: translateY(0) rotate(0);
      }
    }

    animation: jump-shaking 0.83s infinite;
  }

  @media screen and (max-width: 786px) {
    width: 100%;
  }
`;

const [winners, setWinners] = useState({
  near: [],
  lol: [],
});
const [winnerType, setWinnerType] = useState("near");

const fetchWinners = async () => {
  Near.asyncView(contractName, "get_leaderboards").then(
    ([nearWinners, lolWinners]) =>
      setWinners({
        near: nearWinners,
        lol: lolWinners,
      }),
  );
};

fetchWinners();

const Winner = ({ winner, index, token }) => (
  <WinnerCard>
    {index === 0 && <div className="trophy">🏆</div>}
    <Widget
      src="mob.near/widget/Profile.ShortInlineBlock"
      props={{
        accountId: winner.account_id,
        tooltip: true,
      }}
    />
    <div className="d-flex justify-content-center align-items-center gap-4">
      <div>
        <Token near={token === "near"} size={22}>
          <h4>{format(winner.amount, 24)}</h4>
        </Token>
      </div>
    </div>
  </WinnerCard>
);

return (
  <>
    <div
      className="d-flex gap-3 mt-4 align-items-center"
      onClick={() => setWinnerType(winnerType === "near" ? "lol" : "near")}
    >
      <div>
        <b>NEAR</b>
      </div>
      <Widget src={`memelol.near/widget/lol.Components.Switch`} />
      <div>
        <b>LOL</b>
      </div>
    </div>
    <div className="winners-list d-flex flex-wrap justify-content-center gap-4 ">
      {winners[winnerType].length ? (
        winners[winnerType].map((winner, index) => (
          <Winner winner={winner} index={index} token={winnerType} />
        ))
      ) : (
        <></>
      )}
    </div>
  </>
);
