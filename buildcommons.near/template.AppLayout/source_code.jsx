const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--bg-1, #0b0c14);
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
    <Container>
      <ContentContainer key={page}>{children}</ContentContainer>
    </Container>
  );
}
return { AppLayout };
