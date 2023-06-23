// TODO: Should be grabbed from contract side
const contractProps = {
  houses: [
    {
      id: 2,
      typ: "CouncileOfAdvisors",
      ref_link: "example.com",
      start: 1689820065441,
      end: 1690820065441,
      quorum: 100,
      voters_num: 150,
      seats: 10,
      result: [],
    },
    {
      id: 3,
      typ: "HouseOfMerit",
      title: "House Of Merit",
      ref_link: "example.com",
      start: 1685820065441,
      end: 1696820065441,
      quorum: 100,
      voters_num: 150,
      seats: 10,
      result: [
        ["zomland.near", 150],
        ["asfsdfsfdfddfsdfdfsdfdf.near", 150],
        ["blabla.near", 10],
        ["rubycop.near", 50],
        ["candidate1.near", 0],
        ["zomland.near", 150],
        ["asfsdfsfdfddfsdfdfsdfdf.near", 150],
        ["blabla.near", 10],
        ["rubycop.near", 50],
        ["candidate1.near", 0],
        ["zomland.near", 150],
        ["asfsdfsfdfddfsdfdfsdfdf.near", 150],
        ["blabla.near", 10],
        ["rubycop.near", 50],
        ["candidate1.near", 0],
      ],
    },
    {
      id: 4,
      typ: "TransparancyCommision",
      ref_link: "example.com",
      start: 1655820065441,
      end: 165820065441,
      quorum: 100,
      voters_num: 150,
      seats: 10,
      result: [],
    },
  ],
};

const { houses } = contractProps;

const electionContract = "elections-v2.gwg.testnet";
const registryContract = "registry-unstable.i-am-human.testnet";
const ndcOrganization = "test";

// TODO: Should be grabbed from indexer
const humanVoted = 800;
const totalHumal = 1000;

const myVotes = [
  { candidateId: "zomland.near", time: 1686820065441, typ: "House Of Merit" },
  {
    candidateId: "rubycop.near",
    time: 1686820065441,
    typ: "Councile Of Advisors",
  },
  {
    candidateId: "blabla.near",
    time: 1686820065441,
    typ: "Transparancy Commision",
  },
  {
    candidateId: "zomland.near",
    time: 1686820065441,
    typ: "Transparancy Commision",
  },
  {
    candidateId: "rubycop.near",
    time: 1686820065441,
    typ: "Councile Of Advisors",
  },
  {
    candidateId: "blabla.near",
    time: 1686820065441,
    typ: "Transparancy Commision",
  },
  {
    candidateId: "zomland.near",
    time: 1686820065441,
    typ: "Transparancy Commision",
  },
];

const widgets = {
  header: "rubycop.near/widget/NDC.Elections.Header",
  houses: "rubycop.near/widget/NDC.Elections.Houses",
  candidates: "rubycop.near/widget/NDC.Elections.Candidates",
  statistic: "rubycop.near/widget/NDC.Elections.Statistic",
  activities: "rubycop.near/widget/NDC.Elections.Activities",
};

State.init({
  selectedHouse: houses[0].id,
});

const handleSelect = (item) => {
  State.update({ selectedHouse: item.id });
};

const Container = styled.div`
  padding: 30px 0;
  height: 747px !important;
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
    {contractProps.houses.map((group) => (
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
      <Left className="col-lg h-100">
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
      <Center className="col-lg-6 p-2 p-md-3 h-100">
        {contractProps.houses.map((house) => (
          <>
            {house.id === state.selectedHouse && (
              <Widget
                key={i}
                src={widgets.candidates}
                props={{
                  electionContract,
                  registryContract,
                  ndcOrganization,
                  ...house,
                }}
              />
            )}
          </>
        ))}
      </Center>

      <div className="col-lg h-100">
        <Right className="col">
          <H5>General</H5>
          <div className="d-flex justify-content-center">
            <Widget
              src={widgets.statistic}
              props={{
                voted: humanVoted,
                total: totalHumal,
              }}
            />
          </div>
        </Right>
        <Right className="col">
          <H5>My voting activity</H5>
          <ActivityContainer className="d-flex justify-content-center">
            <Widget src={widgets.activities} props={{ myVotes }} />
          </ActivityContainer>
        </Right>
      </div>
    </Container>
  </div>
);
