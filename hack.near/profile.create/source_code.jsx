const accountId = props.accountId ?? context.accountId ?? "buildcommons.near";

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = props.fast ?? !props.profile;

const name = profile.name;
const image = profile.image;

State.init({ img: null });

const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;
    State.update({ img: { cid } });
  });
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ img: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};

const [profileName, setProfileName] = useState("");

const data = {
  profile: {
    name: profileName,
    image: {
      ipfs_cid: state.img.cid,
    },
  },
};

const handleSave = () => {
  Social.set(data);
};

return (
  <div className="d-flex flex-row">
    <div className="me-2">
      {state.img ? (
        <img
          style={{ height: "3em", width: "3em" }}
          src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
        />
      ) : (
        <>
          {image ? (
            <Widget
              src="hack.near/widget/profile.image"
              props={{ accountId }}
            />
          ) : (
            <Files
              multiple={false}
              accepts={["image/*"]}
              minFileSize={1}
              clickable
              className="btn mt-3"
              onChange={filesOnChange}
            >
              {state.img?.uploading ? (
                <></>
              ) : (
                <i class="bi bi-person-circle"></i>
              )}
            </Files>
          )}
        </>
      )}
    </div>
    <div className="text-truncate">
      <div className="text-truncate">
        <span className="fw-bold me-1">
          {name ? (
            name
          ) : (
            <div className="m-1 mt-3 d-flex flex-row">
              <input
                type="text"
                placeholder="input name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
              <div>
                <button onClick={handleSave} className="ms-3 mt-1 btn-sm">
                  Save
                </button>
              </div>
            </div>
          )}
        </span>
        <Widget src="hack.near/widget/BuilderHat" props={{ accountId }} />
      </div>
      {name && (
        <small>
          <span className="text-truncate text-muted font-monospace">
            @{accountId}
          </span>
        </small>
      )}
    </div>
  </div>
);
