const submissionDeadline = new Date("2023-12-31T23:59:59");

// Calculate the time remaining until the submission deadline
function getTimeRemaining() {
  const now = new Date();
  const difference = submissionDeadline - now;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

// State for the countdown timer
const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

// Update the countdown timer every second
useEffect(() => {
  const intervalId = setInterval(() => {
    setTimeRemaining(getTimeRemaining());
  }, 1000);

  // Clear the interval when the component is unmounted
  return () => clearInterval(intervalId);
}, []);
const sharedCardStyles = `
  background: linear-gradient(to right, #4b5563, #1f2937);
  flex: auto;
  width: 42%;
  height: 42%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.1);
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
  background:transparent;
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
const { days, hours, minutes, seconds } = getTimeRemaining();
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
            <h3>Days Left :</h3>
            <h2>{days}</h2>
          </div>
        </PriceCard>
        <PriceCard>
          <div>
            <h3>Hours Left:</h3>
            <h2>{hours}</h2>
          </div>
        </PriceCard>

        <LocationCard>
          <PriceCard>
            <div>
              <h3>Mins Left:</h3>
              <h2>{minutes}</h2>
            </div>
          </PriceCard>
          <PriceCard>
            <div>
              <h3>Secs Left:</h3>
              <h2>{seconds}</h2>
            </div>
          </PriceCard>
        </LocationCard>
      </div>
    </Card>
  </Container>
);
