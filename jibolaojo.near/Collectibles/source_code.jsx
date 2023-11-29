const res = fetch(
  `https://api.nearblocks.io/v1/account/${
    props.wallet_id || context.accountId
  }/inventory`
);

if (!(res && res.body)) return "...";
// return res.body.inventory.nfts
return (
  <>
    {res.body.inventory.nfts.map((nft) => (
      <div
        key={ft.contract}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#eee",
          padding: "1rem",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
      >
        <img
          style={{marginBottom: "1rem"}}
          height={60}
          width={60}
          layout="intrinsic"
          src={
            nft.nft_meta.icon ??
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          }
        />
        <div
          style={{
            fontWeight: 500,
            fontSize: "1.125rem",
          }}
        >
          {nft.quantity > 1 && nft.quantity} {nft.nft_meta.name ? `${nft.nft_meta.name} NFT${nft.quantity > 1 ? 's' : ''}` : nft.contract }
        </div>
      </div>
    ))}
  </>
);
