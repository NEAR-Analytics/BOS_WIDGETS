const Container = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;

    // Mobile
  @media (max-width: 767px) {
    justify-content: flex-start;
  }
`;

const InnerContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 535px;

    // Mobile
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;  
  border: 2px solid orange;

    // Mobile
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

    // Mobile
  @media (max-width: 767px) {
    border-top: none;
    padding: 10px;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
  }

    // Mobile
  @media (max-width: 767px) {
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
        <Column>
          <IconBox>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              width="24px"
              height="24px"
            >
              <circle cx="12" cy="12" r="8" />
            </svg>
          </IconBox>
          <SubjectField type="text" placeholder="everything" />
          <ActionButton>
            <span>&#10140;</span>
          </ActionButton>
        </Column>
      </Row>
      <Row>advanced</Row>
    </InnerContainer>
  </Container>
);
