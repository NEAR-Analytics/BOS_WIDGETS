// Styles
const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: #345AD5; 
`;
const Container = styled.div`
  position: relative;
  margin-top: 5px;
  width: 100%;
  padding: 10px 40px;
  height: auto;
  min-height: 80px;
  overflow: hidden;
`;
const Field = styled.div`
  margin-top: 10px;
`;
const ErrorMessage = styled.div`
  margin-top: 8px;
  color: red;
  font-size: 12px;
`;
const SuccessMessage = styled.div`
  margin-top: 8px;
  color: green;
  font-size: 12px;
`;

// States
State.init({ form: null });
State.init({ errorMsg: "", successMsg: "" });
State.init({ initialized: false });

/*
 * Handle input change
 */
const onInputChange = ({ target }) => {
  const fieldName = target.dataset.name;
  let value = target.value;
  const fieldType = target.dataset.type;
  if (fieldType === "int") {
    value = parseInt(value);
  }
  switch (fieldType) {
    case `integer`:
      value = parseInt(value);
      break;
    case `float`:
    case `double`:
    case `decimal`:
      value = parseFloat(value);
      break;
    default:
      value = value.toString();
      break;
  }

  let form = state.form !== null ? state.form : {};
  form[fieldName] = value;

  State.update({ form });
};

/*
 * Submit form
 */
const onSubmitForm = () => {
  props.setLoading(true);
  State.update({ errorMsg: "", successMsg: "" });
  // Check values
  const requiredFields = props.schema.required;
  const properties = props.schema.properties;
  for (let propertyName of Object.keys(properties)) {
    // const fieldType = properties[propertyName].type;
    const isRequired = requiredFields.includes(propertyName);
    if (isRequired && !state.form[propertyName]) {
      props.setLoading(false);
      State.update({ errorMsg: `${propertyName} is a required field` });
      return;
    }
  }

  // Send form
  props
    .sendForm(state.form)
    .then((res) => {
      props.setLoading(false);
      if (!res.body) {
        State.update({ errorMsg: "Error sending form to Context" });
        return;
      }
      const response = res.body;
      if (!response.success) {
        State.update({ errorMsg: response.message });
        return;
      }

      // Pay for updating the form data
      props.donate();
    })
    .catch((e) => {
      console.log("Error", e);
      State.update({ errorMsg: `Error sending form` });
    });
};

/**
 * Get form fields
 * Building form dinamically
 */
const getFields = () => {
  const indents = [];
  if (props.schema === undefined) return indents;
  if (props.schema === null) return indents;
  if (Object.keys(props.schema).length === 0) return indents;

  // Set form data
  console.log(`Form > getFields > state.form`, state.form);
  console.log(`Form > getFields > props.form`, props.form);
  let form = {};
  if (!state.form) {
    if (!!props.form) {
      form = props.form;
      State.update({ form });
    }
    // setTimeout(() => {
    //   State.update({ form });
    // }, 100);
  } else {
    form = state.form;
  }

  // const additionalProperties = props.schema.additionalProperties;
  const requiredFields = props.schema.required;
  const properties = props.schema.properties;

  for (let propertyName of Object.keys(properties)) {
    const fieldType = properties[propertyName].type;
    const isRequired = requiredFields.includes(propertyName);
    indents.push(
      <Field>
        <label>{`${propertyName}${isRequired ? ` *` : ``}`}</label>
        <input
          type={getInputType(fieldType)}
          class="form-control"
          placeholder=""
          onChange={onInputChange}
          data-name={propertyName}
          data-type={fieldType}
          required={isRequired}
          value={getInputValue(propertyName, fieldType, form)}
        />
      </Field>
    );
  }

  return indents;
};

/**
 * Get input type
 */
const getInputType = (fieldType) => {
  switch (fieldType) {
    case `integer`:
    case `float`:
    case `double`:
    case `decimal`:
      return `number`;
    default:
      return `text`;
  }
};

/**
 * Get input value
 */
const getInputValue = (propertyName, fieldType, form) => {
  if (form[propertyName] !== undefined && form[propertyName] !== null)
    return form[propertyName];
  switch (fieldType) {
    case `integer`:
    case `float`:
    case `double`:
    case `decimal`:
      return ``;
    default:
      return ``;
  }
};

/**
 * Render
 */
const indents = [];
const fields = getFields();

if (fields.length > 0) {
  indents.push(fields);
  indents.push(
    <div class="container p-3 text-center">
      <button onClick={onSubmitForm} disabled={props.loading}>
        Submit
      </button>
      {!!state.errorMsg && <ErrorMessage>{state.errorMsg}</ErrorMessage>}
      {!!state.successMsg && (
        <SuccessMessage>{state.successMsg}</SuccessMessage>
      )}
    </div>
  );
}

return (
  <>
    <div class="container">
      <Title>My data</Title>
      <Container>{indents}</Container>
    </div>
  </>
);
