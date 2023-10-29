const [suffix, setSuffix] = useState("");
const [longURL, setLongURL] = useState("");
const [loading, setLoading] = useState(false);
const [metadata, setMetadata] = useState(false);

function resetMetadata() {
  setMetadata({
    title: "",
    description: "",
    image: "",
  });
}

useEffect(() => {
  if (longURL) {
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
  }
}, [longURL]);

return (
  <div className="container mt-5">
    <div className="mb-3">
      <label className="form-label">Short URL</label>
      <div className="input-group">
        <span className="input-group-text">
          https://{context.accountId}.fm/
        </span>
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
      <div className="mb-3">
        <label className="form-label">Long URL</label>
        <input
          type="url"
          className="form-control"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
        />
      </div>
    )}

    {longURL && (
      <div>
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

        <button className="btn btn-primary">Save Changes</button>
      </div>
    )}
  </div>
);
