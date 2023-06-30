let { ids, org } = props;

ids = props.ids ? ids : [1, 2, 3]; // for testing purposes
org = props.org ? org : "test"; // for testing purposes

const electionContract = "elections-v1.gwg-testing.near";
const registryContract = "registry-v1.gwg-testing.near";
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const houses = [
  Near.view(electionContract, "proposal", { prop_id: ids[0] }),
  Near.view(electionContract, "proposal", { prop_id: ids[1] }),
  Near.view(electionContract, "proposal", { prop_id: ids[2] }),
];

State.init({
  selectedHouse: houses[0].id,
  humanVoted: 0,
  myVotes: [],
});

// TODO: Should be grabbed from indexer
const totalHumal = 1000;

asyncFetch("https://api.pikespeak.ai/election/total-votes", {
  headers: {
    "x-api-key": apiKey,
  },
}).then((resp) => {
  State.update({ humanVoted: resp.body });
});

asyncFetch(
  `https://api.pikespeak.ai/election/votes-by-voter?voter=${context.accountId}`,
  {
    headers: {
      "x-api-key": apiKey,
    },
  }
).then((resp) => {
  State.update({ myVotes: resp.body });
});

const widgets = {
  header: "rubycop.near/widget/NDC.Elections.Header",
  houses: "rubycop.near/widget/NDC.Elections.Houses",
  candidates: "rubycop.near/widget/NDC.Elections.Candidates",
  statistic: "rubycop.near/widget/NDC.Elections.Statistic",
  activities: "rubycop.near/widget/NDC.Elections.Activities",
};

const handleSelect = (item) => {
  State.update({ selectedHouse: item.id });
};

const Container = styled.div`
  padding: 30px 0;
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
`;

const Left = styled.div`
  padding: 20px;
  background: #F8F8F9;
  border-radius: 8px;
`;

const Center = styled.div`
`;

const Right = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background: #F8F8F9;
  border-radius: 8px;
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

return (
  <div>
    {houses.map((group) => (
      <>
        {group.id === state.selectedHouse && (
          <Widget
            key={i}
            src={widgets.header}
            props={{
              startTime: group.start,
              endTime: group.end,
              type: "Election",
            }}
          />
        )}
      </>
    ))}
    <Container className="d-flex row">
      <Left className="col-lg">
        <H5>To Vote</H5>
        <Widget
          src={widgets.houses}
          props={{
            selectedHouse: state.selectedHouse,
            houses: houses,
            handleSelect: (item) => handleSelect(item),
          }}
        />
      </Left>
      <Center className="col-lg-6 p-2 p-md-3">
        {houses.map((house) => (
          <>
            {house.id === state.selectedHouse && (
              <Widget
                key={i}
                src={widgets.candidates}
                props={{
                  electionContract,
                  registryContract,
                  ndcOrganization: org,
                  ...house,
                }}
              />
            )}
          </>
        ))}
      </Center>

      <div className="col-lg">
        <Right className="col">
          <H5>General</H5>
          <div className="d-flex justify-content-center">
            <Widget
              src={widgets.statistic}
              props={{
                voted: state.humanVoted,
                total: totalHumal,
              }}
            />
          </div>
        </Right>
        <Right className="col">
          <H5>My voting activity</H5>
          <ActivityContainer className="d-flex justify-content-center">
            <Widget
              src={widgets.activities}
              props={{ myVotes: state.myVotes }}
            />
          </ActivityContainer>
        </Right>
      </div>
    </Container>
  </div>
);
