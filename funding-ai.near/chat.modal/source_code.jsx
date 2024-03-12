const profileData = props.profileData || [];

return (
  <>
    {profileData.length > 0 &&
      profileData.map((dt) => (
        <div
          class="item"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
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
            <h5 class="modal-title" id="staticBackdropLabel">
              Modal title
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
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
