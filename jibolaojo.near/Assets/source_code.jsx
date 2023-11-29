const res = fetch(
  `https://api.nearblocks.io/v1/account/${
    props.wallet_id || context.accountId
  }/inventory`,
  {
    headers: {
      Authorization: `Bearer 0BBF00F813124314A1B372A2ED1A6100`,
    },
  }
);

if (!(res && res.body)) return "...";

return (
  <>
    {res.body.inventory.fts.map((ft) => (
      <div
        key={ft.contract}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#eee",
          padding: "1rem",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
      >
        <img
          height={40}
          width={40}
          layout="intrinsic"
          src={
            ft.ft_metas.icon ??
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          }
        />
        <div
          style={{
            marginLeft: "2rem",
            fontWeight: 500,
            fontSize: "1.125rem",
          }}
        >
          {Number(ft.amount) / Math.pow(10, ft.ft_metas.decimals)}{" "}
          {ft.ft_metas.symbol}
        </div>
      </div>
    ))}
  </>
);
