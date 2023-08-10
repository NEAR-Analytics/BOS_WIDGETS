const FormBackground = styled.div`
background-color:white;
padding:10px;
padding-top:30px;
margin-top:10px;
border-radius:10px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;  // By default, 1 item per row
    gap: 16px;  // Gap between rows and columns

    @media (min-width: 1000px) {
        grid-template-columns: 1fr 1fr;  // 2 items per row if width is greater than 1000px
    }
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
    <FormBackground>
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
      <Grid>
        <div style={{ padding: 10 }}>
          <Widget
            src="harrydhillon.near/widget/Keypom.Input"
            props={{
              label: "Event Name*",
              inputProps: {
                placeholder: "Add the name of your event",
              },
            }}
          />
          <Widget
            src="harrydhillon.near/widget/Keypom.Input"
            props={{
              label: "Event description",
              inputProps: {
                placeholder: "Add a description to your event",
              },
            }}
          />

          <Widget
            src="harrydhillon.near/widget/Keypom.Input"
            props={{
              label: "Event Location",
              inputProps: {
                placeholder: "Add a location or address to your event",
              },
            }}
          />
          <Widget
            src="harrydhillon.near/widget/Keypom.Input"
            props={{
              label: "Date",
              inputProps: {
                placeholder: "Select a date range",
              },
            }}
          />
        </div>
        <div style={{ padding: 10 }}>
          <Widget src="harrydhillon.near/widget/Keypom.Eventview" />
        </div>
      </Grid>
    </FormBackground>
  );
};

return (
  <Widget
    src="harrydhillon.near/widget/Keypom.TicketDropLayout"
    props={{
      content: formContent,
    }}
  />
);
