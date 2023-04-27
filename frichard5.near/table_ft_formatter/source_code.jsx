const ftList = props.ftList || [];
const { amount, ft, isParsed } = props;

const numberWithCommas = (x) => {
  return JSON.stringify(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const defaultFt = { icon: "", symbol: "" };
const near = {
  symbol: "NEAR",
  icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png",
};
const findFt = (ftAddress, amount) => {
  if (ftAddress === "Near" || ftAdress === "") return near;
  if (!ftList.length) return defaultFt;
  const ft = ftList.find((f) => ftAddress === f.token_account_id);
  if (isParsed) return ft ? { ...ft, amount } : { ...defaultFt, amount };
  const decimals = ft ? Number(ft.decimals) : 24;
  const parsedAmount = Number(amount) / Math.pow(10, decimals);
  return ft
    ? { ...ft, amount: parsedAmount }
    : { ...defaultFt, amount: parsedAmount };
};

const currentFt = findFt(ft, amount);

return (
  <>
    {numberWithCommas(parseInt(currentFt.amount))}
    {currentFt.icon ? <img src={currentFt.icon} /> : ""}
    {currentFt.symbol}
  </>
);
