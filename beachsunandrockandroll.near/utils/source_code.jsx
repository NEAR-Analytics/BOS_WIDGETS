const getNormalDate = (value) =>
  new Date(parseInt(value.toString() + "000")).toLocaleString();

return { getNormalDate };
