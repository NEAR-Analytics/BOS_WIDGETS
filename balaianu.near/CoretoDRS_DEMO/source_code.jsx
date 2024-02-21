const { getAccountScores } = VM.require(
  "balaianu.near/widget/CoretoDRS_RSS_getAccountScores"
);

const accountId = props.accountId ?? context.accountId;

const [hasErrors, setHasErrors] = useState(false);
const [trust, setTrust] = useState(0);
const [performance, setPerformance] = useState(0);
const [account, setAccount] = useState(accountId);
const [sources, setSources] = useState("");
const [error, setError] = useState("");

let accountScores = getAccountScores(account);

useEffect(() => {
  if (accountScores.errors === null) {
    setHasErrors(false);
    setError("");
    setTrust(accountScores.data.scores.trust.toFixed(2));
    setPerformance(accountScores.data.scores.performance.toFixed(2));
    setSources(
      accountScores.data.sources.map((item, index) => {
        return (
          <div class="col-lg-4 mx-auto">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">{item.name}</h5>
                <p class="card-text">{item.description}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  Trust:{" "}
                  <span class="float-end">{item.scores.trust.toFixed(2)}%</span>
                </li>
                <li class="list-group-item">
                  Performance:{" "}
                  <span class="float-end">
                    {item.scores.performance.toFixed(2)}%
                  </span>
                </li>
              </ul>
              <div class="card-body">
                <a target="_blank" href={item.website} class="card-link">
                  Website
                </a>
              </div>
            </div>
          </div>
        );
      })
    );
  } else {
    setHasErrors(true);
    setError(
      accountScores.errors[0].code + " - " + accountScores.errors[0].message
    );
    setTrust(0);
    setPerformance(0);
    setSources("");
  }
}, [accountScores]);

return (
  <div class="container col-xl-10 col-xxl-8 px-4 py-5">
    <div class="row">
      <div class="px-4 py-5 text-center">
        <h1 class="display-5 fw-bold">Reputation scores for</h1>
        <div class="col-lg-6 mx-auto">
          <input
            class="text-center"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <p class="lead mb-4 text-center" hidden={hasErrors}>
          Reputation scores are based on the results of user activity measured
          in the available source platforms.
        </p>
        <p class="lead mb-4 text-center" hidden={!hasErrors}>
          {error}
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center"></div>
      </div>
    </div>

    <div hidden={hasErrors} class="row">
      <div class="px-4 py-3 text-center">
        <h3>General Reputation</h3>
      </div>
      <div class="col-lg-3 mx-auto">
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              Trust: <span class="float-end">{trust}%</span>
            </li>
            <li class="list-group-item">
              Performance: <span class="float-end">{performance}%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div hidden={hasErrors} class="row mt-5">
      <div class="px-4 py-3 text-center">
        <h3>Reputation by Source</h3>
      </div>

      {sources}
    </div>

    <div class="footer py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3"></ul>
      <p class="text-center text-muted">
        Powered by{" "}
        <a target="_blank" href="https://www.coreto.io/drs">
          Coreto DRS
        </a>
      </p>
    </div>
  </div>
);
