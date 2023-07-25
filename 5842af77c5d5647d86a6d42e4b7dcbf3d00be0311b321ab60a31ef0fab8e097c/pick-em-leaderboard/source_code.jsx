const matches = Near.view("pickem.near", "getMatches");
const picks = Near.view("pickem.near", "getAllPicks");

const users = {
  "kingcash88.near": 50,
};
picks.forEach((pick) => {
  const match = matches
    .filter((m) => m.status === 1)
    .find((match) => match.index === pick.index);
  if (match) {
    const winner = match.score1 > match.score2 ? 1 : 2;
    if (pick.team === winner) {
      if (users[pick.predictor]) {
        users[pick.predictor] += 10;
      } else {
        users[pick.predictor] = 10;
      }
    }
  }
});
const leaderboard = Object.keys(users)
  .map((user) => {
    return { name: user, points: users[user] };
  })
  .sort((a, b) => b.points - a.points);

return (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <h1 style={{ fontWeight: 800, opacity: 1 }}>BIG3 Pick 'Em Leaderboard</h1>
    <p style={{ fontWeight: 400, opacity: 0.5 }}>
      Top 30 accounts shown. If you don't see your username, make better picks
      this week.
    </p>
    {leaderboard.length > 0 &&
      leaderboard.slice(0, 30).map((user, i) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid #ADADAD",
            borderRadius: "8px",
            padding: "16px",
            alignContent: "center",
            backgroundColor: i < 10 ? "#00A160" : "#ffffff",
            color: i < 10 ? "#ffffff" : "#000000",
          }}
        >
          <div
            style={{
              display: "flex",
              alignContent: "center",
              gap: 16,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 24, opacity: 0.5 }}>
              {i + 1}
            </div>
            <div style={{ fontWeight: 800, fontSize: 24, opacity: 1 }}>
              {user.name}
            </div>
          </div>
          <div style={{ fontWeight: 400, fontSize: 24, opacity: 0.5 }}>
            {user.points}
          </div>
        </div>
      ))}
  </div>
);
