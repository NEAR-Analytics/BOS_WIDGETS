if (!context.accountId || !props.term) return <></>;

let results = [];
const profilesData = Social.get("*/profile/name", "final") || {};
const followingData = Social.get(
  `${context.accountId}/graph/follow/**`,
  "final"
);

if (!profilesData || !followingData) return <></>;

const profiles = Object.entries(profilesData);
const term = (props.term || "").replace(/\W/g, "").toLowerCase();
const limit = 5;

for (let i = 0; i < profiles.length; i++) {
  let score = 0;
  const accountId = profiles[i][0];
  const accountIdSearch = profiles[i][0].replace(/\W/g, "").toLowerCase();
  const nameSearch = (profiles[i][1]?.profile?.name || "")
    .replace(/\W/g, "")
    .toLowerCase();
  const accountIdSearchIndex = accountIdSearch.indexOf(term);
  const nameSearchIndex = nameSearch.indexOf(term);

  if (accountIdSearchIndex > -1 || nameSearchIndex > -1) {
    score += 10;

    if (accountIdSearchIndex === 0) {
      score += 10;
    }
    if (nameSearchIndex === 0) {
      score += 10;
    }
    if (followingData[accountId] === "") {
      score += 30;
    }

    results.push({
      accountId,
      score,
    });
  }
}

results.sort((a, b) => b.score - a.score);
results = results.slice(0, limit);

function onResultClick(id) {
  props.onSelect && props.onSelect(id);
}

const Wrapper = styled.div`
  position: relative;

  &::before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      width: 6px;
      height: 100%;
      background: #f8f8f9;
      z-index: 10;
  }
`;

const Scroller = styled.div`
  position: relative;
  display: flex;
  padding: 6px;
  gap: 6px;
  overflow: auto;
  scroll-behavior: smooth;
  align-items: center;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    max-width: 200px;
    text-align: left;
    flex-grow: 0;
    flex-shrink: 0;
  }
`;

const Selection = styled.button`
  width: 150px;
  font-size: 12px;
  background: #f8f8f9;
  
  &:hover {
    background: #d4e4f461;
  }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    display: block;
    padding: 5px;
    color #687076;
    transition: all 200ms;

    &:hover {
        color: #000;
    }
`;

console.log(results);

if (results.length === 0) return <></>;

return (
  <Wrapper>
    <Scroller>
      <CloseButton tabIndex={-1} type="button" onClick={props.onClose}>
        <i className="bi bi-x-lg" />
      </CloseButton>

      {results.map((result) => {
        return (
          <Selection
            className="border-0 btn"
            key={result.accountId}
            onClick={() => onResultClick(result.accountId)}
          >
            <Widget
              key={result.accountId}
              src="mob.near/widget/Profile.ShortInlineBlock"
              props={{
                accountId: result.accountId,
              }}
            />
          </Selection>
        );
      })}
    </Scroller>
  </Wrapper>
);
