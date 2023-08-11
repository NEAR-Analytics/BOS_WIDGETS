const FormBackground = styled.div`
background-color:white;
padding:10px;
padding-top:30px;
margin-top:10px;
border-radius:10px;
`;
State.init({
  name: "",
  location: "",
  description: "",
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
              label: "Event name*",
              inputProps: {
                placeholder: "Add the name of your event",
                value: state.name,
                onChange: (e) => State.update({ name: e.target.value }),
              },
            }}
          />
          <Widget
            src="harrydhillon.near/widget/Keypom.Input"
            props={{
              label: "Event description",
              inputProps: {
                placeholder: "Add a description to your event",
                value: state.description,
                onChange: (e) => State.update({ description: e.target.value }),
              },
            }}
          />

          <Widget
            src="harrydhillon.near/widget/Keypom.Input"
            props={{
              label: "Event location",
              inputProps: {
                placeholder: "Add a location or address to your event",
                value: state.location,
                onChange: (e) => State.update({ location: e.target.value }),
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
          <Label>Event artwork</Label>
          <p style={{ fontSize: 12, color: "gray" }}>
            Customize the artwork that appears in the header of the event page.
          </p>
          <Widget src="harrydhillon.near/widget/Keypom.Imageupload" />
        </div>
        <div style={{ padding: 10 }}>
          {console.log(state)}
          <Widget
            props={{ ...state }}
            src="harrydhillon.near/widget/Keypom.Eventview"
          />
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
