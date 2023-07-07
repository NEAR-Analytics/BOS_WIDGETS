let { ids, org } = props;

ids = props.ids ? ids : [1, 2, 3]; // for testing purposes
org = props.org ? org : "test"; // for testing purposes

const electionContract = "elections-v1.gwg-testing.near";
const registryContract = "registry-v1.gwg-testing.near";
const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

let houses = [
  Near.view(electionContract, "proposal", { prop_id: ids[0] }),
  Near.view(electionContract, "proposal", { prop_id: ids[1] }),
  Near.view(electionContract, "proposal", { prop_id: ids[2] }),
];

State.init({
  selectedHouse: ids[0],
  humanVoted: 0,
  myVotes: [],
  isIAmHuman: false,
  candidateId: "",
});

const isHuman = Near.view(registryContract, "is_human", {
  account: context.accountId,
});

State.update({ isIAmHuman: isHuman[0][1].length > 0 });

const totalHumal = 3000;

asyncFetch("https://api.pikespeak.ai/election/total-voters", {
  headers: {
    "x-api-key": apiKey,
  },
}).then((resp) => {
  if (resp.body) State.update({ humanVoted: resp.body });
});

asyncFetch(
  `https://api.pikespeak.ai/election/votes-by-voter?voter=${context.accountId}`,
  {
    headers: {
      "x-api-key": apiKey,
    },
  }
).then((resp) => {
  if (resp.body) State.update({ myVotes: resp.body });
});

const widgets = {
  header: "rubycop.near/widget/NDC.Elections.Header",
  filter: "rubycop.near/widget/NDC.Elections.Filter",
  houses: "rubycop.near/widget/NDC.Elections.Houses",
  candidates: "rubycop.near/widget/NDC.Elections.Candidates",
  statistic: "rubycop.near/widget/NDC.Elections.Statistic",
  activities: "rubycop.near/widget/NDC.Elections.Activities",
};

const handleSelect = (item) => {
  State.update({ selectedHouse: item.id });
};

const handleFilter = (e) => State.update({ candidateId: e.target.value });

const Container = styled.div`
  padding: 20px 0;
`;

const ActivityContainer = styled.div`
  overflow-y: scroll;
`;

const Left = styled.div`
  padding: 20px;
  background: #F8F8F9;
  border-radius: 8px;
`;

const Filter = styled.div`
  margin-top: 32px;
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
    {houses.map((house) => (
      <>
        {house.id === state.selectedHouse && (
          <Widget
            key={i}
            src={widgets.header}
            props={{
              startTime: house.start,
              endTime: house.end,
              type: "Election",
            }}
          />
        )}
      </>
    ))}
    <Filter>
      <Widget
        src={widgets.filter}
        props={{
          handleFilter,
          candidateId: state.candidateId,
        }}
      />
    </Filter>
    <Container className="d-flex row">
      <Left className="col-lg">
        <H5>To Vote</H5>
        <Widget
          src={widgets.houses}
          props={{
            selectedHouse: state.selectedHouse,
            houses,
            handleSelect,
          }}
        />
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
                  ndcOrganization: org,
                  isIAmHuman: state.isIAmHuman,
                  myVotes: state.myVotes,
                  candidateId: state.candidateId,
                  ...house,
                }}
              />
            )}
          </>
        ))}
      </div>

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
