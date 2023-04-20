const ftList = props.ftList || [];
const { amount, ft } = props;

const numberWithCommas = (x) => {
  return JSON.stringify(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const defaultFt = { icon: "", symbol: "" };
const near = {
  symbol: "NEAR",
  icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png",
};
const findFt = (ftAddress) => {
  if (ftAddress === "Near") return near;
  if (!ftList.length) return defaultFt;
  const ft = ftList.find((f) => ftAddress === f.token_account_id);
  return ft ? ft : defaultFt;
};

const currentFt = findFt(ft);

return (
  <>
    {numberWithCommas(parseInt(amount))}
    {currentFt.icon ? <img src={currentFt.icon} /> : ""}
    {currentFt.symbol}
  </>
);
