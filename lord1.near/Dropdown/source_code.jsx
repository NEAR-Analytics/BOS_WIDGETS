return (
  <Widget
    src={`lord1.near/widget/select`}
    props={{
      label: props.label,
      placeholdercolor: props.placeholdercolor,
      inputbackgroundcolor: props.inputbackgroundcolor,
      inputcolor: props.inputcolor,
      labelcolor: props.labelcolor,
      noLabel: props.noLabel,
      placeholder: props.placeholder,
      options: props.options,
      value: props.dev,
      onChange: (dev) => props.update(dev),
      validate: () => {
        if (!props.dev) {
          props.setError("Please select one option");
        }

        if (!options.find(({ value }) => props.dev.value === value)) {
          props.setError("Please select a valid option");
        }
      },
      error: props.error,
    }}
  />
);
