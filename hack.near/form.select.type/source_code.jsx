/** @type {{text:string;value:string}[]} */
const options = [
  { text: "art", value: "art" },
  { text: "gov", value: "gov" },
  { text: "edu", value: "edu" },
  { text: "dev", value: "dev" },
  { text: "sci", value: "sci" },
];

/**
 * @param {string} value
 *
 * @returns {{text:string;value:string}}
 * */
const mapValueToOption = (value) => {
  const option = options.find((option) => option.value === value);
  return (
    option ?? {
      text: value.charAt(0).toUpperCase() + value.substring(1),
      value,
    }
  );
};

/**
 * @param {{text:string;value?:string;customOption?:boolean;}} option
 * @returns {string}
 * */
const mapOptionToValue = (option) => {
  return option.customOption ? option.text.toLowerCase() : option.value;
};

return (
  <Widget
    src="hack.near/widget/form.select"
    props={{
      label: "type *",
      noLabel: props.noLabel,
      placeholder: "community",
      options,
      labelKey: "text",
      value: props.productType.map(mapValueToOption),
      onChange: (productType) =>
        props.update(productType.map(mapOptionToValue)),
      validate: () => {
        if (!props.productType) {
          props.setError("please choose a type");
        }
        if (
          !props.productType.every((productType) =>
            options.find(({ value }) => productType === value)
          )
        ) {
          props.setError("please choose a valid type");
        }
      },
      error: props.error,
    }}
  />
);
