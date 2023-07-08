const matches = Near.view("neetion.near", "getMatches");
return (
  <div className="card col-6">
    {matches.map((match) => (
      <div className="col-12" key={match.index}>
        <p>Match Index: {match.index}</p>
        <p>Team 1: {match.team1}</p>
        <p>Team 2: {match.team2}</p>

        <div className="border-top border-1 border-secondary my-4"></div>
      </div>
    ))}
  </div>
);
