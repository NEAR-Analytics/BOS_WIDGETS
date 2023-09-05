const featuredProjects = [
  "marmajgaming.near",
  "research-collective.near",
  "bac-inc.near",
];
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto); 
  gap: 2em;
  padding: 0;
  width: 100%;

  & > h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    color: #101828;
  }
`;

const heading = styled.h1`
 
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    color: #101828;
  
`;
return (
  <div>
    <heading>Featured Projects</heading>
    <Container>
      {featuredProjects.map((accountId) => (
        <Widget
          src={`potlock.near/widget/potlock.projects.projectCard`}
          props={{
            accountId,
          }}
        />
      ))}
    </Container>
  </div>
);
