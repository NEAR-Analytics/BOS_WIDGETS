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
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  border-radius: 1rem;
  background-color: ${({ selected }) =>
    selected ? "rgba(0,0,140,0.5) !important;" : "rgba(0,0,0,0.3);"}}
  cursor: pointer;

  &:hover {
    background-color: rgba(0,0,100,0.3);
  }

  img {
    border-radius: 0.3rem;
    width: 4rem;
    height: 4rem;
    margin: 0.6rem;
  }
`;

const CardContent = styled.div`
  display: flex;
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

const renderCandidates = (candidates) =>
  candidates.map((candidate) => {
    return (
      <Card
        onClick={() => selectCandidate(candidate.nominee)}
        selected={candidate.nominee === state.selectedCandidate}
      >
        <img
          src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${candidate.nominee}`}
          alt={candidate.nominee}
        />
        <CardContent>
          <h3>{candidate.nominee}</h3>
          <div>Fungible Tokens:</div>
        </CardContent>
      </Card>
    );
  });

return <Wrapper>{renderCandidates(state.candidates)}</Wrapper>;
