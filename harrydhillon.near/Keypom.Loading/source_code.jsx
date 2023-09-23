const FormBackground = styled.div`
background-color:white;
padding:10px;
padding-top:30px;
margin-top:40px;
margin-bottom:100px;
border-radius:10px;
width:90%;
text-align:center;
  border: 2px solid #B6E8F7;
`;

const RadiantBackground = styled.div`
    background: rgb(220,244,251);
    min-height:100vh;
    padding:10px;
    display:flex;
    justify-content:center;
    align-items:center;
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

State.init({
  width: props.width || "20px",
  height: props.height || "20px",
});

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const dark = {
  bg: "#28282b",
  color: "#e6eaee",
  border: "#30C9F3",
};

const light = {
  bg: "#e3e8ef",
  color: "#4c5566",
  border: "#30C9F3",
};

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  :before {
    content: "";
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid ${useTheme(light.color, dark.color)};
    border-top-color: ${useTheme(light.border, dark.border)};
    animation: spinner 0.6s linear infinite;
  }
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
        <h3>Creating Ticket</h3>
        <Spinner />
        <p style={{ marginBottom: 0, marginTop: 10 }}>1 of 6 tickets</p>
      </FormBackground>
    </>
  );
};

return <RadiantBackground>{formContent()}</RadiantBackground>;
