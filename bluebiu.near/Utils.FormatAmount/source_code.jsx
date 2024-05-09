const { amount } = props;
const digits = props.digits || 2;
const prev = props.prev || "";
if (!amount) return "-";
let total = Big(amount);
if (total.eq(0)) return prev + "0";
const digitSplit = 1 / Math.pow(10, digits);

if (total.lt(digitSplit)) return "<" + prev + digitSplit;

return prev + Number(total.toFixed(digits)).toLocaleString("en-US");
