const { widgetPath } = VM.require(`/*__@widgetPath__*/.Config`);

const Theme = styled.div`
  background: #fffcff;
  font-style: normal;

  a {
    color: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #151718;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

function AppLayout({ page, children }) {
  return (
    <Theme>
      <Container>
        <Widget src={`${widgetPath}.components.NavBar`} />
        <ContentContainer>{children}</ContentContainer>
        <Widget src={`${widgetPath}.components.Footer`} />
      </Container>
    </Theme>
  );
}

return { AppLayout };
