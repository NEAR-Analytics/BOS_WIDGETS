const nominationsContractId = "nominations.ndc-gwg.near";
const electionsContractId = "elections.ndc-gwg.near";
const cardWidget = "marior.near/widget/NDCElectionsCard";
const loadingWidget = "chess-game.near/widget/ChessGameLoading";
const githubIcon = "chess-game.near/widget/GithubIcon";

State.init({
  selected: state.selected ?? "hom",
  selectedCandidate: null,
});

const candidates = fetch(
  "https://ndc-elections-api.shrm.workers.dev/candidates"
).body;
const ftMetas = fetch(
  "https://ndc-elections-api.shrm.workers.dev/ftmetas"
).body;
const nftMetas = fetch(
  "https://ndc-elections-api.shrm.workers.dev/nftmetas"
).body;

if (!candidates || !ftMetas || !nftMetas) {
  return (
    <Widget
      src={loadingWidget}
      props={{
        content: <div>Loading data via Pikespeak, Nearblocks & Pagoda API</div>,
      }}
    />
  );
}

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

const Disclaimer = styled.div`
  font-style: italic;
  font-size: 1.1rem;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    font-weight: 600;
    font-style: normal;
    text-decoration: none;
    color: unset;
    border-radius: 0.5rem;
    border: 1px solid black;
    padding: 0.3rem;
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

const selectHouse = (event) => {
  State.update({
    selected: event.target.value,
    selectedCandidate: null,
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
            ftMetas,
            nftMetas,
          }}
        />
      );
    })}
  </>
);

return (
  <Wrapper>
    <Header>NDC Elections Stats</Header>
    <Disclaimer>
      <span>
        Data is aggregated via Pikespeak, Nearblocks & Pagoda API and might be
        outdated or not yet properly initialized.
      </span>
      <a href="https://github.com/Protocol-Pawns" target="_blank">
        <Widget src={githubIcon} props={{ height: "2rem" }} />
        <span>Github</span>
      </a>
    </Disclaimer>
    <select onChange={selectHouse}>
      <option value="hom" selected={state.selected === "hom"}>
        House Of Merit
      </option>
      <option value="coa" selected={state.selected === "coa"}>
        Council Of Advisors
      </option>
      <option value="tc" selected={state.selected === "tc"}>
        Transparency Commission
      </option>
    </select>
    {state.selected === "hom" && (
      <Content>
        {renderCandidates(
          "House Of Merit",
          candidates
            .filter(({ house }) => house === "HouseOfMerit")
            .sort((a, b) => (b.voters?.length ?? 0) - (a.voters?.length ?? 0)),
          15
        )}
      </Content>
    )}
    {state.selected === "coa" && (
      <Content>
        {renderCandidates(
          "Council Of Advisors",
          candidates
            .filter(({ house }) => house === "CouncilOfAdvisors")
            .sort((a, b) => (b.voters?.length ?? 0) - (a.voters?.length ?? 0)),
          7
        )}
      </Content>
    )}
    {state.selected === "tc" && (
      <Content>
        {renderCandidates(
          "Transparency Commission",
          candidates
            .filter(({ house }) => house === "TransparencyCommission")
            .sort((a, b) => (b.voters?.length ?? 0) - (a.voters?.length ?? 0)),
          7
        )}
      </Content>
    )}
  </Wrapper>
);
