const ownerId = "discover.near";

const options = [
  { text: "Open source", value: "open-source" },
  { text: "Partial", value: "partial" },
  { text: "Proprietery", value: "proprietery" },
];

return (
  <Widget
    src={`${ownerId}/widget/InputsSelect`}
    props={{
      label: "What is your projects distribution model?",
      noLabel: props.noLabel,
      placeholder: "Open source",
      options,
      value: options.find(({ value }) => value === props.distribution),
      onChange: (distribution) => props.update(distribution),
      validate: () => {
        if (!props.distribution) {
          props.setError("Please select a valid option");
        }

        if (!options.find(({ value }) => props.distribution.value === value)) {
          props.setError("Please select a valid option");
        }
      },
      error: props.error,
    }}
  />
);
