const image = props.image;
const className = props.className;
const style = props.style;
const alt = props.alt;
const fallbackUrl = props.fallbackUrl;
const thumbnail = props.thumbnail;

State.init({
  image,
  modalImageUrl: null, // Add modalImageUrl to your State object
  showModal: false, // Add showModal to your State object
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
        // When an image is clicked, update the modal image state and open the modal
        const imageUrl = state.imageUrl
          ? thumb(state.imageUrl)
          : thumb(toUrl(image));
        State.update({
          modalImageUrl: imageUrl,
          showModal: true,
        });
      }}
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
    {state.showModal && (
      <div
        className="modal fade show d-block"
        onClick={() => State.update({ showModal: false })}
        tabIndex="-1"
        role="dialog"
        aria-hidden={!state.showModal}
        style={{ backgroundColor: "rgba(0,0,0,0.8)" }} // Darkens the screen
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered" // Center the modal vertically
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body">
              <img
                src={state.modalImageUrl}
                className="img-fluid"
                alt="Modal"
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
