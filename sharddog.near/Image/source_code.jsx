const image = props.image;
const className = props.className;
const style = props.style;
const alt = props.alt;
const fallbackUrl = props.fallbackUrl;
const thumbnail = props.thumbnail;

State.init({
  image,
  modalImageUrl: null, // Add modalImageUrl to your State object
});

if (JSON.stringify(image) !== JSON.stringify(state.image)) {
  State.update({
    image,
    imageUrl: null,
  });
}

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

return image.nft.contractId && image.nft.tokenId ? (
  <Widget
    src="mob.near/widget/NftImage"
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
  <>
    <img
      className={className}
      onClick={() => {
        // When an image is clicked, update the modal image state
        const imageUrl = state.imageUrl
          ? thumb(state.imageUrl)
          : thumb(toUrl(image));
        State.update({ modalImageUrl: imageUrl });
      }}
      data-bs-toggle="modal"
      data-bs-target="#imgModal"
      style={style}
      src={state.imageUrl ? thumb(state.imageUrl) : thumb(toUrl(image))}
      alt={alt}
      onError={() => {
        if (state.imageUrl !== fallbackUrl) {
          State.update({
            imageUrl: fallbackUrl,
          });
        }
      }}
    />
    <div
      className="modal fade"
      id="imgModal"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg"
        onClick={() => {
          // When an image is clicked, update the modal image state
          State.update({ modalImageUrl: null });
        }}
      >
        <div className="modal-content">
          <div className="modal-body">
            <img
              src={state.modalImageUrl} // Use the modalImageUrl from State for the modal image
              className="img-fluid"
              alt="Modal"
            />
          </div>
        </div>
      </div>
    </div>
  </>
);
