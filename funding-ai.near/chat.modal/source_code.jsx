const profileData = props.profileData || [];
const [name, setName] = useState("");
const [image, setImage] = useState("");
const [description, setDescription] = useState("");
const [tags, setTags] = useState([]);
const hanleClick = (data, accountId) => {
  if (data.accountId == accountId) {
    setName(data.data.name);
    setImage(data.data.image.ipfs_cid || data.data.image.url);
    setDescription(data.data.description);
  }
};
return (
  <>
    {profileData.length > 0 &&
      profileData.map((dt) => (
        <div
          class="item"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => hanleClick(dt, dt.accountId)}
        >
          {dt.data.image.url ? (
            <img class="image" src={dt.data.image.url} alt="profile" />
          ) : (
            <img
              class="image"
              src={`https://ipfs.near.social/ipfs/` + dt.data.image.ipfs_cid}
              alt="profile"
            />
          )}
          <div class="project">
            <div class="title">{dt.data.name}</div>
            <div class="decs">
              {dt.data.description.length > 80
                ? dt.data.description.slice(0, 80) + "..."
                : dt.data.description}
            </div>
          </div>
        </div>
      ))}
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            {image.startsWith("https") ? (
              <img class="image" src={image} alt="profile" />
            ) : (
              <img
                class="image"
                src={`https://ipfs.near.social/ipfs/` + image}
                alt="profile"
              />
            )}
            <h5 class="modal-title" id="staticBackdropLabel">
              {name}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">{description}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>{" "}
  </>
);
