const widgetProvider = props.widgetProvider;
const { checkboxes, label, onChange, selectedBoxes } = props;

State.init({
  checkboxes,
  title,
  selectedBoxes,
});

State.update({ selectedBoxes });


const handleChange = (checked, value) => {
  if (checked) {
    onChange([...state.selectedBoxes, value]);
  } else {
    const selectedList = state.selectedBoxes.filter((b) => b != value);
    onChange(selectedList);
  }
};

return (
  <div>
    <p>{label}</p>
    {state.checkboxes.map((c) => {
      return (
        <Widget
          src={`${widgetProvider}/widget/NDC-checkbox`}
          props={{
            value: c.value,
            onChange: handleChange,
            label: c.label,
            checked: state.selectedBoxes.includes(c.value),
          }}
        />
      );
    })}
  </div>
);
