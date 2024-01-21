const { price, amount, place } = props;

function calcUSD(_price, _amount) {
  if (!_price || !_amount) return "-";
  return Big(_price)
    .times(Big(_amount))
    .toFixed(place || 2);
}

return calcUSD(price, amount);
