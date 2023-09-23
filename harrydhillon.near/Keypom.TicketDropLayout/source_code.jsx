const FormBackground = styled.div`
background-color:white;
padding:10px;
padding-top:30px;
margin-top:40px;
margin-bottom:100px;
border-radius:10px;
  border: 2px solid #B6E8F7;
`;

const RadiantBackground = styled.div`
    background: rgb(220,244,251);
    min-height:100vh;
    padding:10px;
    padding-left:50px;
    padding-right:50px; 
    background: linear-gradient(0deg, rgba(220,244,251,1) 0%, rgba(251,254,255,1) 95%, rgba(255,255,255,1) 100%);
`;

State.init({
  index: 0,
});

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;  // By default, 1 item per row
    gap: 16px;  // Gap between rows and columns

    @media (min-width: 1000px) {
        grid-template-columns: 1fr 1fr;  // 2 items per row if width is greater than 1000px
    }
`;
const Label = styled.p`
  font-size: 16px;
  translate: 3px 8px;
  font-style: normal;
  font-weight: 500;
`;

const BottomStyledContainer = styled.div`
  background-color: white;
  width: 100%;
  padding: 10px;
  padding-left: 25px;
  position: absolute;
  padding-right: 25px;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  left: 0;
`;

const BackButton = styled.button`
  background-color:transparent;
  border-width:0px;
  color:black;
  padding-left:10px;
  border-radius:5px;
  box-shadow: 10px 10px 38px -3px rgba(0,0,0,0.09);
  -webkit-box-shadow: 10px 10px 38px -3px rgba(0,0,0,0.09);
  -moz-box-shadow: 10px 10px 38px -3px rgba(0,0,0,0.09);
  padding-right:10px;
  opacity:${(props) => (props.disabled ? 0.5 : 1)};
`;

const AllSteps = [
  {
    label: "Event Info",
    active: state.index === 0,
  },
  {
    label: "Collect Info",
    active: state.index === 1,
  },
  {
    label: "Tickets",
    active: state.index === 2,
  },
  {
    label: "Review",
    active: state.index === 3,
  },
];

const componentsToRender = [
  <Widget
    props={{
      validationMode: state.validationMode,
      setStorage: (key, val) => Storage.set(key, val),
      getStorage: (key, val) => Storage.get(key, val),
      nextStep: (isValid) => {
        if (isValid) {
          State.update({ validationMode: false, index: state.index + 1 });
        } else {
          State.update({ validationMode: false });
        }
      },
    }}
    src="harrydhillon.near/widget/Keypom.EventInfo.Form"
  />,
  <Widget
    props={{
      setStorage: (key, val) => Storage.set(key, val),
      getStorage: (key, val) => Storage.get(key, val),
    }}
    src="harrydhillon.near/widget/Keypom.CollectInfo.Index"
  />,
  <Widget
    props={{
      setStorage: (key, val) => Storage.set(key, val),
      getStorage: (key, val) => Storage.get(key, val),
    }}
    src="harrydhillon.near/widget/Keypom.Tickets.index"
  />,
  <Widget
    props={{
      setStorage: (key, val) => Storage.set(key, val),
      getStorage: (key, val) => Storage.get(key, val),
      tickets: Storage.get("tickets") ? JSON.parse(Storage.get("tickets")) : [],
      eventData: Storage.get("formValues")
        ? JSON.parse(Storage.get("formValues"))
        : {},
    }}
    src="harrydhillon.near/widget/Keypom.Review.index"
  />,
];

const formContent = () => {
  return (
    <>
      <p style={{ fontSize: 12, letterSpacing: 0.5, marginBottom: 0 }}>
        <span style={{ color: "gray" }}>All Drops</span> {">"} New Ticket Drop
      </p>
      <p style={{ fontSize: 36, fontWeight: "500" }}>
        Enter the details for your new Ticket Drop
      </p>
      <FormBackground>
        <div
          style={{
            width: "fit-content",
            margin: "auto",
            transform: "scale(0.8)",
            marginTop: -65,
          }}
        >
          <Widget src="harrydhillon.near/widget/Keypom.Components.TicketLogo" />
        </div>
        <div
          style={{
            margin: "auto",
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            justifyContent: "space-evently",
          }}
        >
          {AllSteps.map((item, idx) => (
            <div
              style={{
                marginRight: 20,
                backgroundColor: "transparent",
                color: "black",
                borderWidth: 0,
              }}
              onClick={() => {
                // State.update({ index: idx });
              }}
            >
              <Widget
                src="harrydhillon.near/widget/Keypom.Components.StepLabel"
                props={{
                  stepNumber: idx + 1,
                  label: item.label,
                  active: item?.active,
                }}
              />
            </div>
          ))}
        </div>
        {componentsToRender[state.index]}
      </FormBackground>
      <BottomStyledContainer>
        <BackButton
          disabled={state.index === 0}
          onClick={() => {
            State.update({ index: state.index - 1 });
          }}
        >
          Back
        </BackButton>
        <button
          disabled={state.index === 3}
          onClick={() => {
            if (state.index === 0) {
              State.update({ validationMode: true });
            } else {
              State.update({ index: state.index + 1 });
            }
          }}
          style={{ backgroundColor: "black", borderWidth: 0 }}
        >
          {state.index !== 3 ? `Next` : `Create Event for X NEAR`}
        </button>
      </BottomStyledContainer>
    </>
  );
};

return <RadiantBackground>{formContent()}</RadiantBackground>;
