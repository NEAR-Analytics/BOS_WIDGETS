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

return <img src={imageUrl} />;
