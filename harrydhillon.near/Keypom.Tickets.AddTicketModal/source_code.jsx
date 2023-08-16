State.init({ fieldVal: "" });
const Label = styled.p`
font-size: 16px;
 translate: 3px 8px;
font-style: normal;
font-weight: 500;
`;
const AddTicketModal = (
  <div style={{maxHeight:'80vh',overflowY:"auto"}}>
    <Widget
      props={{
        label: "Ticket Name *",
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
    <p style={{ fontWeight: "500", marginBottom: -10 }}>Description *</p>
    <Widget
      props={{
        label:
          "Let attendees know what this ticket has to offer, and how it differs from other tickets.",
        inputProps: {
          placeholder: "Add a description",
          required: true,
          value: state.ticketName,
          onChange: (e) => State.update({ ticketName: e.target.value }),
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
    <Label style={{ marginLeft: -5, fontWeight: "500" }}>
      Ticket sales valid through *
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
    <Widget
      src="harrydhillon.near/widget/Keypom.Components.Input"
      props={{
        label: "Pass valid through *",
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
    <p style={{ fontWeight: "500", marginBottom: -10 }}>Number of Tickets *</p>
    <Widget
      props={{
        label: "If blank, party can host infinite number of guests.",
        inputProps: {
          placeholder: "Number of tickets",
          required: true,
          value: state.ticketName,
          onChange: (e) => State.update({ ticketName: e.target.value }),
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
    <p style={{ fontWeight: "500", marginBottom: 0 }}>
      Price per ticket (NEAR) *
    </p>
    <p style={{ color: "gray" }}>
      Your receive 20 NEAR. Buyer pays 20.187 NEAR.
    </p>
     <p style={{ fontWeight: "500", marginBottom: 0 }}>
      Ticket Artwork
    </p>
    <Widget src="harrydhillon.near/widget/Keypom.Components.Imageupload" />
    <button
      onClick={() => {
        // props.onSave(state);
        // State.update({ fieldVal: "", hasBeenEditUpdated: false });
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
      Save Field
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
  </div>
);
return (
  <Widget
    src="harrydhillon.near/widget/Keypom.Components.Modal"
    props={{
      children: AddTicketModal,
      isOpen: props.isOpen,
      contentStyles: {
        style: {
          width: 600,
        },
      },
    }}
  />
);
