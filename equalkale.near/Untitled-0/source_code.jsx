const App = styled.div`
  --soft-blue: hsl(215, 51%, 70%);
  --cyan: hsl(178, 100%, 50%);

  --very-dark-blue-main: hsl(217, 54%, 11%);
  --very-dark-blue-card: hsl(216, 50%, 16%);
  --very-dark-blue-line: hsl(215, 32%, 27%);
  --white: hsl(0, 0%, 100%);

  font-size: 18px;
  font-family: 'Outfit', sans-serif;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--very-dark-blue-main);
`;

const InlineList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
  margin: 20px;
  padding: 20px;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  background-color: var(--very-dark-blue-card);
`;

const CardImg = styled.img`
  width: 100%;
  border-radius: 10px;

  opacity: 1;
  transition: opacity 0.25s ease-in-out;
  -moz-transition: opacity 0.25s ease-in-out;
  -webkit-transition: opacity 0.25s ease-in-out;
`;

const CardImgContainer = styled.div`
 background-image: url('images/icon-view.svg');
  background-repeat: no-repeat;
  background-position: center;
`;

const CardH1 = styled.h1`
font-size: 1.3rem;
  font-weight: 700;
  color: var(--white);
  text-align: left;
`;

const PollCards = (props) => {
  console.log(props);

  return (
    <Card>
      <CardImgContainer>
        <CardImg
          src={props.image}
          alt="Fancy equilibrium cube"
          width="198px"
          height="144px"
        />
      </CardImgContainer>

      <a href="#">
        <h1
          style={{
            fontSize: "1.3rem",
            fontWeight: "700",
            color: "var(--white)",
            textAlign: "left",
          }}
        >
          NEARCON 2023
        </h1>
      </a>

      <p
        style={{
          color: "var(--soft-blue)",
          lineHeight: "1.5rem",
          fontWeight: "300",
        }}
      >
        Our Equilibrium collection promotes balance and calm.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "block",
            alignItems: "center",
            gap: "5px",
            fontWeight: 700,
            color: "var(--cyan)",
          }}
        >
          <h6>Total NFTs</h6>
          <span>50</span>
        </div>

        <div
          style={{
            display: "block",
            alignItems: "center",
            gap: "5px",
            fontWeight: 700,
            color: "var(--soft-blue)",
            gap: "5px",
          }}
        >
          <h6>Time</h6>
          <span>5:00</span>
        </div>
      </div>
    </Card>
  );
};

return (
  <App>
    <InlineList>
      <PollCards image="https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fstore%252Fanthropocene.mintbase1.near%253Aprofile%3Falt%3Dmedia%26token%3De119d2c8-637b-48e2-9de3-ef73f13fa09b" />
      <PollCards image="https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fstore%252Fnearconminsta.mintbase1.near%253Aprofile%3Falt%3Dmedia%26token%3D99c42b64-ec70-43f0-8597-1d8b01f74fc8" />
      <PollCards image="https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fomni-live.appspot.com%2Fo%2Fstore%252Fmint.sharddog.near%253Aprofile%3Falt%3Dmedia%26token%3D10415030-16c9-4886-9266-d30cc626825f" />
      <PollCards image="https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=https://firebasestorage.googleapis.com/v0/b/omni-live.appspot.com/o/store%252Funipin.m.arkana.near%253Aprofile?alt=media&token=da23c184-b950-4364-a9bd-0c34a6c83689" />
    </InlineList>
  </App>
);
