const initialHealth = 888;
const accountId = props.accountId ?? context.accountId ?? "hack.near";
const gameId = props.gameId ?? "evisceration";
const appId = props.appId ?? "lumina";
const clicks = Social.index(appId, `${accountId}-${gameId}`, {
  limit: 888,
  order: "desc",
});

if (!clicks) {
  return "";
}

const totalHits = clicks ? Object.keys(clicks).length : 0;

const attack = () => {
  Social.set({
    index: {
      [appId]: JSON.stringify({
        key: `${accountId}-${gameId}`,
        value: { type: "click" },
      }),
    },
  });
};

const health = initialHealth - totalHits;
const eviscerated = health === 0;

return (
  <div>
    {!eviscerated ? (
      <>
        <div className="d-flex flex-row gap-3">
          <p>
            {health} health remaining ({clicks && Object.keys(clicks).length}{" "}
            hit{Object.keys(clicks) > 1 && s})
          </p>
        </div>
        <button
          style={{ width: "222px" }}
          onClick={attack}
          className="btn btn-danger"
        >
          attack
        </button>
      </>
    ) : (
      <p>The monster is dead!</p>
    )}
  </div>
);
