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
  isReadDataFromLocal: false,
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

const CheckBoxLabelStyling = styled.div`
.label{
color:gray !important;
font-size:13px;
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

const setInput = (key, value) => {
  const getValue = props?.getStorage?.("formValues");
  if (getValue === undefined) {
    const values = { [key]: value };
    props?.setStorage?.(`formValues`, JSON.stringify(values));
  } else {
    const parsedJson = JSON.parse(getValue);
    const newValuesToSet = { ...parsedJson, [key]: value };
    props?.setStorage?.(`formValues`, JSON.stringify(newValuesToSet));
  }
  State.update({ [key]: value });
};

if (!state.isReadDataFromLocal) {
  const getValue = props?.getStorage?.("formValues");
  if (getValue) {
    State.update({ ...JSON.parse(getValue), isReadDataFromLocal: true });
  } else {
    State.update({ isReadDataFromLocal: true });
  }
}

const showFormError = (key, label) =>
  state.error[key] ? (
    <p style={{ fontSize: 14, color: "red", marginTop: -3 }}>
      {label} is required
    </p>
  ) : (
    <></>
  );

const executeValidation = () => {
  const allErrors = {};
  if (!state.eventName) {
    allErrors.eventName = true;
  }
  if (!state.description) {
    allErrors.description = true;
  }
  if (!state.location) {
    allErrors.location = true;
  }
  if (!state.time) {
    allErrors.time = true;
  }
  if (state.isSingleDateEvent) {
    if (!state.from) {
      allErrors.from = true;
    }
  } else {
    if (!state.from) {
      allErrors.from = true;
    }
    if (!state.to) {
      allErrors.to = true;
    }
  }
  State.update({ error: allErrors });
  return allErrors;
};

if (props.validationMode) {
  props.nextStep(Object.keys(executeValidation()).length === 0);
}

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
                onChange: (e) => {
                  setInput("eventName", e.target.value);
                },
              },
            }}
          />
          {showFormError("eventName", "Event Name")}
          <Widget
            src="harrydhillon.near/widget/Keypom.Components.Input"
            props={{
              label: "Event description*",
              inputProps: {
                placeholder: "Add a description to your event",
                value: state.description,
                onChange: (e) => setInput("description", e.target.value),
              },
            }}
          />
          {showFormError("description", "Event Description")}
          <Widget
            src="harrydhillon.near/widget/Keypom.Components.Input"
            props={{
              label: "Event location*",
              inputProps: {
                placeholder: "Add a location or address to your event",
                value: state.location,
                onChange: (e) => setInput("location", e.target.value),
              },
            }}
          />
          {showFormError("location", "Event location")}
          <Widget
            src="harrydhillon.near/widget/Keypom.Components.Input"
            props={{
              label: "Event Time",
              inputProps: {
                placeholder: "Select a date range",
                value: state.to,
                type: "time",
                onChange: (e) => setInput("time", e.target.value),
              },
            }}
          />
          {showFormError("time", "Event Time")}
          <Label style={{ marginLeft: -5, fontWeight: "bold" }}>
            Event dates*
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
                    value: state.from,
                    type: "date",
                    onChange: (e) => setInput("from", e.target.value),
                  },
                }}
              />
              {showFormError("date", "Event date")}
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
                      value: state.from,
                      type: "date",
                      onChange: (e) => setInput("from", e.target.value),
                    },
                  }}
                />
                {showFormError("from", "Event Date From")}
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
                    value: state.to,
                    type: "date",
                    onChange: (e) => setInput("to", e.target.value),
                  },
                }}
              />
              {showFormError("to", "Event Date To")}
            </>
          )}
          <div style={{ marginLeft: -5 }}>
            <CheckBoxLabelStyling>
              <Widget
                src="nui.sking.near/widget/Input.Checkbox"
                props={{
                  label: "My event is a single day event",
                  checked: state.isSingleDateEvent,
                  onChange: () =>
                    State.update({
                      isSingleDateEvent: !state.isSingleDateEvent,
                    }),
                }}
              />
            </CheckBoxLabelStyling>
          </div>
          <Label style={{ fontWeight: "bold", marginTop: 10 }}>
            Event artwork
          </Label>
          <p style={{ fontSize: 12, color: "gray" }}>
            Customize the artwork that appears in the header of the event page.
          </p>
          <Widget
            props={{
              setImageState: (props) => {
                setInput("image", props);
              },
              imageState: state.image,
              removeImage: () => {
                setInput("image", undefined);
              },
            }}
            src="harrydhillon.near/widget/Keypom.Components.Imageupload"
          />
          {showFormError("image", "Event Artwork")}
        </div>
        <div style={{ padding: 10 }}>
          <Widget
            props={{ ...state, date: state.from }}
            src="harrydhillon.near/widget/Keypom.EventInfo.Eventview"
          />
        </div>
      </Grid>
    </>
  );
};

return formContent();
