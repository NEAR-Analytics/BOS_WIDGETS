const nominationsContractId = "nominations.ndc-gwg.near";
const electionsContractId = "elections.ndc-gwg.near";
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

let candidates = [...(state?.candidates ?? [])];
State.init({
  nominees: [...nominees],
  candidates: [...candidates],
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

      candidates.push(nominee);

      setTimeout(() => {
        State.update({
          nominees,
          candidates: [...candidates],
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-size: 1.1rem;
  border-radius: 1rem;
  background-color: ${({ selected, isWinning }) =>
    selected
      ? isWinning
        ? "lightblue !important"
        : "#faa !important"
      : isWinning
      ? "lightgrey"
      : "#fcc"}};
  cursor: ${({ selected }) => (selected ? "unset;" : "pointer;")};

  &:hover {
    background-color: #d3ecf4;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;

  img {
    border-radius: 0.3rem;
    width: 4rem;
    height: 4rem;
    margin: 0.6rem;
  }

  h3 {
    flex: 1 1 auto;
  }

  svg {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    margin-right: 1rem;

    &:hover {
      color: blue;
    }
  }

  &:last-child {
    flex: 1 1 auto;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 0.6rem;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 0.4rem;

  h3 {
    width: 100%;
    font-size: 1.4rem;
    font-weight: 600;
    text-align: center;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0.4rem 2rem;
  gap: 0.4rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px dashed darkgrey;
  }

  > *:not(img) {
    flex: 1 1 12rem;
    padding: 0.2rem 0.4rem;
  }

  img {
    width: 2rem;
    height: 2rem;
  }

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }

  .balance {
    text-align: right;
  }

  .symbol {
    min-width: 5rem;
    max-width: 5rem;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const selectCandidate = (candidateId) => {
  if (candidateId === state.selectedCandidate) return;
  State.update({
    selectedCandidate: candidateId,
  });
};

const renderVoters = (voters) => (
  <List>
    {voters.map((voter) => (
      <Row key={voter}>
        <img
          src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${voter}`}
          alt={voter}
        />
        <div>
          <a
            href={`mob.near/widget/ProfilePage?accountId=${voter}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {voter}{" "}
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
              ></path>
            </svg>
          </a>
        </div>
      </Row>
    ))}
  </List>
);

const renderFts = (fts) => (
  <List>
    {fts.map((ft) => (
      <Row key={ft.contract}>
        <img src={ft.ft_metas.icon} alt={`${ft.ft_metas.symbol} icon`} />
        <div>{ft.ft_metas.name}</div>
        <div className="balance">
          {Big(ft.amount).div(Big(10).pow(ft.ft_metas.decimals)).toFixed(2)}
        </div>
        <div className="symbol">{ft.ft_metas.symbol}</div>
      </Row>
    ))}
  </List>
);

const renderNfts = (nfts) => (
  <List>
    {nfts.map((nft) => (
      <Row key={nft.contract}>
        <img src={nft.nft_meta.icon} alt={`${nft.nft_meta.symbol} icon`} />
        <div>{nft.nft_meta.name}</div>
        <div className="balance">{nft.quantity}</div>
        <div className="symbol">{nft.nft_meta.symbol}</div>
      </Row>
    ))}
  </List>
);

const renderCandidates = (title, candidates, threshold) => (
  <>
    <House>{title}</House>
    {candidates.map((candidate, index) => {
      const selected = candidate.nominee === state.selectedCandidate;
      const isWinning = index < threshold;
      return (
        <Card
          onClick={
            selected ? undefined : () => selectCandidate(candidate.nominee)
          }
          selected={selected}
          key={candidate.nominee}
          isWinning={isWinning}
        >
          <CardHeader>
            <img
              src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${candidate.nominee}`}
              alt={candidate.nominee}
            />
            <h3>{candidate.nominee}</h3>
            {selected && (
              <svg viewBox="0 0 24 24" onClick={() => selectCandidate(null)}>
                <path
                  fill="currentColor"
                  d="M4,12H20V14H4V12M4,9H20V11H4V9M16,4L12,8L8,4H11V1H13V4H16M8,19L12,15L16,19H13V22H11V19H8Z"
                ></path>
              </svg>
            )}
          </CardHeader>
          <CardContent>
            <div>Votes: {candidate.voters.length}</div>
            {selected && renderVoters(candidate.voters)}
            <div>Total Fungible Tokens: {candidate.inventory.fts.length}</div>
            {selected && renderFts(candidate.inventory.fts)}
            <div>
              Total Non Fungible Tokens: {candidate.inventory.nfts.length}
            </div>
            {selected && renderNfts(candidate.inventory.nfts)}
          </CardContent>
        </Card>
      );
    })}
  </>
);

const hom = state.candidates.filter(({ house }) => house === "HouseOfMerit");
hom.sort((a, b) => b.voters.length - a.voters.length);
const coa = state.candidates.filter(
  ({ house }) => house === "CouncilOfAdvisors"
);
coa.sort((a, b) => b.voters.length - a.voters.length);
const tc = state.candidates.filter(
  ({ house }) => house === "TransparencyCommission"
);
tc.sort((a, b) => b.voters.length - a.voters.length);

return (
  <Wrapper>
    <Header>NDC Elections Stats</Header>
    <Content>{renderCandidates("House Of Merit", hom, 15)}</Content>
    <Content>{renderCandidates("Council Of Advisors", coa, 7)}</Content>
    <Content>{renderCandidates("Transparency Commission", tc, 7)}</Content>
  </Wrapper>
);
