const initialSunsetTimestamp = 1709149888 * 1000;
const accountId = props.accountId ?? context.accountId ?? "hack.near";
const gameId = props.gameId ?? "evaporation";

const [sunset, setSunset] = useState(new Date(initialSunsetTimestamp));

const addMoreTime = () => {
  const newSunsetTime = new Date(sunset.getTime() + 5 * 60000);
  Social.index(`thomagotchi`, `${accountId}-${gameId}`);
  setSunset(newSunsetTime);
};

Social.index();

const now = new Date();
const evaporated = now > sunset;
const remainingTime = sunset.getTime() - now.getTime();
const remainingMinutes = Math.max(Math.floor(remainingTime / (1000 * 60)), 0);

return (
  <div>
    {!evaporated ? (
      <>
        <p>Time until sunset: {remainingMinutes} minutes</p>
        <button onClick={addMoreTime} className="btn btn-primary">
          Add 5 Minutes
        </button>
      </>
    ) : (
      <p>The sun has set... 🌇</p>
    )}
  </div>
);
