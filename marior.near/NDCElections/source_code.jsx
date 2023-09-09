const nominationsContractId = "nominations.ndc-gwg.near";
const electionsContractId = "elections.ndc-gwg.near";
const cardWidget = "marior.near/widget/NDCElectionsCard";
const loadingWidget = "chess-game.near/widget/ChessGameLoading";
const waitTime = 25;
const waitTimeOnErr = 500;

const snapshot = false;

const fetchOptions = {
  headers: {
    "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
  },
};

let nominees = [...(state?.nominees ?? [])];
if (!state.nominees) {
  let offset = 0;
  while (true) {
    const res = fetch(
      `https://api.pikespeak.ai/nominations/candidates?contract=${nominationsContractId}&offset=${offset}`,
      fetchOptions
    );
    offset += 50;
    if (!res.ok) {
      return `Pikespeak API returned error: ${JSON.stringify(res)}`;
    }
    console.log("res", res.body);

    if (res.body.length === 0) break;
    if (snapshot) {
      nominees = nominees.concat(res.body.slice(0, 10));
      break;
    } else {
      nominees = nominees.concat(res.body);
      if (res.body.length < 50) break;
    }
  }
}

let hom = [...(state?.hom ?? [])];
let coa = [...(state?.coa ?? [])];
let tc = [...(state?.tc ?? [])];
State.init({
  nominees: [...nominees],
  hom: [...hom],
  coa: [...coa],
  tc: [...tc],
  selectedCandidate: null,
  errCount: state?.errCount ?? 0,
});

if (nominees.length > 0) {
  const nominee = nominees.pop();

  asyncFetch(
    `https://api.pikespeak.ai/election/votes-by-candidate?contract=${electionsContractId}&candidate=${nominee.nominee}`,
    fetchOptions
  ).then(({ ok, body }) => {
    if (!ok) {
      setTimeout(() => {
        State.update({
          errCount: state.errCount + 1,
        });
      }, waitTimeOnErr);
      return;
    }
    console.log("body", nominee.nominee, body);
    if (Array.isArray(body) && body.length > 0) {
      nominee.voters = body.map(({ voter }) => voter);
    } else {
      nominee.voters = [];
    }

    asyncFetch(
      `https://api.nearblocks.io/v1/account/${nominee.nominee}/inventory`
    ).then(({ ok, body }) => {
      if (!ok) {
        setTimeout(() => {
          State.update({
            errCount: state.errCount + 1,
          });
        }, waitTimeOnErr);
        return;
      }
      nominee.inventory = body.inventory;

      if (nominee.house === "HouseOfMerit") {
        hom.push(nominee);
        hom.sort((a, b) => b.voters.length - a.voters.length);
      } else if (nominee.house === "CouncilOfAdvisors") {
        coa.push(nominee);
        coa.sort((a, b) => b.voters.length - a.voters.length);
      } else if (nominee.house === "TransparencyCommission") {
        tc.push(nominee);
        tc.sort((a, b) => b.voters.length - a.voters.length);
      }

      setTimeout(() => {
        State.update({
          nominees,
          hom: [...hom],
          coa: [...coa],
          tc: [...tc],
        });
      }, waitTime);
    });
  });

  return (
    <Widget
      src={loadingWidget}
      props={{
        content: (
          <div>
            Loading data via Pikespeak & Nearblocks API. Remaining:{" "}
            {nominees.length}
          </div>
        ),
      }}
    />
  );
}

console.log("state", state);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
  max-width: 50rem;
  margin: 0 auto 2rem;

  &::before {    
    content: "";
    background-image: url("https://arweave.net/qOfmpZZNqQ0bHBJ4UTgPC_pjvs1oYOjTAVwfxD8fd2o");
    background-attachment: fixed;
    background-size: contain;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.6;
    z-index: -1;
  }
`;

const Header = styled.h1`
  margin-bottom: 1rem;
  text-align: center;
  padding: 3rem;
  font-weight: 600;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: stretch;
`;

const House = styled.h2`
  font-weight: 600;
  margin: 3rem 1rem 0;
`;

const selectCandidate = (candidateId) => {
  if (candidateId === state.selectedCandidate) return;
  State.update({
    selectedCandidate: candidateId,
  });
};

const renderCandidates = (title, candidates, threshold) => (
  <>
    <House>{title}</House>
    {candidates.map((candidate, index) => {
      const selected = candidate.nominee === state.selectedCandidate;
      const isWinning = index < threshold;
      return (
        <Widget
          src={cardWidget}
          props={{
            candidate,
            selected,
            isWinning,
            selectCandidate,
          }}
        />
      );
    })}
  </>
);

return (
  <Wrapper>
    <Header>NDC Elections Stats</Header>
    <Content>{renderCandidates("House Of Merit", hom, 15)}</Content>
    <Content>{renderCandidates("Council Of Advisors", coa, 7)}</Content>
    <Content>{renderCandidates("Transparency Commission", tc, 7)}</Content>
  </Wrapper>
);
