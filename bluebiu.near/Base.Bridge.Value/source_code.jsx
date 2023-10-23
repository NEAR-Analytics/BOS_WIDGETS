const { price, amount } = props;

if (!price) return "-";
const value = Big(price).mul(amount || 0);
if (value.lt(0.01)) return value.toPrecision(1);
return value.toFixed(2);
