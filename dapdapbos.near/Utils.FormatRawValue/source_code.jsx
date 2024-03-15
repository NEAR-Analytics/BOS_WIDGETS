const { value } = props;

// '-' '<$0.01' '0.xx'
function formatRawValue(rawValue) {
  if (isNaN(Number(rawValue)) || Number(rawValue) === 0) {
    return "-";
  } else {
    return Big(rawValue || 0).lt(0.01)
      ? `<$0.01`
      : `$${Number(rawValue).toFixed(2)}`;
  }
}

return formatRawValue(value);
