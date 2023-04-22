const { onLoad, value } = props;

const found = (param) => {
  return `Value found: ${value}. Param: ${param}`;
};

const notFound = (param) => {
  return `Value NOT found. Param: ${param}`;
};

if (typeof onLoad === "function") {
  if (value) {
    onLoad({
      func: (param) => {
        return found(param);
      },
    });
  } else {
    onLoad({
      func: (param) => notFound(param),
    });
  }
}
