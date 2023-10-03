const image = props.image;

const Wrapper = styled.div`
  .lightbox {
    img {
      width: 100vw;
      height: 100vh;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .img-wrapper {
    width: 100%;
    border-radius: 0.5em;
    text-align: center;
    margin-top: 0.5rem;
    overflow: hidden;
    height: 20em;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.5em;
    }
  }
`;

const [showLightbox, setShowLightbox] = useState(false);

const imageUrl =
  image.nft.contractId && image.nft.tokenId
    ? `https://i.near.social/magic/large/https://near.social/magic/img/nft/${image.nft.contractId}/${image.nft.tokenId}`
    : image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url;

const innerImage = (
  <div className="h-100">
    <img src={imageUrl} alt={props.alt} />
  </div>
);

return (
  <Wrapper>
    <div
      key="c-img"
      className="img-wrapper"
      onClick={() => setShowLightbox(true)}
    >
      {innerImage}
    </div>
    <Widget
      key="img-lightbox"
      src="mob.near/widget/N.Lightbox"
      loading=""
      props={{
        show: showLightbox,
        onHide: () => {
          setShowLightbox(false);
        },
        children: innerImage,
      }}
    />
  </Wrapper>
);
