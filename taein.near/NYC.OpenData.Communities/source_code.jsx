const data = fetch("https://data.cityofnewyork.us/resource/knr6-vurn.json");

if (!data) {
  return <p>Loading...</p>;
}

const Container = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
`;

const OrganizationName = styled.h2`
  font-size: 1.5rem;
`;

const Mission = styled.div`
  margin-top: 10px;
`;

const VolunteerProgramDescription = styled.p`
  margin-top: 10px;
`;

const Address = styled.p`
  margin-top: 10px;
`;

const Website = styled.a`
  margin-top: 10px;
  display: block;
`;

const boroughFrequency = {};

Object.entries(data).forEach(([key, org]) => {
  if (boroughFrequency[org.borough]) {
    boroughFrequency[org.borough]++;
  } else {
    boroughFrequency[org.borough] = 1;
  }
});

const OrganizationCard = ({ organization, index }) => {
  return (
    <>
      <Container>
        <div key={index}>
          <OrganizationName>{organization.borough}</OrganizationName>
          <Mission dangerouslySetInnerHTML={{ __html: organization.date }} />
          <VolunteerProgramDescription>
            {organization.date}
          </VolunteerProgramDescription>
          <Address>{organization.contributing_factors}</Address>
          <Website
            href={organization.website.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {organization.website.url}
          </Website>
        </div>
      </Container>
    </>
  );
};

const renderItem = (a, index) => {
  return (
    <div key={JSON.stringify(a)}>
      <OrganizationCard organization={a} index={index} />
    </div>
  );
};

return (
  <div>
    <h1>Organizations</h1>
    <Widget
      src="efiz.near/widget/ItemFeed"
      props={{ items: data.body || [], renderItem }}
    />
  </div>
);
