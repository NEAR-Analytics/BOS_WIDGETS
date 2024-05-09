const res = fetch("https://linea-nft.azurewebsites.net/api/nft");
console.log("res", res);
const nfts = res.body;

return (
  <div className="home">
    {nfts?.tokens?.map((nft, index) => (
      <div className="nft-card" key={index}>
        <div className="description info">
          <span title={nft.tokenId}>
            Token Id :{" "}
            {nft.tokenId?.substring(0, 30) +
              (nft.tokenId?.length > 30 ? "..." : "")}
          </span>
          <span title={nft.address}>
            Address :{" "}
            {nft.address?.substring(0, 30) +
              (nft.address?.length > 30 ? "..." : "")}
          </span>
          <span title={nft.owner}>
            Owner :{" "}
            {nft.owner?.substring(0, 30) +
              (nft.owner?.length > 30 ? "..." : "")}
          </span>
        </div>
      </div>
    ))}
    {nfts?.total === 0 && <div>No nft founds for these criterias</div>}
  </div>
);
