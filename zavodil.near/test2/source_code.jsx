State.init({ onLoad: props.onLoad });

const { value } = props;

const found = (param) => {
  return `Value found: ${value}. Param: ${param}`;
};

const notFound = (param) => {
  return `Value NOT found. Param: ${param}`;
};

if (typeof state.onLoad === "function") {
  if (value) {
    state.onLoad({
      func: (param) => {
        return found(param);
      },
    });
  } else {
    state.onLoad({
      func: (param) => notFound(param),
    });
  }
}
