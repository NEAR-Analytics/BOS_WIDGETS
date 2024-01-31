const accountId = props.tgId ?? context.accountId ?? "name.tg";
const contactId = "game.hot.tg";

let assets = Near.view(contactId, "get_assets");

useEffect(() => {
  if (state.accountId && state.accountId != "name.tg") {
    let data = Near.view(contactId, "get_user", {
      account_id: state.accountId,
    });

    State.update({ data });
  }
}, [state.accountId]);

if (state === undefined) {
  State.init({ accountId, assets, nonce: 0 });

  setInterval(() => {
    State.update((state) => ({
      ...state,
      nonce: state.pause ? state.nonce : state.nonce + 1,
    }));
  }, 1000);
}

const inputNearAccount = (
  <div class="mb-3">
    Input NEAR Telegram account (name.tg)
    <input
      type="text"
      value={state.accountId}
      onFocus={() => State.update({ pause: true })}
      onBlur={() => State.update({ pause: false })}
      onChange={(e) => State.update({ accountId: e.target.value })}
    />
  </div>
);

if (!state.data || !state.assets) {
  return (
    <div>
      {inputNearAccount}
      <div class="alert alert-dark" role="alert">
        Data for {state.accountId} was not found. Join{" "}
        <a
          href="https://t.me/herewalletbot/app?startapp=152591"
          target="_blank"
        >
          NEAR Telegram wallet
        </a>{" "}
        to mine $HOT.
      </div>
    </div>
  );
}
const lastClaim = state.data.last_claim;

console.log("lastClaim", lastClaim);

const lastClaimDate = new Date(lastClaim / 10000);

const storageAsset = state.assets.filter(
  (asset) => asset.id == state.data.storage
)?.[0];

const nextClaimDate = new Date((lastClaim + storageAsset.value) / 1000000);

console.log("storageAsset", storageAsset);

const toHHMMSS = (value) => {
  var sec_num = parseInt(value / 1000, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

useEffect(() => {
  if (Number(nextClaimDate) > 0) {
    let claimBlock = (
      <div>
        Next claim date: {nextClaimDate.toLocaleTimeString()}{" "}
        {nextClaimDate.toLocaleDateString()}
        {nextClaimDate < new Date() ? (
          <div class="alert alert-warning" role="alert">
            <div>Time to claim!</div>
            <button onClick={() => Near.call(contactId, "claim")}>
              Claim $HOT
            </button>
          </div>
        ) : (
          <div class="alert alert-success" role="alert">
            Claim in {toHHMMSS(nextClaimDate - new Date())}
          </div>
        )}
      </div>
    );
    State.update({ claimBlock });
  }
}, [state.nonce]);

return (
  <div>
    {inputNearAccount}
    {state.claimBlock ?? <div>Loading</div>}
    <div>
      Storage asset power: {storageAsset.value / 1000000000 / 60} minutes{" "}
    </div>
  </div>
);
