State.init({
  loading: true,
});

const CONTRACT = "w0rdle.near";
const API = "https://nearwordle.com/api";

const headers = {
  "Content-Type": "application/json",
  "X-Account-ID": context.accountId,
  "X-Auth-Key": props.key,
};

const loadProfile = () => {
  asyncFetch(`${API}/profile/info`, {
    method: "GET",
    headers,
  }).then((resProfile) => {
    if (!resProfile.ok) return props.handleToast("error", "Error", "");
    if (resProfile.body.error)
      return props.handleToast(
        "error",
        "Fail to load the pr",
        res.body.message
      );

    Near.asyncView(CONTRACT, "get_score", {
      accountId: context.accountId,
    }).then((score) => {
      State.update({
        profile: { ...resProfile.body.profile, score },
        loading: false,
      });
    });
  });
};

const ProgressBar = ({ proportion }) => {
  const width = (proportion * 100).toFixed(2) + "%";

  return (
    <div
      className="progress"
      style={{ height: "1rem", backgroundColor: "transparent" }}
    >
      <div
        className="progress-bar rounded"
        style={{
          width: width,
          background: "linear-gradient(to right, #0E9045, #17B52D)",
        }}
      ></div>
    </div>
  );
};

const Attempts = ({ number, proportion, wins }) => {
  return (
    <div class="d-flex justify-content-center align-items-center text-white py-1">
      <div class="col-1 text-center">{number}</div>
      <div class="col-8">
        <ProgressBar proportion={proportion} />
      </div>
      <div
        class="col-3 text-center rounded ms-2"
        style={{
          backgroundColor: "#053036",
        }}
      >
        {wins}
      </div>
    </div>
  );
};

const InfoItem = ({ title, value }) => (
  <div class="col-3 text-center text-white">
    <div class="fs-4 fw-bold">{value}</div>
    <div style={{ fontSize: "12px" }}>{title}</div>
  </div>
);

useEffect(() => {
  loadProfile();
}, []);

if (state.loading)
  return <p class="text-center text-white py-4">Loading ...</p>;

if (!state.loading) {
  const wins = state.profile.guessDistribution.reduce(
    (acc, val) => acc + val,
    0
  );
  const played = wins + state.profile.lost;
  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 col-xl-6">
          <div
            class="rounded p-3"
            style={{ backgroundColor: "rgba(5, 48, 54, 0.5)" }}
          >
            <h4 class="text-white text-center">GUESS DISTRIBUTION</h4>
            <div class="mt-1">
              {state.profile.guessDistribution.map((g, i) => (
                <Attempts number={i + 1} proportion={g / wins} wins={g} />
              ))}
            </div>

            <h4 class="text-white text-center mt-2">STATISTICS</h4>
            <div
              class="row rounded mx-0 py-1"
              style={{ backgroundColor: "#053036" }}
            >
              <InfoItem title="Played" value={played} />
              <InfoItem
                title="Win %"
                value={wins > 0 ? (wins / played).toFixed(2) * 100 : 0}
              />
              <InfoItem
                title="Current Streak"
                value={state.profile.currentStreak}
              />
              <InfoItem title="Max Streak" value={state.profile.maxStreak} />
            </div>
            <div class="row align-items-center text-white mt-2 px-4">
              <div class="col-10 text-left">{context.accountId}</div>
              <div class="col-2 text-end fw-bold fs-4">
                {state.profile.score || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
