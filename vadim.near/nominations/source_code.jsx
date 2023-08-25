State.init({ candidate: props.accountId ?? "vadim.near" });
const houses = ["HouseOfMerit", "CouncilOfAdvisors", "TransparencyCommission"];
const selectedHouse = "";
houses.map((house) => {
  if (state[house] == undefined) {
    const nominations = Near.view("nominations.ndc-gwg.near", "nominations", {
      house,
    });

    if (nominations) {
      State.update({
        [house]: Object.values(
          nominations.sort((a, b) => {
            if (a[1] < b[1]) return 1;
            if (a[1] > b[1]) return -1;
            return 0;
          })
        ).map((item) => item[0]),
      });
    }
  } else {
    if (state[house].includes(state.candidate)) {
      selectedHouse = house;
    }
  }
});

const data = fetch(
  "https://raw.githubusercontent.com/zavodil/near-nft-owners-list/main/output_votes_all.txt"
);

if (data.ok) {
  let candidates = {};
  Object.values(
    data.body
      .split("\n")
      .map((line) => line.split("|"))
      .filter((data) => data.length === 3)
      .sort((a, b) => {
        if (Date.parse(a[2]) < Date.parse(b[2])) return 1;
        if (Date.parse(a[2]) > Date.parse(b[2])) return -1;
        return 0;
      })
  ).map((item) => {
    if (candidates[item[1]] == undefined) {
      candidates[item[1]] = [];
    }
    candidates[item[1]].push({ [item[0]]: item[2] });
  });

  State.update({ candidates });
} else return "Loading";

const votes = (state?.candidates[state.candidate] ?? []).map((record) =>
  Object.entries(record).map((item) => (
    <div class="row align-items-start">
      <div
        class="col col-md-8 overflow-hidden ps-0 pb-1"
        style={{ minWidth: "100px" }}
      >
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId: item[0], tooltip: false }}
        />
      </div>
      <div
        class="col col-md-4"
        style={{ whiteSpace: "nowrap", minWidth: "35px" }}
      >
        <small>{item[1].substr(5, 11).replace("-", "/")}</small>
      </div>
    </div>
  ))
);

const getCandidates = (house) => {
  return (state[house] ?? []).map((candidate) => (
    <div class="row align-items-start">
      <div
        class="col ps-0 overflow-hidden"
        style={{
          backgroundColor:
            candidate !== state.candidate ? "white" : "lightblue",
        }}
      >
        <a
          onClick={() => {
            State.update({ candidate });
            return false;
          }}
          style={{ cursor: "pointer" }}
        >
          <Widget
            src="mob.near/widget/N.ProfileLine"
            props={{
              accountId: candidate,
              link: false,
              hideAccountId: true,
              hideImage: false,
            }}
          />
        </a>
      </div>
    </div>
  ));
};

const link = `https://near.social/vadim.near/widget/nominations?accountId=${state.candidate}`;

return (
  <>
    <h1 class="text-center">All upvotes for NDC Nominations</h1>
    <div class="container">
      <div class="row">
        {houses.map((house) => (
          <div class="col col-3 align-self-start">
            <strong>{house.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}</strong>
            <div class="container">{getCandidates(house)}</div>
          </div>
        ))}

        <div class="col col-3 align-self-start">
          <strong>
            Votes for {state.candidate}:{" "}
            {state.candidates[state.candidate].length}
          </strong>
          <div class="pb-2">
            <a
              href={`/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=${selectedHouse}&accountId=${state.candidate}`}
              class="btn btn-primary mt-2"
              target="_blank"
            >
              Upvote!
            </a>
          </div>
          <div class="container">{votes}</div>
        </div>
      </div>
    </div>

    {state.candidate && (
      <div class="sp-3">
        <span>Link to this page for selected candidate:</span>
        <a href={link}>{link}</a>
      </div>
    )}

    <hr />
    <p>
      <small>
        Data is retrieved automatically from the
        <a
          href="https://github.com/zavodil/near-nft-owners-list/blob/main/.github/workflows/indexed.yml"
          target="_blank"
        >
          NEAR Public indexer
        </a>{" "}
        with a slight delay.
      </small>
    </p>
  </>
);
