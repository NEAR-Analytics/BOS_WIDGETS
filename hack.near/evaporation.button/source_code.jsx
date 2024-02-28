const initialSunsetTimestamp = 1709159888 * 1000;
const accountId = props.accountId ?? context.accountId ?? "hack.near";
const gameId = props.gameId ?? "evaporation";
const appId = props.appId ?? "test";
const clicks = Social.index(appId, `${accountId}-${gameId}`, {
  limit: 100,
  order: "desc",
});

const [sunset, setSunset] = useState(new Date(initialSunsetTimestamp));

const addMoreTime = () => {
  Social.set(
    {
      index: {
        [appId]: JSON.stringify({
          key: `${accountId}-${gameId}`,
          value: { type: "click" },
        }),
      },
    },
    {
      force: true,
    }
  );
};

const now = new Date();
const evaporated = now > sunset;
const remainingTime = sunset.getTime() - now.getTime();
const remainingMinutes = Math.max(Math.floor(remainingTime / (1000 * 60)), 0);

return (
  <div>
    {!evaporated ? (
      <>
        <p>{remainingMinutes} minutes left...</p>
        <button onClick={addMoreTime} className="btn btn-primary">
          add time
        </button>
      </>
    ) : (
      <p>The sun has set... 🌇</p>
    )}
    <div className="mt-3">
      <p>{clicks && Object.keys(clicks).length} clicks</p>
    </div>
  </div>
);
