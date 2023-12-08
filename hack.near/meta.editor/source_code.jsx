const accountId = context.accountId;
const path = props.path || "hack.near/widget/Academy";
const [creatorId, namespace, thingId] = path.split("/");

// Fetch tags from Social based on the provided path
const tags = Social.getr(`*/graph/context/${path}/tags/**`, "final");

return (
  <div className="m-2">
    <div className="mb-2 card">
      <div className="card-body">
        <div className="text-truncate mb-3">
          <Widget
            src="hack.near/widget/thing.block"
            props={{ creatorId, namespace, thingId }}
          />
        </div>
        {/* Display the fetched tags */}
        <Widget
          src="hack.near/widget/tags"
          props={{
            path,
          }}
        />
        <button
          className="btn btn-outline-secondary m-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Guide
        </button>
      </div>
      <div className="collapse" id="collapseExample">
        <div className="card card-body m-3" style={{ background: "#f8f8f8" }}>
          <h5>Best Practices:</h5>
          <ul>
            <li>Keep tags concise and simple</li>
            <li>Use "-" (minus) instead of spaces</li>
            <li>English words recommended</li>
            <li>Do not create unnecessary tags</li>
            <li>Be respectful to everyone #community</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);
