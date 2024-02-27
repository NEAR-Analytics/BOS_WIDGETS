const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";
const USER = props.USER || {};
const TOKEN = props.TOKEN || "";
const Logout = props.Logout;

//Styles
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 64px;
  position: relative;
  align-items: stretch;
  flex-direction: column;
  color: rgb(229 229 229);
  background: rgb(23,23,23);
  @media (max-width: 510px) {
      padding: 30px;
  }
`;

const Card = styled.div`
    gap: 24px;
    display: flex;
    width: 100%;
    padding: 48px;
    border-radius: 8px;
    position: relative;
    flex-direction: column;
    background: rgb(38, 38, 38);
    @media (max-width: 620px) {
      padding: 15px;
      height: 100%;
      .menu {
        width: 74vw;
      }
    }  
`;

const Label = styled.label`
    font-size: 14px;
    margin-bottom: 4px;
`;

const Button = styled.button`
    color: #FFF;
    padding: 12px;
    border-radius: 6px;
    background-image: linear-gradient(to right, rgb(147, 51, 234), rgb(99, 102, 241));
`;

const NEAR_TOKEN = [
  {
    text: "1 $NEAR",
    value: "near1",
  },
  {
    text: "10 $NEAR",
    value: "near2",
  },
  {
    text: "100 $NEAR",
    value: "near3",
  },
  {
    text: "1000 $NEAR",
    value: "near4",
  },
  {
    text: "Default",
    value: "near0",
  },
];

const AGE_ACCOUNT = [
  {
    text: "1 Month",
    value: "age1",
  },
  {
    text: "6 Month",
    value: "age2",
  },
  {
    text: "1 Year",
    value: "age3",
  },
  {
    text: "2 Year",
    value: "age4",
  },
  {
    text: "Default",
    value: "age0",
  },
];

const changeOption = (key, value) => {
  State.update({
    ...state,
    [key]: value,
  });
};

return (
  <Wrapper>
    <Card>
      <div>
        <h5 className="m-0" style={{ fontSize: 18 }}>
          {`Custom Allowlist`}
        </h5>
      </div>
      <div>
        <Label>{`$NEAR token`}</Label>
        <Widget
          props={{
            noLabel: true,
            width: "40vw",
            options: NEAR_TOKEN,
            value: "near0",
            onChange: (val) => changeOption("near", val),
          }}
          src={`${Owner}/widget/Select`}
        />
      </div>
      <div>
        <Label>{`Age of the Account`}</Label>
        <Widget
          props={{
            noLabel: true,
            width: "40vw",
            options: AGE_ACCOUNT,
            value: "age0",
            onChange: (val) => changeOption("age", val),
          }}
          src={`${Owner}/widget/Select`}
        />
      </div>
      <Button
        className="btn"
        disabled={
          (type !== "edit" && state.selected === "0") || !state.description
        }
        onClick={handleNextStep}
      >
        Next Step
      </Button>
    </Card>
  </Wrapper>
);
