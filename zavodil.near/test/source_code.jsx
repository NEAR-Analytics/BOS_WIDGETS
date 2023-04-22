const { onLoad, value } = props;

if (typeof onLoad === "function") {
  if (value) {
    onLoad({
      func: () => {
        return `Value found: ${value}`;
      },
    });
  } else {
    onLoad({
      func: () => {
        return "Value not found";
      },
    });
  }
}
