const { onLoad, value } = props;

if (state.initialized === undefined) {
  State.init({
    initialized: true,
  });
  const found = (param) => {
    return `Value found: ${value}. Param: ${param}`;
  };

  const notFound = (param) => {
    return `Value NOT found. Param: ${param}`;
  };

  if (typeof onLoad === "function") {
    if (value) {
      onLoad({
        func: found.toString(),
      });
    } else {
      onLoad({
        func: (param) => notFound(param).toString(),
      });
    }
  }
}
