const Container = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    justify-content: flex-start;
  }
`;

const InnerContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 2px solid orange;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid green;
  padding: 20px;

  @media (max-width: 767px) {
    border-top: none;
    padding: 10px;
  }
`;

const IconBox = styled.div`
  font-family: "Times New Roman";
  font-size: 2em;
  line-height: 1.25;
  font-weight: 400;
  cursor: pointer;

  @media (max-width: 767px) {
    font-size: 1.5em;
  }
`;

const ActionButton = styled.button`
  font-family: "Times New Roman";
  font-size: 2em;
  line-height: 1.25;
  font-weight: 400;
  cursor: pointer;

  @media (max-width: 767px) {
    font-size: 1.5em;
  }
`;

const SubjectField = styled.input`
  font-family: "Times New Roman";
  font-size: 2em;
  line-height: 1.25;
  font-weight: 400;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  width: 100%;

  @media (max-width: 767px) {
    font-size: 1.5em;
  }
`;

return (
  <Container>
    <InnerContainer>
      <Row>
        <IconBox>Icon</IconBox>
        <SubjectField type="text" placeholder="Subject" />
        <ActionButton>Action</ActionButton>
      </Row>
      <Row>advanced</Row>
    </InnerContainer>
  </Container>
);
