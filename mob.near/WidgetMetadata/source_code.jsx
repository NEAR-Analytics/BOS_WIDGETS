const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);

const name = metadata.name ?? widgetName;
const description = metadata.description;
const image = metadata.image;
const tags = Object.keys(metadata.tags ?? {});

const linktree = Object.entries(metadata.linktree ?? {});
const linktreeElements = {
  website: {
    prefix: "https://",
    icon: "bi-globe2",
  },
};

const linktreeObjects = linktree.map((o) => {
  const key = o[0];
  let value = o[1];
  if (!value) {
    return null;
  }
  const e = linktreeElements[key];
  if (e.prefix) {
    value = value && value.replace(e.prefix, "");
  }
  const icon = e.icon ? (
    <i className={`bi ${e.icon ?? ""} text-secondary me-1`}></i>
  ) : (
    ""
  );
  return e.prefix ? (
    <div className="text-truncate">
      <a className="text-decoration-none" href={`${e.prefix}${value}`}>
        {icon}
        {value}
      </a>
    </div>
  ) : (
    <div className="text-truncate">
      {key}: {icon}
      {value}
    </div>
  );
});

return (
  <div className="card">
    <div className="row py-3 g-1">
      <div className="m-auto text-center" style={{ maxWidth: "12em" }}>
        <div
          className="d-inline-block"
          style={{ width: "10em", height: "10em" }}
        >
          <Widget
            src="mob.near/widget/Image"
            props={{
              image,
              className: "w-100 h-100 rounded",
              style: { objectFit: "cover" },
              thumbnail: false,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
              alt: widgetName,
            }}
          />
        </div>
      </div>
      <div className="col px-2">
        <div className="position-relative">
          <h5 className="card-title">{name}</h5>
          <div className="text-truncate">
            <a
              className="text-decoration-none stretched-link"
              href={`#/${widgetPath}`}
            >
              <i className="bi bi-box-arrow-up-right text-secondary me-1" />
              {widgetPath}
            </a>
          </div>
        </div>
        <div className="card-text">
          <Markdown text={description} />
          {tags.length > 0 && (
            <div>
              {tags.map((tag) => (
                <span className="me-1 mb-1 badge bg-secondary">#{tag}</span>
              ))}
            </div>
          )}
        </div>
        {linktreeObjects}
      </div>
    </div>
    <div className="card-footer">
      <span className="text-secondary me-1">By</span>
      <Widget src="mob.near/widget/ProfileLine" props={{ accountId }} />
    </div>
  </div>
);
