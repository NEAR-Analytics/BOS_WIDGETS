const nominationsContractId = "nominations.ndc-gwg.near";
const loadingWidget = "chess-game.near/widget/ChessGameLoading";
const waitTime = 25;
const waitTimeOnErr = 500;

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
    nominees = nominees.concat(res.body.slice(0, 5));
    break;
    // nominees = nominees.concat(res.body);
    if (res.body.length < 50) break;
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
    `https://api.pikespeak.ai/election/votes-by-candidate?contract=${nominationsContractId}&candidate=${nominee.nominee}`,
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-size: 1.1rem;
  border-radius: 1rem;
  background-color: ${({ selected }) =>
    selected ? "lightblue !important;" : "lightgrey;"}}
  cursor: pointer;

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

  .balance {
    text-align: right;
  }

  .symbol {
    min-width: 5rem;
    max-width: 5rem;
  }
`;

// {
//   "timestamp": "2023-08-18T13:39:37.514Z",
//   "nominee": "manutegus.near",
//   "house": "TransparencyCommission",
//   "comment": "manutegus.near",
//   "link": "",
//   "is_revoked": false,
//   "nomination_period": "2026-08-27T00:00:00.000Z",
//   "contract": "nominations.ndc-gwg.near",
//   "upvotes": "7"
// }

const selectCandidate = (candidateId) => {
  State.update({
    selectedCandidate: candidateId,
  });
};

const renderFts = (fts) => (
  <List>
    {fts.map((ft) => (
      <Row>
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

const renderCandidates = (candidates) =>
  candidates.map((candidate) => {
    const selected = candidate.nominee === state.selectedCandidate;
    return (
      <Card
        onClick={() => selectCandidate(candidate.nominee)}
        selected={selected}
      >
        <CardHeader>
          <img
            src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${candidate.nominee}`}
            alt={candidate.nominee}
          />
          <h3>{candidate.nominee}</h3>
        </CardHeader>
        <CardContent>
          <div>Votes: {candidate.voters.length}</div>
          <div>Total Fungible Tokens: {candidate.inventory.fts.length}</div>
          {selected && renderFts(candidate.inventory.fts)}
          <div>
            Total Non Fungible Tokens: {candidate.inventory.nfts.length}
          </div>
        </CardContent>
      </Card>
    );
  });

return (
  <Wrapper>
    <Header>NDC Elections Stats</Header>
    <Content>{renderCandidates(state.candidates)}</Content>
  </Wrapper>
);
