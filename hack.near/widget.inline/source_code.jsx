const src = props.src ?? "hack.near/widget/Academy";
const [accountId, widget, widgetName] = src.split("/");
const blockHeight = props.blockHeight;

const accountName = accountId.replace(/\.[^\.]*$/, "");

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

const profile = Social.getr(`${accountId}/profile`);

if (!profile) {
  return "";
}

return (
  <div className="card position-relative">
    <a
      style={{ color: "#000", textDecoration: "none" }}
      href={`https://${accountName}.bos.gg`}
    >
      <div
        style={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <div className="p-3 d-flex flex-row justify-content-between">
          <div
            style={{
              maxWidth: "75%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Widget src="hack.near/widget/profile.widget" props={{ src }} />
          </div>
          <div className="m-1">
            <Widget src="hack.near/widget/star.button" props={{ path: src }} />
          </div>
        </div>
      </div>
    </a>
  </div>
);
