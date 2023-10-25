const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const Card = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 10px 10px 30px rgba(120, 100, 1300, 0.2);
  transition: transform 0.2s ease-in-out;

  /* Zoom out on hover */
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
    transform: scale(0.95);
  }
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-top: 0;
`;

const CardDescription = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

const CardSubmissionCount = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const CardStatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.isEnded ? "red" : "green")};
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CardStatus = styled.div`
  color: red;
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CardButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 80px;
  
`;

const Summary = styled.div`
  margin-bottom: 20px;
`;

const contests = Near.view("cdao-beta.genadrop.near", "get_contests");

State.init({ contests });

const isActive = (date) => {
  let dt = new Date(date * 1000);
  console.log("opera mini v2", date, dt < Date.now());
  return dt > Date.now();
};

return (
  <div>
    <h1>Contest Summary</h1>
    <Summary>
      <p>Total contests: {state.contests.length}</p>
      <p>
        Active contests{" "}
        <span style={{ color: "green" }}>
          (
          {state.contests &&
            state.contests.filter((contest) =>
              isActive(contest[1].voting_end_time)
            ).length}
          )
        </span>
      </p>
      <p>
        Ended contests{" "}
        <span style={{ color: "red" }}>
          (
          {state.contests &&
            state.contests.filter((x) => !isActive(x[1].voting_end_time))
              .length}
          )
        </span>
      </p>
    </Summary>
    <CardContainer>
      {state.contests &&
        state.contests.map((contest) => (
          <Card key={contest[0]}>
            <CardStatusDot isEnded={!isActive(contest[1].voting_end_time)} />
            <CardTitle>{contest[1].title}</CardTitle>
            <CardSubmissionCount>
              Submissions: {contest[1].submissions}
            </CardSubmissionCount>
            {!isActive(contest[1].voting_end_time) ? (
              <CardStatus></CardStatus>
            ) : (
              ""
            )}
            <CardButton>View</CardButton>
          </Card>
        ))}
    </CardContainer>
  </div>
);
