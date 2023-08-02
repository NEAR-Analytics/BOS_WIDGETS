const team_data = [
  {
    short_name: "3HM",
    id: 3084,
    name: "3 Headed Monsters",
    image:
      "https://fhfaxdtipfmoxqxoxtec.supabase.co/storage/v1/object/public/images/3hmonsters-1.svg",
  },
  {
    short_name: "3CO",
    id: 2915,
    name: "3's Company",
    image:
      "https://fhfaxdtipfmoxqxoxtec.supabase.co/storage/v1/object/public/images/3scompany-1.svg",
  },
  {
    short_name: "ALI",
    id: 2916,
    name: "Aliens",
    image:
      "https://fhfaxdtipfmoxqxoxtec.supabase.co/storage/v1/object/public/images/Aliens.svg",
  },
  {
    short_name: "BH",
    id: 2917,
    name: "Ball Hogs",
    image:
      "https://fhfaxdtipfmoxqxoxtec.supabase.co/storage/v1/object/public/images/ballhogs-1.svg",
  },
  {
    short_name: "BIV",
    id: 2918,
    name: "Bivouac",
    image:
      "https://fhfaxdtipfmoxqxoxtec.supabase.co/storage/v1/object/public/images/Bivouac300x300.svg",
  },
  {
    short_name: "ENM",
    id: 2919,
    name: "Enemies",
    image:
      "https://fhfaxdtipfmoxqxoxtec.supabase.co/storage/v1/object/public/images/enemies.svg",
  },
  {
    short_name: "GB",
    id: 2920,
    name: "Ghost Ballers",
    image:
      "https://fhfaxdtipfmoxqxoxtec.supabase.co/storage/v1/object/public/images/ghostballers-1.svg",
  },
  {
    short_name: "K3",
    id: 2921,
    name: "Killer 3's",
    image:
      "https://fhfaxdtipfmoxqxoxtec.supabase.co/storage/v1/object/public/images/killer3s-1.svg",
  },
  {
    short_name: "POW",
    id: 2922,
    name: "Power",
    image:
      "https://fhfaxdtipfmoxqxoxtec.supabase.co/storage/v1/object/public/images/power-1.svg",
  },
  {
    short_name: "TS",
    id: 2923,
    name: "Tri-State",
    image:
      "https://fhfaxdtipfmoxqxoxtec.supabase.co/storage/v1/object/public/images/tristate-1.svg",
  },
  {
    short_name: "TRI",
    id: 2924,
    name: "Trilogy",
    image:
      "https://fhfaxdtipfmoxqxoxtec.supabase.co/storage/v1/object/public/images/trilogy-1-1.svg",
  },
  {
    short_name: "TRP",
    id: 2925,
    name: "Triplets",
    image:
      "https://fhfaxdtipfmoxqxoxtec.supabase.co/storage/v1/object/public/images/Triplets-2.svg",
  },
];

State.init({
  selections: [],
  picksMade: false,
});

const matches = Near.view("pickem.near", "getMatches").filter(
  (m) => new Date() < new Date(m.time)
);
const predictions = Near.view("pickem.near", "getAllPicks");

const onTeamSelect = (team, matchIndex) => {
  let _selections = state.selections.filter((t) => t.index !== matchIndex);
  _selections.push({
    selection: team,
    index: matchIndex,
  });
  State.update({ selections: _selections });
};

const onSubmit = () => {
  Near.call("pickem.near", "bulkPick", state.selections);
  State.update({ picksMade: true });
};

const button = (name, image, first, selected, onClick) => (
  <button
    onClick={onClick}
    disabled={!context.accountId}
    style={{
      display: "flex",
      padding: "0.25rem",
      backgroundColor: selected ? "#00A160" : "#ffffff",
      flexDirection: "column",
      justifyContent: first ? "end" : "start",
      alignItems: "center",
      width: "100%",
      borderRadius: "0.5rem",
      borderWidth: "2px",
      borderColor: "#00A160",
      gap: "1rem",
      color: selected ? "#ffffff" : "#000000",
      fontSize: "1rem",
      fontWeight: 600,
      opacity: onClick ? "100%" : "50%",
    }}
  >
    <img src={image} width={100} height={100} alt="" />
    <div className="">{name}</div>
  </button>
);

const matchup = (index, team1, team2, isActive) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      gap: "1rem",
    }}
  >
    {button(
      team1.name,
      team1.image,
      true,
      state.selections.some((s) => s.index === index && s.selection === 1) ||
        predictions.some(
          (p) =>
            p.predictor === context.accountId &&
            p.index === index &&
            p.team === 1
        ),
      isActive ? () => onTeamSelect(1, index) : false
    )}
    <div className="flex items-center justify-center text-xl font-bold">vs</div>
    {button(
      team2.name,
      team2.image,
      false,
      state.selections.some((s) => s.index === index && s.selection === 2) ||
        predictions.some(
          (p) =>
            p.predictor === context.accountId &&
            p.index === index &&
            p.team === 2
        ),
      isActive ? () => onTeamSelect(2, index) : false
    )}
  </div>
);

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      gap: "1rem",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <h1
        style={{
          fontSize: "1.875rem",
          lineHeight: "2.25rem",
          fontWeight: "800",
          letterSpacing: "-0.05em",
          lineHeight: "1.25",
          lineHeight: "2.5rem",
        }}
      >
        BIG3 Week 7 Charlotte Pick 'Em
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
        }}
      >
        {context.accountId ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.5rem",
            }}
          >
            Signed in as {context.accountId.slice(0, 12)}...
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              color: "#000000",
              fontWeight: "700",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.5rem",
            }}
          >
            Connect your NEAR wallet to make your picks
          </div>
        )}
      </p>
      {state.picksMade ? (
        <p
          style={{
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            padding: "1rem",
            color: "white",
            fontWeight: 800,
            backgroundColor: "#00A160",
            borderRadius: "0.25rem",
          }}
        >
          Your picks have been successfully submitted!
        </p>
      ) : (
        <></>
      )}
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8rem",
        alignItems: "start",
        width: "100%",
        maxWidth: "1000px",
      }}
    >
      {matches.length > 0 &&
      matches.filter(
        (m) =>
          !context.accountId ||
          !predictions.some(
            (p) => p.index === m.index && p.predictor === context.accountId
          )
      ).length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            width: "100%",
            alignItems: "start",
          }}
        >
          <h2>Upcoming Games</h2>
          {matches
            .filter(
              (m) =>
                !context.accountId ||
                !predictions.some(
                  (p) =>
                    p.index === m.index && p.predictor === context.accountId
                )
            )
            .map((m) => {
              return matchup(
                m.index,
                {
                  ...team_data.find((t) => t.id === m.team1),
                },
                {
                  ...team_data.find((t) => t.id === m.team2),
                },
                true
              );
            })}
          <button
            style={{
              borderColor: "#00A160",
              backgroundColor: "#00A160",
            }}
            onClick={onSubmit}
          >
            Submit Picks
          </button>
        </div>
      ) : (
        <></>
      )}
      {matches.length > 0 &&
      matches.filter((m) =>
        predictions.some(
          (p) => p.index === m.index && p.predictor === context.accountId
        )
      ).length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            width: "100%",
            alignItems: "start",
          }}
        >
          <h2>Your Picks</h2>
          {matches
            .filter((m) =>
              predictions.some(
                (p) => p.index === m.index && p.predictor === context.accountId
              )
            )
            .map((m) => {
              return matchup(
                m.index,
                {
                  ...team_data.find((t) => t.id === m.team1),
                },
                {
                  ...team_data.find((t) => t.id === m.team2),
                },
                false
              );
            })}
        </div>
      ) : (
        <></>
      )}
    </div>
  </div>
);
