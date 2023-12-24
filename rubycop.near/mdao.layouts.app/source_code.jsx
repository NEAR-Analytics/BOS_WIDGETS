const { app, provider } = VM.require(`rubycop.near/widget/mdao.config`);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #f4f4f4;
  margin-top: calc(-1 * var(--body-top-padding));
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AppHeader = ({ page }) => (
  <Widget
    src={`${provider}/widget/${app}.components.NavBar`}
    props={{ page: page, ...props }}
  />
);

const Footer = (props) => {
  return (
    <Widget
      src="devhub.near/widget/devhub.components.organism.NewsLetter"
      props={{
        ...props,
      }}
    />
  );
};

function AppLayout({ page, children }) {
  return (
    <>
      <Container>
        <AppHeader page={page} />
        <ContentContainer>{children}</ContentContainer>
        <Footer page={page} />
      </Container>
    </>
  );
}

return { AppLayout };
