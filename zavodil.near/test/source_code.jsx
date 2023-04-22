const { onLoad, value } = props;

if (typeof onLoad === "function") {
  if (value) {
    onLoad({
      func: console.log("Value found"),
    });
  } else {
    onLoad({
      func: console.log("Value not found"),
    });
  }
}
