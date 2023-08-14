const FormBackground = styled.div`
background-color:white;
padding:10px;
padding-top:30px;
margin-top:40px;
margin-bottom:60px;
border-radius:10px;
  border: 2px solid #B6E8F7;
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
      <Grid>
        <div style={{ padding: 10 }}>
          <Widget
            src="harrydhillon.near/widget/Keypom.Components.Input"
            props={{
              label: "Event name*",
              inputProps: {
                placeholder: "Add the name of your event",
                value: state.eventName,
                onChange: (e) => State.update({ eventName: e.target.value }),
              },
            }}
          />
          <Widget
            src="harrydhillon.near/widget/Keypom.Components.Input"
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
            src="harrydhillon.near/widget/Keypom.Components.Input"
            props={{
              label: "Event location",
              inputProps: {
                placeholder: "Add a location or address to your event",
                value: state.location,
                onChange: (e) => State.update({ location: e.target.value }),
              },
            }}
          />
          <Label style={{ marginLeft: -5, fontWeight: "bold" }}>
            Event dates *
          </Label>
          <p style={{ fontSize: 12, color: "gray", marginTop: -5 }}>
            {state?.isSingleDateEvent
              ? " Please mention the date of your event"
              : " Please mention the date range of your event"}
          </p>
          {state?.isSingleDateEvent ? (
            <>
              <Widget
                src="harrydhillon.near/widget/Keypom.Components.Input"
                props={{
                  label: "Event date",
                  inputProps: {
                    value: state.date,
                    type: "date",
                    onChange: (e) => State.update({ from: e.target.value }),
                  },
                }}
              />
            </>
          ) : (
            <>
              <div style={{ marginTop: -10 }}>
                <Widget
                  src="harrydhillon.near/widget/Keypom.Components.Input"
                  props={{
                    label: "From",
                    labelProps: {
                      style: {
                        fontWeight: "500",
                      },
                    },
                    inputProps: {
                      placeholder: "Select a date range",
                      value: state.date,
                      type: "date",
                      onChange: (e) => State.update({ from: e.target.value }),
                    },
                  }}
                />
              </div>
              <Widget
                src="harrydhillon.near/widget/Keypom.Components.Input"
                props={{
                  label: "To",
                  labelProps: {
                    style: {
                      fontWeight: "500",
                    },
                  },
                  inputProps: {
                    placeholder: "Select a date range",
                    value: state.date,
                    type: "date",
                    onChange: (e) => State.update({ to: e.target.value }),
                  },
                }}
              />
            </>
          )}
          <div style={{ marginLeft: -5 }}>
            <Widget
              src="nui.sking.near/widget/Input.Checkbox"
              props={{
                label: "My event is a single day event",
                checked: state.isSingleDateEvent,
                onChange: () =>
                  State.update({ isSingleDateEvent: !state.isSingleDateEvent }),
              }}
            />
          </div>
          <Label>Event artwork</Label>
          <p style={{ fontSize: 12, color: "gray" }}>
            Customize the artwork that appears in the header of the event page.
          </p>
          <Widget src="harrydhillon.near/widget/Keypom.Components.Imageupload" />
        </div>
        <div style={{ padding: 10 }}>
          {console.log(state)}
          <Widget
            props={{ ...state, date: state.from }}
            src="harrydhillon.near/widget/Keypom.Eventview"
          />
        </div>
      </Grid>
      <button>Submit</button>
    </>
  );
};

return formContent();
