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

console.log(houses);
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
];

const widgets = {
  header: "syi216.near/widget/NDC.Nomination.Header",
  houses: "rubycop.near/widget/NDC.Elections.Houses",
  candidates: "rubycop.near/widget/NDC.Elections.Candidates",
  statistic: "rubycop.near/widget/NDC.Elections.Statistic",
  activities: "rubycop.near/widget/NDC.Elections.Activities",
};

State.init({
  selectedHouse: houses[0].id,
  start: true,
  house: "CouncilOfAdvisors",
  nominations: [],
});
State.init({});
//

function handleNominations(data) {
  State.update({ nominations: data });
}
function testPikespeak() {
  asyncFetch(
    `https://api.pikespeak.ai/nominations/house-nominations?house=${state.house}`,
    {
      headers: {
        "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5",
      },
    }
  ).then((res) => {
    console.log(res.body);
    State.update({ nominations: res.body });
    let info = Social.getr("syi216.near/profile");
    console.log(info);
  });
}

if (state.start) {
  testPikespeak("");
  State.update({
    start: false,
  });
}

const handleSelect = (item) => {
  switch (item.id) {
    case 2:
      console.log("CouncilOfAdvisors");
      State.update({ house: "CouncilOfAdvisors" });
      testPikespeak(state.house);
      break;
    case 3:
      console.log("HouseOfMerit");
      State.update({ house: "HouseOfMerit" });
      testPikespeak(state.house);
      break;
    case 4:
      State.update({ house: "TransparencyCommission" });
      testPikespeak(state.house);
      console.log("TransparencyCommission");
      break;
  }
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

const Toolbar = styled.div`
margin: 32px 0 0 0;
display: flex;
width: 66%;
align-items: flex-start;
gap: 20px;
`;

const FilterBar = styled.div`
display: flex;
padding: 12px 16px;
align-items: center;
gap: 8px;
flex: 1 0 0;
border-radius: 8px;
background: #F8F8F9;
`;

const SearchIcon = styled.img`
width: 14px;
height: 14px;
`;

const LabelFile = styled.div`
display: flex;
padding: 12px;
align-items: flex-start;
gap: 12px;
flex: 1 0 0;
border-radius: 8px;
border: 1px solid #D0D6D9;
background: #FFF;
`;

const InputSearch = styled.input`
color: #828688;
font-size: 12px;
width: 100%;
font-family: Avenir;
font-weight: 500;
line-height: 120%;
border: 0px;
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
              type: "Nomination",
            }}
          />
        )}
      </>
    ))}
    <Toolbar>
      <FilterBar>
        <LabelFile>
          <SearchIcon
            src="https://apricot-straight-eagle-592.mypinata.cloud/ipfs/QmUgE9Cgge5VRgQB1VYxMaAjJWgzmXUzMcPSTwQ8ZfLJqz?_gl=1*xfjfsk*_ga*MzkyOTE0Mjc4LjE2ODY4NjgxODc.*_ga_5RMPXG14TE*MTY4NzkxMTcwOS41LjAuMTY4NzkxMTcxNi41My4wLjA."
            alt="pic"
          ></SearchIcon>
          <InputSearch placeholder="Search by candidate name and affiliation"></InputSearch>
        </LabelFile>
      </FilterBar>
    </Toolbar>
    <Container className="d-flex row">
      <Left className="col-lg">
        <H5>Houses</H5>
        <Widget
          src={widgets.houses}
          props={{
            selectedHouse: state.selectedHouse,
            houses: houses,
            handleSelect: (item) => handleSelect(item),
          }}
        />
      </Left>
      <Center className="col-lg-8 p-2 p-md-3 d-flex flex-row flex-wrap justify-content-center gap-4">
        {state.nominations.map((data) => {
          return <Widget src={"syi216.near/widget/NDC.nomination.card"} />;
        })}
      </Center>
    </Container>
  </div>
);
