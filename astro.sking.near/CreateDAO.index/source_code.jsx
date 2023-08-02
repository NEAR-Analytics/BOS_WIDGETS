// -- Read and process types from SocialDB + helper functions
const rawTypes = Social.get("astro.sking.near/type/*", "final");
if (rawTypes === null) return null;

const primitives = ["string", "number", "boolean", "object", "array"];
const types = {};

function parseType(type, depth) {
  depth = depth || 0;
  if (depth > 10) {
    throw {
      message: `Maximum type depth exceeded, please check your type definitions.`,
      depth,
      current: type,
      types,
    };
  }

  type.properties.forEach((prop) => {
    (Array.isArray(prop.type) ? prop.type : [prop.type]).forEach((type) => {
      if (!primitives.includes(type)) {
        if (types[type]) return;
        const rawType = Social.get(`${type}`, "final");
        if (rawType) {
          types[type] = JSON.parse(rawType);
          parseType(types[type], depth + 1);
        }
      }
    });
  });
}

const typeToObj = ({ properties }) => {
  const obj = {};
  properties.forEach((prop) => {
    const type = Array.isArray(prop.type) ? prop.type[0] : prop.type;
    if (!primitives.includes(type)) {
      if (typeof type === "object" && type.properties) {
        obj[prop.name] = typeToObj(type);
      } else if (typeof type === "string" && types[type].properties) {
        obj[prop.name] = typeToObj(types[type]);
      } else {
        // unknown type, just set to empty string
        obj[prop.name] = "";
      }
      return;
    }
    if (type === "array") {
      obj[prop.name] = [];
    } else if (type === "object") {
      obj[prop.name] = {};
    } else {
      obj[prop.name] = prop.default ?? "";
    }
  });
  return obj;
};

const validatePrimitive = (type, value, options) => {
  switch (type) {
    case "string":
      if (typeof value !== "string")
        return { valid: false, message: "Expected a string." };
      if (options?.min && value.length < options.min)
        return {
          valid: false,
          message: `Expected at least ${options.min} characters.`,
        };
      if (options?.max && value.length > options.max)
        return {
          valid: false,
          message: `Expected at most ${options.max} characters.`,
        };
      if (options?.pattern && !value.match(options.pattern))
        return {
          valid: false,
          message: `Does not match expected pattern: ${options.pattern}`,
        };
      return { valid: true };

    case "number":
      if (typeof value !== "number")
        return { valid: false, message: "Expected a number." };
      if (options?.min && value < options.min)
        return {
          valid: false,
          message: `Expected a number greater than or equal to ${options.min}.`,
        };
      if (options?.max && value > options.max)
        return {
          valid: false,
          message: `Expected a number less than or equal to ${options.max}.`,
        };
      return { valid: true };

    case "boolean":
      if (typeof value !== "boolean")
        return { valid: false, message: "Expected a boolean." };
      return { valid: true };

    case "array":
      if (!Array.isArray(value))
        return { valid: false, message: "Expected an array." };
      if (options?.min && value.length < options.min)
        return {
          valid: false,
          message: `Expected at least ${options.min} items.`,
        };
      if (options?.max && value.length > options.max)
        return {
          valid: false,
          message: `Expected at most ${options.max} items.`,
        };
      if (options?.type) {
        for (let v of value) {
          const result = validatePrimitive(options.type, v);
          if (!result.valid) {
            return {
              valid: false,
              message: `An item in the array is invalid: ${result.message}`,
            };
          }
        }
      }
      return { valid: true };

    case "object":
      if (typeof value !== "object")
        return { valid: false, message: "Expected an object." };
      if (options?.min && Object.keys(value).length < options.min)
        return {
          valid: false,
          message: `Expected at least ${options.min} properties.`,
        };
      if (options?.max && Object.keys(value).length > options.max)
        return {
          valid: false,
          message: `Expected at most ${options.max} properties.`,
        };
      return { valid: true };
  }
};

const validate = (type, value, parent) => {
  if (value === undefined || value === "" || value === null) {
    if (parent.required) {
      return { valid: false, message: "This field is required." };
    }
    return {
      valid: true,
    };
  }

  if (Array.isArray(type)) {
    return type.some((t) => validate(t, value, parent));
  }
  if (typeof type === "object") {
    if (type.properties) {
      return type.properties.every((prop) => {
        if (prop.required && value[prop.name] === undefined)
          return {
            valid: false,
            message: "This field is required.",
          };
        const val = value[prop.name];
        if (val === undefined)
          return {
            valid: true,
          };
        return validate(prop.type, val, prop);
      });
    }
  }
  if (typeof type === "string") {
    if (primitives.includes(type)) {
      return validatePrimitive(type, value, parent[type]);
    }
    if (types[type]) {
      return validate(types[type], value, parent);
    }
  }
  return { valid: true };
};

Object.keys(rawTypes).forEach((key) => {
  const type = JSON.parse(rawTypes[key]);
  types["astro.sking.near/type/" + key] = type;
  parseType(type);
});

// --

// -- form state
const initialFormState = typeToObj(types["astro.sking.near/type/dao"]);

State.init({
  step: 0,
  form: initialFormState,
  errors: null,
});

const handleStepComplete = (value) => {
  const stepValid = true;
  Object.keys(value).forEach((key) => {
    const properties = types["astro.sking.near/type/dao"].properties.find(
      (p) => p.name === key
    );
    const validation = validate(properties.type, value[key], properties);
    console.log(key, value, validation);
    if (validation.valid === false) {
      State.update({
        errors: {
          ...state.errors,
          [key]: validation.message,
        },
      });
      stepValid = false;
    } else {
      State.update({
        errors: {
          ...state.errors,
          [key]: null,
        },
      });
    }
  });

  if (stepValid) {
    State.update({
      step: state.step + 1,
      form: {
        ...state.form,
        ...value,
      },
    });
  }
};

console.log("render", state);

const steps = [
  {
    title: "DAO Info & KYC",
    active: state.step === 0,
    icon: state.step > 0 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 0 ? "active-outline" : undefined,
  },
  {
    title: "Links & Socials",
    active: state.step === 1,
    icon: state.step > 1 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 1 ? "active-outline" : undefined,
  },
  {
    title: "Cool Down Period",
    active: state.step === 2,
    icon: state.step > 2 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 2 ? "active-outline" : undefined,
  },
  {
    title: "Add Groups & Members",
    active: state.step === 3,
    icon: state.step > 3 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 3 ? "active-outline" : undefined,
  },
  {
    title: "Proposal & Voting Permission",
    active: state.step === 4,
    icon: state.step > 4 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 4 ? "active-outline" : undefined,
  },
  {
    title: "DAO Assets",
    active: state.step === 5,
    icon: state.step > 5 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 5 ? "active-outline" : undefined,
  },
];

return (
  <>
    <h1 className="h3 fw-bold mb-4">Create a new DAO</h1>
    <Widget
      src={`nui.sking.near/widget/Navigation.Steps`}
      props={{
        steps: steps,
        onClick: (i) => {
          State.update({
            step: i,
          });
        },
      }}
    />
    <Widget
      src={`astro.sking.near/widget/CreateDAO.Step${state.step + 1}`}
      props={{
        formState: state.form,
        onComplete: handleStepComplete,
        errors: state.errors,
        renderFooter: (stepState) => (
          <Widget
            src={`astro.sking.near/widget/CreateDAO.Footer`}
            props={{
              isLast: state.step >= steps.length - 1,
              hasPrevious: state.step > 0,
              onNext: () => {
                handleStepComplete(stepState);
              },
              onPrevious: () => {
                State.update({
                  step: state.step - 1,
                });
              },
            }}
          />
        ),
      }}
    />
  </>
);
