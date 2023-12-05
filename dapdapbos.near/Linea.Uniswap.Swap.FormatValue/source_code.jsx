const prices = Storage.get(
  "tokensPrice",
  "dapdapbos.near/widget/Linea.Uniswap.Swap.TokensPrice"
);

const { symbol, amount } = props;
const digits = props.digits || 2;
const prev = props.prev;
if (!amount || !symbol) return "-";
const price = prices[symbol];
let unit = "";
let total = Big(amount);
if (!price) {
  unit = symbol;
  prev = "";
}
if (price) {
  total = Big(amount).mul(price);
}
if (total.eq(0)) return "0" + unit;
const digitSplit = 1 / Math.pow(10, digits);
if (total.lt(digitSplit)) return "<" + prev + digitSplit + unit;
return prev + Number(total.toFixed(digits)).toLocaleString("en-US") + unit;
