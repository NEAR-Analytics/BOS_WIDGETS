const [suffix, setSuffix] = useState("");
const [longURL, setLongURL] = useState("");
const [loading, setLoading] = useState(false);
const [metadata, setMetadata] = useState(false);
const [debounce, setDebounce] = useState(null);

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
  asyncFetch(`https://near.fm/api/og?url=${longURL}`, {
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
) : status === Status.NotPremium ? (
  <div>Premium subscription required</div>
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
          onChange={(e) => setSuffix(e.target.value)}
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

    {longURL && (
      <div key="rest">
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

        <div className="mb-3">
          <h5>Twitter Card Preview</h5>
          <div className="border p-3">
            <h6>{metadata.title}</h6>
            <p>{metadata.description}</p>
            {metadata.image && (
              <img
                src={metadata.image}
                alt="Twitter Card Image"
                className="img-fluid"
                style={{ maxHeight: "10em" }}
              />
            )}
          </div>
        </div>

        <CommitButton
          className="btn btn-primary"
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
        >
          Save Changes
        </CommitButton>
      </div>
    )}
  </div>
) : (
  "Unknown status"
);
