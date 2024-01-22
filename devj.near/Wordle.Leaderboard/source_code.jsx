const CONTRACT = "w0rdle.near";

State.init({
  loading: true,
  leaderboard: [],
});

const Styles = styled.div`
.row-background {
    &:nth-child(odd) {
        background-color: rgba(5, 48, 54, 0.3);
    }
    &:nth-child(even) {
        background-color: rgba(14, 144, 69, 0.3);
    }
}  
`;

const loadLeaderboard = () => {
  Near.asyncView(CONTRACT, "get_leaderboard").then((res) => {
    const leaderboard = res.sort((a, b) => b[1] - a[1]);
    State.update({ loading: false, leaderboard });
  });
};

const LeaderboardRow = ({ name, score, index }) => (
  <div
    className={`row align-items-center row-background bg-opacity-50 text-white px-4 py-4 mx-0`}
  >
    <div className="col-10 text-left">{name}</div>
    <div className="col-2 text-end fw-bold fs-4">{score}</div>
  </div>
);

useEffect(() => {
  loadLeaderboard();
}, []);

return (
  <Styles>
    <div class="mt-4">
      <h1 class="text-white text-center">LEADERBOARD</h1>
      {state.leaderboard.map((item, index) => (
        <LeaderboardRow
          key={index}
          name={item[0]}
          score={item[1]}
          index={index}
        />
      ))}
    </div>
  </Styles>
);
