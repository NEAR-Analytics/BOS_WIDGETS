const daoId = props.daoId ?? "nearbuilders.near";

const profile = props.profile ?? Social.getr(`${daoId}/profile`);
const fast = props.fast ?? !props.profile;

const name = profile.name;
const description = profile.description;
const tags = Object.keys(profile.tags ?? {});

const imgWrapperStyle = { height: "3em", width: "3em" };

return (
  <div className="d-flex flex-row">
    <div className="me-2">
      <a
        style={{ color: "#000", textDecoration: "none" }}
        href="https://nearbuilders.org"
      >
        <Widget
          src="mob.near/widget/ProfileImage"
          loading={<div style={imgWrapperStyle} />}
          props={{
            fast,
            profile,
            accountId: "build.sputnik-dao.near",
            widgetName,
            style: imgWrapperStyle,
            imageClassName: "rounded-circle w-100 h-100",
          }}
        />
      </a>
    </div>
    <div className="text-truncate">
      <div className="text-truncate">
        <span className="fw-bold me-1">
          <a
            style={{ color: "#000", textDecoration: "none" }}
            href="https://nearbuilders.org"
          >
            {name}
          </a>
        </span>
        <Widget src="james.near/widget/BuilderHat" props={{ accountId }} />
      </div>
      <div className="text-truncate text-muted">
        <small>
          <span className="font-monospace">
            <a
              style={{ color: "#333", textDecoration: "none" }}
              href="https://devs.near.social"
            >
              @devs.near
            </a>
          </span>
        </small>
      </div>
    </div>
  </div>
);
