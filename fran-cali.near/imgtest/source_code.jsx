const {
  nft: propNft,
  contractId: propContractId,
  tokenId: propTokenId,
  className: propClassName,
  style,
  alt,
  thumbnail,
  fallbackUrl,
  loadingUrl = "https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu",
} = props;

const [localState, setLocalState] = useState({
  contractId: propNft?.contractId || propContractId,
  tokenId: propNft?.tokenId || propTokenId,
  imageUrl: null,
  oldUrl: null,
});

useEffect(() => {
  if (
    propContractId !== localState.contractId ||
    propTokenId !== localState.tokenId
  ) {
    setLocalState({
      contractId: propContractId,
      tokenId: propTokenId,
      imageUrl: null,
    });
  }
}, [propContractId, propTokenId, localState.contractId, localState.tokenId]);

const nftMetadata =
  nft.contractMetadata ?? Near.view(contractId, "nft_metadata");
const tokenMetadata =
  nft.tokenMetadata ??
  Near.view(contractId, "nft_token", {
    token_id: tokenId,
  }).metadata;

let imageUrl = null;

if (nftMetadata && tokenMetadata) {
  let tokenMedia = tokenMetadata.media || "";

  imageUrl =
    tokenMedia.startsWith("https://") ||
    tokenMedia.startsWith("http://") ||
    tokenMedia.startsWith("data:image")
      ? tokenMedia
      : nftMetadata.base_uri
      ? `${nftMetadata.base_uri}/${tokenMedia}`
      : tokenMedia.startsWith("Qm") || tokenMedia.startsWith("ba")
      ? `https://ipfs.near.social/ipfs/${tokenMedia}`
      : tokenMedia;

  if (!tokenMedia && tokenMetadata.reference) {
    if (
      nftMetadata.base_uri === "https://arweave.net" &&
      !tokenMetadata.reference.startsWith("https://")
    ) {
      const res = fetch(`${nftMetadata.base_uri}/${tokenMetadata.reference}`);
      imageUrl = res.body.media;
    } else if (
      tokenMetadata.reference.startsWith("https://") ||
      tokenMetadata.reference.startsWith("http://")
    ) {
      const res = fetch(tokenMetadata.reference);
      imageUrl = JSON.parse(res.body).media;
    } else if (tokenMetadata.reference.startsWith("ar://")) {
      const res = fetch(
        `${"https://arweave.net"}/${tokenMetadata.reference.split("//")[1]}`
      );
      imageUrl = JSON.parse(res.body).media;
    }
  }

  if (!imageUrl) {
    imageUrl = false;
  }
}
// ... (rest of the logic regarding fetching data from Near remains unchanged)

const replaceIpfs = useCallback(
  (imageUrl) => {
    const rex =
      /^(?:https?:\/\/)(?:[^\/]+\/ipfs\/)?(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(?:\.[^\/]+)?(\/.*)?$/g;

    if (localState.oldUrl !== imageUrl && imageUrl) {
      const match = rex.exec(imageUrl);
      if (match) {
        const newImageUrl = `https://ipfs.near.social/ipfs/${match[1]}${
          match[2] || ""
        }`;
        if (newImageUrl !== imageUrl) {
          setLocalState((prevState) => ({
            ...prevState,
            oldUrl: imageUrl,
            imageUrl: newImageUrl,
          }));
          return;
        }
      }
    }
    if (localState.imageUrl !== false) {
      setLocalState((prevState) => ({
        ...prevState,
        imageUrl: false,
      }));
    }
  },
  [localState]
);

const thumb = (imageUrl) =>
  thumbnail && imageUrl && !imageUrl.startsWith("data:image/")
    ? `https://i.near.social/${thumbnail}/${imageUrl}`
    : imageUrl;

const img = localState.imageUrl !== null ? localState.imageUrl : imageUrl;
const src = img !== false ? img : fallbackUrl;

return (
  <img
    className={propClassName || "img-fluid"}
    style={style}
    src={src !== null ? thumb(src) : loadingUrl}
    alt={alt}
    onError={() => replaceIpfs(img)}
  />
);
