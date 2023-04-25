const ownerId = "contribut3.near";

const availableContent = ["projects", "vendors", "backers", "requests"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "projects";
  }

  return content;
};

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "home",
      content: getContent(props.content),
      search: props.search,
      update: props.update,
      buttons: [
        {
          id: "projects",
          text: "Projects",
        },
        {
          id: "vendors",
          text: "Vendors",
        },
        {
          id: "backers",
          text: "Backers",
        },
        {
          id: "requests",
          text: "Requests",
        },
      ],
    }}
  />
);

const content = {
  projects: (
    <Widget
      src={`${ownerId}/widget/Project.List`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  vendors: (
    <Widget
      src={`${ownerId}/widget/Vendor.List`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  backers: (
    <Widget
      src={`${ownerId}/widget/Investor.List`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  requests: (
    <Widget
      src={`${ownerId}/widget/Request.List`}
      props={{ search: props.search, update: props.update }}
    />
  ),
}[getContent(props.content)];

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 2em;
    color: #101828;
  }

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.5em;
    color: #475467;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1.5em;
`;

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9em;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  gap: 0.5em;
  margin: 1em 0;

  div {
    width: 20%;
  }
`;

State.init({
  stats: null,
  statsIsFetched: false,
});

if (!state.statsIsFetched) {
  asyncFetch("https://api.flipsidecrypto.com/api/v2/queries/36637c73-6301-418b-ae83-7af6e8f34c0f/data/latest").then(([stats]) => State.update({ stats, statsIsFetched: true }));
}

return (
  <Container>
    <Heading>
      <h1>Discover NEAR Horizon</h1>
      <h2>Explore projects, vendors, investors and contribution requests</h2>
    </Heading>
    <Stats>
      <Widget
        src={`${ownerId}/widget/Stats.Card`}
        props={{
          value: "1077",
          label: "Projects",
        }}
      />
      <Widget
        src={`${ownerId}/widget/Stats.Card`}
        props={{
          value: state.stats.MAU,
          label: "Monthly active accounts",
        }}
      />
      <Widget
        src={`${ownerId}/widget/Stats.Card`}
        props={{
          value: state.stats.TOTAL_ACCOUNTS,
          label: "Total accounts",
        }}
      />
      <Widget
        src={`${ownerId}/widget/Stats.Card`}
        props={{
          value: "$88M+",
          label: "Raised",
        }}
      />
      <Widget src={`${ownerId}/widget/Stats.Link`} />
    </Stats>
    <div>{contentSelector}</div>
    <Filters>
      <Widget
        src={`${ownerId}/widget/SearchInput`}
        props={{ search: props.search, update: props.update }}
      />
      <Filter>
        <Widget
          src={`${ownerId}/widget/Filter`}
          props={{
            name: "Type",
            options: [
              { id: "verified", text: "Verified", href: "#" },
              { id: "not-verified", text: "Not verified", href: "#" },
            ],
            selected: "verified",
            update: (id) => console.log(id),
          }}
        />
        <Widget
          src={`${ownerId}/widget/Filter`}
          props={{
            name: "Status",
            options: [
              { id: "active", text: "Active", href: "#" },
              { id: "not-active", text: "Not active", href: "#" },
            ],
            selected: "active",
            update: (id) => alert(id),
          }}
        />
        <Widget
          src={`${ownerId}/widget/Filter`}
          props={{
            name: "Sort by",
            options: [
              { id: "name", text: "Name", href: "#" },
              { id: "id", text: "Account ID", href: "#" },
            ],
            selected: "name",
            update: (id) => alert(id),
          }}
        />
      </Filter>
    </Filters>
    <div>{content}</div>
  </Container>
);
