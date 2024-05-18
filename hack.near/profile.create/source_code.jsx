const accountId = props.accountId ?? context.accountId ?? "every.near";

const profile = props.profile ?? Social.getr(`${accountId}`);
const commons = Social.getr(`${accountId}/graph/commons`);

const fast = props.fast ?? !props.data.profile;

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

const imgWrapperStyle = { height: "3em", width: "3em" };

const [profileName, setProfileName] = useState("");

const metadata = {
  profile: {
    name: profileName,
    image: {
      ipfs_cid: state.img.cid,
    },
  },
};

const handleSave = () => {
  Social.set(metadata);
};

return (
  <>
    {commons ? (
      <div className="d-flex flex-row">
        <div className="me-2 d-inline-block">
          {state.img || image ? (
            <Widget
              src="hack.near/widget/profile.image"
              props={{ image, accountId }}
            />
          ) : (
            <Files
              multiple={false}
              accepts={["image/*"]}
              minFileSize={1}
              clickable
              className="btn btn-sm mt-2"
              onChange={filesOnChange}
            >
              {state.img?.uploading ? <></> : <i class="bi bi-pencil-fill"></i>}
            </Files>
          )}
        </div>
        <div className="text-truncate">
          <div className="text-truncate">
            <span className="fw-bold me-1">
              {name ? (
                name
              ) : (
                <div className="m-1 d-flex flex-row">
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
    ) : (
      <Widget src="hack.near/widget/attest" props={{ accountId }} />
    )}
  </>
);
