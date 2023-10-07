// Forked from: rubycoptest.testnet/widget/Image

const accountId = props.accountId;
const className = props.className;
const style = props.style;
const alt = props.alt;
const fallbackUrl = props.fallbackUrl;
const thumbnail = props.thumbnail;
const componentOwnerId = props.componentOwnerId;

const [imageUrl, setImageUrl] = useState(
  "https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu"
);

function toUrl(image) {
  return (
    (image.ipfs_cid
      ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
      : image.url) || fallbackUrl
  );
}

const thumb = (imageUrl) =>
  thumbnail && imageUrl && !imageUrl.startsWith("data:image/")
    ? `https://i.near.social/${thumbnail}/${imageUrl}`
    : imageUrl;

useEffect(() => {
  const profile = Social.getr(`${accountId}/profile`);
  const image = profile.image;
  if (image) {
    const imageUrl = thumb(toUrl(image));
    setImageUrl(imageUrl);
  } else {
    setImageUrl(fallbackUrl);
  }
}, [accountId, fallbackUrl, thumbnail]);

return image.nft.contractId && image.nft.tokenId ? (
  <Widget
    src={`${componentOwnerId}/widget/FNftImage`}
    props={{
      className,
      style,
      alt,
      nft: image.nft,
      thumbnail,
      fallbackUrl,
    }}
  />
) : (
  <img className={className} style={style} src={imageUrl} alt={alt} />
);
