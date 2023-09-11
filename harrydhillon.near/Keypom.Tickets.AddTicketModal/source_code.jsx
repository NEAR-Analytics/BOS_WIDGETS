State.init({ selected: 20 });
const Label = styled.p`
font-size: 16px;
 translate: 3px 8px;
font-style: normal;
font-weight: 500;
`;

const NearAmountBackground = styled.button`
  color:${(props) => (props.selected ? "#00A7E4" : "#475569")};
  padding: 5px 20px;
  margin-right:10px;
  border-radius:10px;
  background-color:  ${(props) => (props.selected ? "#EFFAFD" : "#F8FAFC")};
  border:${(props) => (props.selected ? "2px solid #00A7E4 " : "0px")};
`;

const IconButton = styled.button`
  background-color:transparent;
  border-width:0px;
  position:absolute;
  right:0px;
`;

const nearAmount = ["Free", 20, 50, 100, 200];

const firstTicket = !!props.firstTicket;

const nearLabel = (amount, selected) => (
  <NearAmountBackground
    onClick={() => {
      State.update({ selected: amount });
    }}
    selected={selected}
  >
    {amount}
  </NearAmountBackground>
);

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
  if (!state.ticketName) {
    allErrors.ticketName = true;
  }
  if (!state.description) {
    allErrors.description = true;
  }
  if (!state.passValid) {
    allErrors.passValid = true;
  }
  if (!state.from) {
    allErrors.from = true;
  }
  if (!state.to) {
    allErrors.to = true;
  }
  if (state.selected === "Custom Amount") {
    if (!state.nearAmountForTicket) {
      allErrors.nearAmountForTicket = true;
    }
  }
  State.update({ error: allErrors });
  return allErrors;
};

const TopLevelContainerDiv = styled.div`
    -ms-overflow-style: none; 
    scrollbar-width: none;
    ::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
    overflow-x:hidden;
    overflow-y:auto;
    max-height: 80vh;
    position: relative;
`;

const CheckBoxLabelStyling = styled.div`
.label{
color:gray !important;
font-size:13px;
}
`;

const AddTicketModal = (
  <TopLevelContainerDiv>
    <IconButton title="Cancel" onClick={props.onClose}>
      X
    </IconButton>
    <Widget
      props={{
        label: "Ticket Name*",
        inputProps: {
          placeholder: "Day Pass",
          required: true,
          value: state.ticketName,
          onChange: (e) => State.update({ ticketName: e.target.value }),
        },
        labelProps: {
          style: {
            fontWeight: "500",
          },
        },
      }}
      src="harrydhillon.near/widget/Keypom.Components.Input"
    />
    {showFormError("ticketName", "Ticket Name")}
    <p style={{ fontWeight: "500", marginBottom: -10 }}>Description*</p>
    <Widget
      props={{
        label:
          "Let attendees know what this ticket has to offer, and how it differs from other tickets.",
        inputProps: {
          placeholder: "Add a description",
          required: true,
          value: state.description,
          style: {
            minHeight: "130px",
          },
          onChange: (e) => State.update({ description: e.target.value }),
        },
        isTextArea: true,
        labelProps: {
          style: {
            fontWeight: "400",
            fontSize: 14,
            color: "gray",
          },
        },
      }}
      src="harrydhillon.near/widget/Keypom.Components.Input"
    />
    {showFormError("description", "Description")}
    <Label style={{ marginLeft: -5, fontWeight: "500" }}>
      Ticket sales valid through*
    </Label>
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
            onChange: (e) => State.update({ from: e.target.value }),
          },
        }}
      />
      {showFormError("from", "From")}
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
          onChange: (e) => State.update({ to: e.target.value }),
        },
      }}
    />
    {showFormError("to", "To")}
    <Widget
      src="harrydhillon.near/widget/Keypom.Components.Input"
      props={{
        label: "Pass valid through*",
        labelProps: {
          style: {
            fontWeight: "500",
          },
        },
        inputProps: {
          placeholder: "Select a date range",
          value: state.passValid,
          type: "date",
          onChange: (e) => State.update({ passValid: e.target.value }),
        },
      }}
    />
    {showFormError("passValid", "Pass valid through")}
    {firstTicket && (
      <CheckBoxLabelStyling>
        <Widget
          src="nui.sking.near/widget/Input.Checkbox"
          props={{
            label: `Same information as ${props.firstTicket.ticketName}`,
            checked: !!state.isDateInfoChecked,
            onChange: () => {
              if (state.isDateInfoChecked) {
                State.update({ isDateInfoChecked: false });
              } else {
                State.update({
                  isDateInfoChecked: true,
                  passValid: props.firstTicket.passValid,
                  to: props.firstTicket.to,
                  from: props.firstTicket.from,
                });
              }
            },
          }}
        />
      </CheckBoxLabelStyling>
    )}
    <p style={{ fontWeight: "500", marginBottom: -10 }}>Number of Tickets*</p>
    <Widget
      props={{
        label: "If blank, party can host infinite number of guests.",
        inputProps: {
          placeholder: "Number of tickets",
          required: true,
          type: "number",
          value: state.numberOfTickets,
          onChange: (e) => State.update({ numberOfTickets: e.target.value }),
        },
        labelProps: {
          style: {
            fontWeight: "400",
            fontSize: 14,
            color: "gray",
          },
        },
      }}
      src="harrydhillon.near/widget/Keypom.Components.Input"
    />
    <p style={{ fontWeight: "500", marginBottom: 5 }}>
      Price per ticket (NEAR)*
    </p>
    <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
      {nearAmount.map((item) => (
        <div>
          {nearLabel(
            item,
            state.selected === item || parseInt(item) === state.selected
          )}
        </div>
      ))}
      {nearLabel("Custom Amount", state.selected === "Custom Amount")}
    </div>
    {state.selected === "Free" && <p></p>}
    {state.selected === "Custom Amount" && (
      <>
        <Widget
          props={{
            label: "Custom Near Amount",
            inputProps: {
              placeholder:
                "Please enter the near amount you want to sell your tickets for",
              required: true,
              value: state.nearAmountForTicket,
              type: "number",
              onChange: (e) =>
                State.update({ nearAmountForTicket: e.target.value }),
            },
            labelProps: {
              style: {
                fontWeight: "500",
              },
            },
          }}
          src="harrydhillon.near/widget/Keypom.Components.Input"
        />
        {showFormError("nearAmountForTicket", "Custom Near Amount")}
      </>
    )}
    {state.selected === "Free" ? (
      <p style={{ color: "gray" }}>
        Ticket is free, buyer pays the 0.187 NEAR minting fee
      </p>
    ) : (
      <p style={{ color: "gray" }}>
        You receive{" "}
        {state.selected === "Custom Amount"
          ? state.nearAmountForTicket
          : state.selected}{" "}
        NEAR. Buyer pays{" "}
        {state.selected === "Custom Amount"
          ? state.nearAmountForTicket
          : state.selected}
        .187 NEAR.
      </p>
    )}

    <p style={{ fontWeight: "500", marginBottom: 0 }}>Ticket Artwork</p>
    <Widget
      props={{
        setImageState: (props) => {
          State.update({ image: props });
        },
        imageState: state.image,
      }}
      src="harrydhillon.near/widget/Keypom.Components.Imageupload"
    />
    {showFormError("image", "Ticket artwork")}
    <button
      onClick={() => {
        const isValid = Object.keys(executeValidation()).length === 0;
        if (isValid) {
          props.onSave({
            ...state,
            ticketPricing:
              state.selected === "Custom Amount"
                ? state.nearAmountForTicket
                : state.selected,
          });
        }
      }}
      style={{
        width: "100%",
        backgroundColor: "black",
        fontSize: 14,
        borderRadius: 10,
        borderWidth: 0,
        marginTop: 10,
      }}
    >
      {props.editMode ? "Update" : "Create"}
    </button>
    <button
      onClick={props.onClose}
      style={{
        width: "100%",
        backgroundColor: "white",
        fontSize: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "lightgray",
        marginTop: 5,
        color: "black",
      }}
    >
      Cancel
    </button>
  </TopLevelContainerDiv>
);

if (props.editMode && props.isOpen && !state.hasBeenEditUpdated) {
  State.update({ ...props.editVal, hasBeenEditUpdated: true });
}

return (
  <Widget
    src="harrydhillon.near/widget/Keypom.Components.Modal"
    props={{
      children: AddTicketModal,
      isOpen: props.isOpen,
      contentStyles: {
        style: {
          width: 550,
        },
      },
    }}
  />
);
