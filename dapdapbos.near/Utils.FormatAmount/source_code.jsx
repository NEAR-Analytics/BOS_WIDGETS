const { amount } = props;

function formatAmount(number) {
  if (typeof Number(number) !== "number") return "-";
  if (isNaN(Number(number))) return "-";

  let str_num;

  if (number >= 1e3 && number < 1e6) {
    str_num = number / 1e3;
    return str_num.toFixed(2) + "k";
  } else if (number >= 1e6) {
    str_num = number / 1e6;
    return str_num.toFixed(2) + "m";
  } else {
    return Number(str_num).toFixed(2);
  }
}

return formatAmount(amount);
