const data = fetch("https://data.cityofnewyork.us/resource/i4kb-6ab6.json");

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

const OrganizationCard = ({ data }) => {
  return (
    <Container>
      {data.map((organization, index) => (
        <div key={index}>
          <OrganizationName>{organization.organization_name}</OrganizationName>
          <Mission dangerouslySetInnerHTML={{ __html: organization.mission }} />
          <VolunteerProgramDescription>
            {organization.volunteer_program_description}
          </VolunteerProgramDescription>
          <Address>
            {organization.street_address}, {organization.city},{" "}
            {organization.state} {organization.postcode}
          </Address>
          <Website
            href={organization.website.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {organization.website.url}
          </Website>
        </div>
      ))}
    </Container>
  );
};

return (
  <div>
    <h1>Organizations</h1>
    <OrganizationCard data={data.body} />
  </div>
);
