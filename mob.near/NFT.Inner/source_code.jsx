const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
};

const [imageUrl, setImageUrl] = useState(null);

useEffect(() => {
  setImageUrl(
    `https://i.near.social/magic/${
      thumbnail || "large"
    }/https://near.social/magic/img/nft/${nft.contractId}/${nft.tokenId}`
  );
}, [nft]);

return (
  <div className="nft-card">
    <div className="nft-image-wrapper">
      <div
        className="nft-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
    </div>
    <div className="nft-text">
      <div className="nft-title">Your NFT Title</div>
      <div className="nft-description">Description of your NFT goes here.</div>
    </div>
  </div>
);
