const FormBackground = styled.div`
background-color:white;
padding:10px;
padding-top:30px;
margin-top:40px;
margin-bottom:60px;
border-radius:10px;
  border: 2px solid #B6E8F7;
`;

const RadiantBackground = styled.div`
    background: rgb(220,244,251);
    min-height:100vh;
    padding:10px;
    background: linear-gradient(0deg, rgba(220,244,251,1) 0%, rgba(251,254,255,1) 95%, rgba(255,255,255,1) 100%);
`;

State.init({
  eventName: "",
  location: "",
  description: "",
  date: null,
  isSingleDateEvent: false,
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

const AllSteps = [
  {
    label: "Event Info",
    active: true,
  },
  {
    label: "Collect Info",
  },
  {
    label: "Tickets",
  },
  {
    label: "Review",
  },
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
          <Widget src="harrydhillon.near/widget/Keypom.TicketLogo" />
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
            <div style={{ marginRight: 20 }}>
              <Widget
                src="harrydhillon.near/widget/Keypom.StepLabel"
                props={{
                  stepNumber: idx + 1,
                  label: item.label,
                  active: item?.active,
                }}
              />
            </div>
          ))}
        </div>
        {props?.content && props.content()}
      </FormBackground>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "white",
          height: 100,
          width: "100vw",
        }}
      ></div>
    </>
  );
};

return <RadiantBackground>{formContent()}</RadiantBackground>;
