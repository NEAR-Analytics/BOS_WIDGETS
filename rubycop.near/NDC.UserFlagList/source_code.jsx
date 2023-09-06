State.init({
  flagged: undefined,
  account: "",
  showResult: false,
  loading: false,
});

let flagged = Near.view("registry.i-am-human.near", "account_flagged", {
  account: state.account,
});

function checkAvailability() {
  State.update({ flagged });
}

const Container = styled.div`
  flex-direction: row;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  background: #fdfeff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  font-size: 14px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Row = styled.div`
  border-bottom: 1px solid #ececec;
  padding: 5px 7px;
  margin: 3px 0;
  border-radius: 5px;
  font-weight: ${(props) => (props.index < 10 ? "600" : "inherit")};
`;
const Header = styled.div`
  background: black;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const Status = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

return (
  <div className="d-flex flex-column justify-content-center w-100">
    <Header className="d-flex p-3 px-4 align-items-center rounded gap-2">
      <img
        height="30px"
        src="https://pbs.twimg.com/profile_images/1622941553839816707/nmf3MWw1_400x400.jpg"
      />
      <span>User status</span>
    </Header>
    <Container className="d-flex justify-content-center mt-3 mb-3 w-100">
      <Section className="d-flex flex-column gap-2 align-items-center">
        <input
          placeholder="Input your wallet"
          value={state.account}
          onChange={(e) => State.update({ account: e.target.value })}
        />
        <Widget
          src={"nearui.near/widget/Input.Button"}
          props={{
            children: "Check",
            className: "bg-primary text-white w-100 mt-2",
            onClick: checkAvailability,
          }}
        />
        {state.flagged !== undefined && (
          <Status
            className={`d-flex justify-content-center align-items-center p-2 mt-3 rounded-circle bg-${
              state.flagged === "Blacklisted"
                ? "black text-danger"
                : state.flagged === "Verified"
                ? "success text-white"
                : "secondary text-white"
            }`}
          >
            <div className="text-center">
              You are <br />
              {state.flagged ?? "Greylisted"}
            </div>
          </Status>
        )}
      </Section>
    </Container>
  </div>
);
