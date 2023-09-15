const Body = styled.div`
  display: flex;
  flex-direction: column;
  color: #001e00;
  background-color: #000;
`;

const Wrapper = styled.div`
  flex-grow: 1;
`;

const Container = styled.div`
  width: 100%;
  max-width: 62em;
  margin: 0 auto;
`;

const Nav = styled.div`
`;

return (
  <Body>
    <Container>
      <div>
        <Nav>
          <img
            style={{ maxWidth: "5rem", width: "100%" }}
            src={props.logo ?? "https://i.ibb.co/tmrN68r/Logo.png"}
            alt={`${props.brandName ?? "Company"} Logo`}
          />
        </Nav>
      </div>
    </Container>
  </Body>
);
