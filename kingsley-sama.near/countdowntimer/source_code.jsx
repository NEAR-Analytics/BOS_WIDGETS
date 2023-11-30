const sharedCardStyles = `
  background: linear-gradient(to right, #4b5563, #1f2937);
  flex: auto;
  width: 42%;
  height: 42%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  height: 200px;
  width:"90%";
`;

const Card = styled.div`
  width: 100%;
  margin-bottom: 2px;
  justify-content: center;
  background-color: #1a1a1a;
  border-radius: 10px;
  color: #fff;
  padding: 15px;
  text-align: center;
`;

const PriceCard = styled.div`
  ${sharedCardStyles}

  & h2 {
    font-size: 1.5rem;
    color: #d1d5db;
  }

  & h3 {
    font-size: 0.875rem;
    color: #9ca3af;
  }
`;

const TimeCard = styled.div`
  ${sharedCardStyles}

  & h2 {
    font-size: 1rem;
    color: #d1d5db;
  }
`;

const LocationCard = styled.div`
  ${sharedCardStyles}

  & h2 {
    font-size: 1rem;
    color: #d1d5db;
  }
`;

return (
  <Container>
    <Card>
      <h3></h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2px",
        }}
      >
        <PriceCard>
          <div>
            <h2>10</h2>
            <h3>delivery cost</h3>
          </div>
        </PriceCard>
        <PriceCard>
          <div>
            <h3>Secs Left:</h3>
            <h2>30</h2>
          </div>
        </PriceCard>
        <TimeCard>
          <PriceCard>
            <div>
              <h3>Mins Left:</h3>
              <h2>30</h2>
            </div>
          </PriceCard>
          <PriceCard>
            <div>
              <h3>Secs Left:</h3>
              <h2>30</h2>
            </div>
          </PriceCard>
        </TimeCard>
      </div>
    </Card>
  </Container>
);
