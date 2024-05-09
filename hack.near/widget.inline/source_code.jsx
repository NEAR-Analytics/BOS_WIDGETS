const src = props.src ?? "potlock.near/widget/Index";
const [creatorId, type, thingId] = src.split("/");
const blockHeight = props.blockHeight;

const creator = creatorId.replace(/\.[^\.]*$/, "");

const metadata =
  props.metadata ?? Social.getr(`${src}/metadata`, `${blockHeight}`);

const name = metadata.name ?? "Index";
const image = metadata.image;

const Card = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #000;
  overflow: hidden;
  padding: 23px;
`;

const displayName = metadata.name || src;

const profile = Social.getr(`${creatorId}/profile`);

if (!profile) {
  return "";
}

const stars = Social.get(
  `*/graph/star/${creatorId}/${type}/${thingId}`,
  "final"
);

if (!stars) {
  return "";
}

const accounts = Object.keys(stars);

return (
  <div className="card position-relative">
    <a
      style={{ color: "#000", textDecoration: "none" }}
      href={`https://${creator}.bos.gg`}
    >
      <div
        style={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <div className="p-3 d-flex flex-row justify-content-between">
          <div
            style={{
              maxWidth: "75%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Widget src="hack.near/widget/profile.widget" props={{ src }} />
          </div>
          <div className="m-1">
            <span className="me-2">{accounts.length} stars</span>
            <span>
              {context.accountId && (
                <Widget
                  src="hack.near/widget/star.button"
                  props={{ path: src }}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </a>
  </div>
);
