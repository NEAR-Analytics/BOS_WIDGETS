const daoId = props.daoId ?? "multi.sputnik-daos.near";

const inventory = useCache(
  () =>
    asyncFetch(`https://api.nearblocks.io/v1/account/${daoId}/inventory`).then(
      (res) => res.body
    ),
  "account.inventory." + daoId
);

console.log(inventory);
const FungibleToken = ({
  amount,
  contract,
  decimals,
  name,
  icon,
  price,
  symbol,
}) => {
  const realAmount = Big(amount).div(Big(10).pow(decimals)).toString();

  return (
    <div class="d-flex align-items-center gx-4 px-2 px-lg-6 py-6 rounded mb-4">
      <img
        src={icon}
        class="rounded-circle me-3"
        style={{
          width: "48px",
          height: "48px",
        }}
      />
      <div>
        <div class="h6 fw-bold text-dark">{name}</div>
        <div class="small text-dark">${price}</div>
      </div>
      <div class="ms-auto text-end">
        <div class="h6 fw-bold text-dark">
          {Number(realAmount).toLocaleString(undefined, {
            maximumFractionDigits: 4,
          })}{" "}
          {symbol}
        </div>
        <div class="small text-dark">
          $
          {Number(price * realAmount).toLocaleString(undefined, {
            maximumFractionDigits: 4,
          })}
        </div>
      </div>
    </div>
  );
};

return (
  <>
    <h4 className="mb-4">Fungible Tokens</h4>
    <div>
      {inventory.inventory.fts.map((token, i) => (
        <FungibleToken
          key={i}
          amount={token.amount}
          contract={token.contract}
          {...token.ft_meta}
        />
      ))}
    </div>
    <h4 className="my-4">NFTs</h4>
  </>
);
