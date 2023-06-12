// TODO: Should be grabbed from contract side
const props = {
  widgetProvider: "rubycop.near",
  contractName: "elections-v2.gwg.testnet",
  ndcOrganization: "test",
  groups: [
    {
      title: "Councile of Advisors",
      src: "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq",
      leftVotes: 0,
      maxVotes: 10,
      submitted: true,
      id: 2,
      typ: "CouncileOfAdvisors",
      ref_link: "example.com",
      quorum: 100,
      voters_num: 150,
      seats: 10,
      result: [],
      voters: [],
      votes: {
        available: 0,
        total: 10,
      },
    },
    {
      title: "House of Merit",
      src: "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq",
      leftVotes: 5,
      maxVotes: 10,
      submitted: false,
      id: 3,
      typ: "HouseOfMerit",
      title: "House Of Merit",
      ref_link: "example.com",
      start: 1685820065441,
      end: 1686820065441,
      quorum: 100,
      voters_num: 150,
      seats: 10,
      result: [
        ["zomland.near", 150],
        ["asfsdfsfdfddfsdfdfsdfdf.near", 150],
        ["blabla.near", 10],
        ["rubycop.near", 50],
        ["candidate1.near", 0],
      ],
      voters: [
        {
          accountId: "rubycop.near",
          candidateId: "zomland.near",
          txn_url: "3ZunLtfdnkAC1oTgUxy5KXJb7qQWULmcFpVvkaq2pd6b",
        },
        {
          accountId: "voter1.near",
          candidateId: "zomland.near",
          txn_url: "3ZunLtfdnkAC1oTgUxy5KXJb7qQWULmcFpVvkaq2pd6b",
        },
        {
          accountId: "voter1",
          candidateId: "candidate1.near",
          txn_url: "3ZunLtfdnkAC1oTgUxy5KXJb7qQWULmcFpVvkaq2pd6b",
        },
      ],
      votes: {
        available: 3,
        total: 3,
      },
    },
    {
      title: "Transparancy Commision",
      src: "https://ipfs.near.social/ipfs/bafkreie4rfa63zedwnpbwm5lglqrwqhahcnf6slllqmq7sh46ngf5y4vsq",
      leftVotes: 10,
      maxVotes: 10,
      submitted: true,
      id: 4,
      typ: "TransparancyCommision",
      ref_link: "example.com",
      start: 1685820065441,
      end: 1686820065441,
      quorum: 100,
      voters_num: 150,
      seats: 10,
      result: [],
      voters: [],
      votes: {
        available: 0,
        total: 1,
      },
    },
  ],
};

const { widgetProvider, groups } = props;

State.init({
  selectedGroup: groups[0].id,
});

const handleSelect = (item) => {
  State.update({ selectedGroup: item.id });
};

const Container = styled.div`
  padding: 30px 0;
`;

const Left = styled.div`
  padding: 20px;
  background: #F8F8F9;
  border-radius: 8px;
`;

const Center = styled.div`
  margin: 0 20px;
`;

const Right = styled.div`
  padding: 20px;
  background: #F8F8F9;
  border-radius: 8px;
`;

const H5 = styled.h5`
  margin-bottom: 20px;
`;

return (
  <div>
    {props.groups.map((group) => (
      <>
        {group.id === state.selectedGroup && (
          <Widget
            key={i}
            src={`${widgetProvider}/widget/NDC-election-header`}
            props={group}
          />
        )}
      </>
    ))}
    <Container className="d-flex flex-wrap gx-5">
      <Left>
        <H5>To Vote</H5>
        <Widget
          key={i}
          src={`${widgetProvider}/widget/NDC-election-groups`}
          props={{
            selectedGroup: state.selectedGroup,
            groups: groups,
            handleSelect: (item) => handleSelect(item),
          }}
        />
      </Left>
      <Center>
        {props.groups.map((group) => (
          <>
            {group.id === state.selectedGroup && (
              <Widget
                key={i}
                src={`${widgetProvider}/widget/NDC-elections`}
                props={{
                  contractName: props.contractName,
                  ndcOrganization: props.ndcOrganization,
                  ...group,
                }}
              />
            )}
          </>
        ))}
      </Center>
      <Right>
        <H5>General</H5>
      </Right>
    </Container>
  </div>
);
