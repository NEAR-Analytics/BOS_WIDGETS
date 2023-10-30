const [suffix, setSuffix] = useState("");
const [longURL, setLongURL] = useState("");
const [loading, setLoading] = useState(false);
const [editMetadata, setEditMetadata] = useState(false);
const [metadata, setMetadata] = useState(false);
const [debounce, setDebounce] = useState(null);
const [previewUrl, setPreviewUrl] = useState("");

const accountId = context.accountId;
const premiumTime = Social.get(
  `premium.social.near/badge/premium/accounts/${accountId}`,
  "final"
);
const data = Social.get(`${accountId}/custom/fm/${props.suffix}`, "final");

const Status = {
  Loading: 0,
  NoAccountId: 1,
  NotPremium: 2,
  New: 3,
  Existing: 4,
  UnsupportedAccountId: 5,
};

const parseJson = (json) => {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
};

const [status, setStatus] = useState(Status.Loading);

useEffect(() => {
  setStatus(() => {
    if (!accountId) {
      return Status.NoAccountId;
    }
    if (!accountId.endsWith(".near") || !accountId.split(".").length == 2) {
      return Status.UnsupportedAccountId;
    }
    if (premiumTime === null || (props.suffix && data === null)) {
      return Status.Loading;
    }
    if (!premiumTime || parseInt(premiumTime) < Date.now()) {
      return Status.NotPremium;
    }
    setSuffix(props.suffix);
    const parsedData = parseJson(data);
    if (props.url && parsedData?.url !== props.url) {
      setLongURL(props.url);
      return Status.New;
    }
    setLongURL(parsedData?.url || "");
    setMetadata({
      title: parsedData?.title || "",
      description: parsedData?.description || "",
      image: parsedData?.image || "",
    });

    return Status.Existing;
  });
}, [props.suffix, props.url, accountId, premiumTime, data]);

function resetMetadata() {
  setMetadata({
    title: "",
    description: "",
    image: "",
  });
}

const loadMetadata = (url) => {
  setLoading(true);
  asyncFetch(`https://near.fm/api/og?url=${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
  })
    .then(({ body }) => {
      setMetadata({
        title: body.title || "",
        description: body.description || "",
        image: body.image || "",
      });
    })
    .catch((e) => {
      console.error("Failed to load metadata for the URL", e);
      resetMetadata();
    })
    .finally(() => {
      setLoading(false);
    });
};

useEffect(() => {
  if (longURL && status === Status.New) {
    clearTimeout(debounce);
    setLoading(true);
    setDebounce(
      setTimeout(() => {
        loadMetadata(longURL);
      }, 1000)
    );
  }
}, [longURL, status]);

return status === Status.Loading ? (
  <div>Loading</div>
) : status === Status.NoAccountId ? (
  <div>Please sign in to start using URL Shortener</div>
) : status === Status.UnsupportedAccountId ? (
  <div>
    Unfortunately, only top-level accounts ending with ".near" are supported
  </div>
) : status === Status.NotPremium ? (
  <div>
    <Widget
      key="expiring-premium"
      loading=""
      src="mob.near/widget/N.NotPremiumCompose"
      props={{
        text: "Premium subscription is required to use near.fm shortener!",
      }}
    />
  </div>
) : status === Status.New || status === Status.Existing ? (
  <div>
    <div key="short-url" className="mb-3">
      <label className="form-label">Short URL</label>
      <div className="input-group">
        <span className="input-group-text">https://{accountId}.fm/</span>
        <input
          type="text"
          placeholder="welcome-to-near"
          className="form-control"
          value={suffix}
          onChange={(e) => {
            setSuffix(e.target.value);
            setPreviewUrl("");
          }}
          autoFocus
        />
      </div>
    </div>

    {suffix && (
      <div key="long-url" className="mb-3">
        <label className="form-label">Long URL</label>
        <input
          type="url"
          className="form-control"
          value={longURL}
          onChange={(e) => {
            setStatus(Status.New);
            setLongURL(e.target.value);
          }}
        />
      </div>
    )}

    {suffix && longURL && (
      <div key="rest">
        {editMetadata && (
          <div key="edit-metadata">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                disabled={loading}
                value={metadata.title}
                onChange={(e) =>
                  setMetadata({ ...metadata, title: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                disabled={loading}
                value={metadata.description}
                onChange={(e) =>
                  setMetadata({ ...metadata, description: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                className="form-control"
                disabled={loading}
                value={metadata.image}
                onChange={(e) =>
                  setMetadata({ ...metadata, image: e.target.value })
                }
              />
            </div>
          </div>
        )}

        <div className="mb-3">
          <h5>
            Metadata Preview{" "}
            {!editMetadata && (
              <button
                key="edit-button"
                className="btn btn-outline-secondary border-0"
                onClick={() => setEditMetadata(true)}
              >
                Edit
              </button>
            )}
          </h5>
          <div className="border p-3">
            {metadata.image && (
              <img
                src={metadata.image}
                alt="Metadata Card Image"
                className="img-fluid float-start me-3"
                style={{ maxHeight: "10em", maxWidth: "30%" }}
              />
            )}
            <h6>{metadata.title}</h6>
            <p>{metadata.description}</p>
            <div className="clearfix" />
          </div>
        </div>

        <div className="mb-3">
          <CommitButton
            className="btn btn-primary rounded-5"
            data={{
              custom: {
                fm: {
                  [suffix]: JSON.stringify({
                    ...metadata,
                    url: longURL,
                  }),
                },
              },
            }}
            onCommit={() => {
              setPreviewUrl(`https://${accountId}.fm/${suffix}`);
            }}
          >
            Save Changes
          </CommitButton>
        </div>
        {previewUrl && (
          <div className="mb-3 fs-4">
            <a href={previewUrl} target="_blank">
              {previewUrl}
            </a>
            <Widget
              src="mob.near/widget/CopyButton"
              props={{
                text: previewUrl,
                className: "btn btn-outline-primary border-0 fs-4",
              }}
            />
          </div>
        )}
      </div>
    )}
  </div>
) : (
  "Unknown status"
);
