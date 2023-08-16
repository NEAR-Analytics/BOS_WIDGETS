State.init({ fieldVal: "" });

const AddCustomFieldModalJsx = (
  <>
    <p style={{ fontWeight: "500", marginBottom: -5 }}>Field</p>
    <Widget
      props={{
        label: "Add a question you'd like attendees to fill out for the event.",
        inputProps: {
          placeholder: "Enter a question",
          required: true,
          value: state.fieldVal,
          onChange: (e) => State.update({ fieldVal: e.target.value }),
        },
        labelProps: {
          style: {
            fontWeight: "400",
            fontSize: 13,
          },
        },
      }}
      src="harrydhillon.near/widget/Keypom.Components.Input"
    />
    <button
      onClick={() => {
        props.onSave(state);
        State.update({ fieldVal: "", hasBeenEditUpdated: false });
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
    {props?.editMode?"Update Field":"Add Field"}
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
  </>
);

if (
  props.editMode &&
  props.isOpen &&
  state.fieldVal === "" &&
  !state.hasBeenEditUpdated
) {
  State.update({ fieldVal: props.editVal, hasBeenEditUpdated: true });
}

return (
  <Widget
    src="harrydhillon.near/widget/Keypom.Components.Modal"
    props={{
      children: AddCustomFieldModalJsx,
      isOpen: props.isOpen,
      contentStyles: {
        style: {
          width: 400,
        },
      },
    }}
  />
);
