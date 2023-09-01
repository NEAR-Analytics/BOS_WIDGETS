let { ids } = props;

ids = props.ids ? ids : [1, 2, 3, 4];
const budgetId = 4;

const electionContract = "elections-v1.gwg-testing.near";
const registryContract = "registry-v1.gwg-testing.near";
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

State.init({
  selectedHouse: ids[0],
  myVotes: [],
  winnerIds: [],
  isIAmHuman: false,
  blacklisted: false,
  greylisted: false,
  candidateId: "",
  alreadyBonded: false,
  reload: true,
  houses: [],
});

// asyncFetch(
//   `https://api.pikespeak.ai/election/already_bonded?contract=${electionContract}`,
//   { headers: { "x-api-key": apiKey } }
// ).then((resp) => {
//   if (resp.body) State.update({ alreadyBonded: resp.body });
// });

const winnerIds = Near.view(electionContract, "winners_by_house", {
  prop_id: state.selectedHouse,
});

if (state.reload) {
  let houses = [
    Near.view(electionContract, "proposal", { prop_id: ids[0] }),
    Near.view(electionContract, "proposal", { prop_id: ids[1] }),
    Near.view(electionContract, "proposal", { prop_id: ids[2] }),
    Near.view(electionContract, "proposal", { prop_id: ids[3] }),
  ];

  const isHuman = Near.view(registryContract, "is_human", {
    account: context.accountId,
  });

  const flagged = Near.view(electionContract, "account_flagged", {
    account: context.accountId,
  });

  State.update({
    isIAmHuman: isHuman[0][1].length > 0,
    winnerIds,
    blacklisted: flagged === "Blacklisted",
    greylisted: flagged !== "Blacklisted" && flagged !== "Verified",
    houses,
  });

  if (context.accountId)
    asyncFetch(
      `https://api.pikespeak.ai/election/votes-by-voter?voter=${context.accountId}&contract=${electionContract}`,
      { headers: { "x-api-key": apiKey } }
    ).then((resp) => {
      if (resp.body) State.update({ myVotes: resp.body, reload: false });
    });
}

const widgets = {
  header: "election.ndctools.near/widget/NDC.Elections.Header",
  filter: "election.ndctools.near/widget/NDC.Elections.Filter",
  houses: "election.ndctools.near/widget/NDC.Elections.Houses",
  progress: "election.ndctools.near/widget/NDC.Elections.Progress",
  candidates: "election.ndctools.near/widget/NDC.Elections.Candidates",
  statistic: "election.ndctools.near/widget/NDC.Elections.Statistic",
  activities: "election.ndctools.near/widget/NDC.Elections.Activities",
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

const handleSelect = (item) => {
  State.update({ selectedHouse: item.id });
};

const handleUnbond = () => {
  Near.call(
    registryContract,
    "is_human_call",
    { ctr: electionContract, function: "unbond", payload: "{}" },
    "110000000000000"
  ).then((data) => State.update({ alreadyBonded: false }));
};

const handleFilter = (e) => State.update({ candidateId: e.target.value });

const votesLeft = (house) =>
  house.seats - state.myVotes.filter((vote) => vote.house === house.typ).length;

const Container = styled.div`
  padding: 20px 0;
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
`;

const Left = styled.div`
  padding: 20px;
  background: #f8f8f9;
  border-radius: 8px;
`;

const Filter = styled.div`
  margin-top: 32px;
`;

const Right = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: #f8f8f9;
  border-radius: 8px;
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

const UnbondContainer = styled.div`
  background: #fdfeff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
  h3,
  h4 {
    margin: 0 3px;
  }
  h3 {
    font-weight: 900;
  }
  .text-secondary {
    margin: 0 10px;
  }
  &.not-verified {
    h4 {
      font-size: 16px;
      margin: 0 0 5px 0;
      font-weight: 600;
    }
    h5 {
      margin: 0;
      font-size: 12px;
    }
  }
`;

const rand = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

return (
  <>
    <div>
      {state.houses.map((house) => (
        <>
          {house.id === state.selectedHouse && (
            <Widget
              key={i}
              src={widgets.header}
              props={{
                startTime: house.start,
                endTime: house.end,
                type: "Election",
                isWhistleblower: true,
              }}
            />
          )}
        </>
      ))}
      {state.selectedHouse !== budgetId && (
        <Filter>
          <Widget
            src={widgets.filter}
            props={{
              handleFilter,
              candidateId: state.candidateId,
              placeholder: "Search by candidate name",
            }}
          />
        </Filter>
      )}
      <Container className="d-flex row">
        <Left className="h-screen col-lg-3 d-flex flex-column justify-content-between">
          <div>
            <H5>To Vote</H5>
            <Widget
              src={widgets.houses}
              props={{
                selectedHouse: state.selectedHouse,
                houses: state.houses,
                handleSelect,
                votesLeft: (house) => votesLeft(house),
              }}
            />
          </div>

          {state.winnerIds.length > 0 ? (
            <UnbondContainer className={`not-verified d-flex flex-column`}>
              <div>
                <h4>Unbond NEAR & Mint SBT</h4>
                <h5 className="text-secondary">
                  Congratulations! You can now unbond NEAR and mint the “I
                  Voted” SBT
                </h5>
              </div>
              <div className="mt-3">
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      className: "primary w-100 justify-content-center",
                      disabled: !state.alreadyBonded,
                      text: "Unbond & Mint I Voted SBT",
                      onClick: handleUnbond,
                    },
                  }}
                />
              </div>
            </UnbondContainer>
          ) : (
            <Widget
              src={widgets.progress}
              props={{
                houses: state.houses,
                handleSelect,
                votesLeft: (house) => votesLeft(house),
              }}
            />
          )}
        </Left>
        <div className="col-lg-6 p-2 p-md-3">
          {state.houses.map((house) => (
            <>
              {house.id === state.selectedHouse && (
                <Widget
                  key={i}
                  src={widgets.candidates}
                  props={{
                    electionContract,
                    registryContract,
                    ndcOrganization: "NDC",
                    ...state,
                    ...house,
                    result: rand(house.result),
                  }}
                />
              )}
            </>
          ))}
        </div>

        <div className="col-lg-3">
          <Right className="col">
            <H5>General</H5>
            <div className="d-flex justify-content-center">
              <Widget src={widgets.statistic} />
            </div>
          </Right>
          {state.myVotes.length > 0 && (
            <Right className="col">
              <H5>My voting activity</H5>
              <ActivityContainer className="d-flex justify-content-center">
                <Widget
                  src={widgets.activities}
                  props={{ myVotes: state.myVotes }}
                />
              </ActivityContainer>
            </Right>
          )}
        </div>
      </Container>
    </div>
  </>
);
