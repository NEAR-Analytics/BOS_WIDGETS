const image = props.image;
const title = props.title || "";
const timestamp = props.timestamp || "";
const className = props.className;
const style = props.style;
const alt = props.alt;
const fallbackUrl = props.fallbackUrl;
const thumbnail = props.thumbnail;

if (props.timestamp) {
  const date = new Date(timestamp);
  const humanReadableDate = date.toLocaleString();
  timestamp = humanReadableDate;
}

State.init({
  image,
  modalMediaUrl: null,
  showModal: false,
  isVideo: false,
  isLoading: true,
});

if (JSON.stringify(image) !== JSON.stringify(state.image)) {
  State.update({
    image,
    imageUrl: null,
  });
}
function fetchContentType(url) {
  try {
    const segments = url.split("/");
    const newURL =
      "https://" + segments[segments.length - 1] + ".ipfs.nftstorage.link/";
    console.log(newURL);
    asyncFetch(newURL, { method: "HEAD" })
      .then((response) => {
        console.log(response);

        const contentType = response.contentType;
        const isVideo = contentType && contentType.startsWith("video/");
        State.update({ isVideo, isLoading: false });
      })
      .catch((error) => {
        console.log("errror" + error);
        State.update({ isLoading: false });
      });
  } catch (error) {
    console.log("Error fetching content type:", error);
    State.update({ isLoading: false });
  }
}

function toUrl(image) {
  const url =
    (image.ipfs_cid
      ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
      : image.url) || fallbackUrl;

  // Fetch the content type to determine if the file is a video
  //fetchContentType(url);

  return url;
}

fetchContentType(toUrl(image));
const thumb = (imageUrl) =>
  thumbnail && imageUrl && !imageUrl.startsWith("data:image/")
    ? `https://i.near.social/${thumbnail}/${imageUrl}`
    : imageUrl;

return (
  <>
    {state.isLoading ? (
      <div>Loading...</div> // Show a loading placeholder or spinner
    ) : state.isVideo ? (
      <video
        className={className}
        controls
        style={style}
        title={title}
        src={state.imageUrl ? thumb(state.imageUrl) : thumb(toUrl(image))}
      />
    ) : (
      <img
        className={className}
        title={title}
        onClick={() => {
          const mediaUrl = state.imageUrl
            ? thumb(state.imageUrl)
            : thumb(toUrl(image));
          State.update({
            modalMediaUrl: mediaUrl,
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
    )}
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
              {state.isVideo ? (
                <video
                  src={state.modalMediaUrl}
                  className="img-fluid"
                  controls
                />
              ) : (
                <img
                  src={state.modalMediaUrl}
                  className="img-fluid"
                  alt="Modal"
                  title={title}
                />
              )}
              <p>
                Minted by {title} {timestamp}
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
