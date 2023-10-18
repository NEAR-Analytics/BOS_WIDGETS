const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const showEditButton =
  !props.profile && accountId && accountId === context.accountId;

const name = profile.name;
const description = profile.description;
const image = profile.image;

const linktree = profile.linktree;

return (
  <div className="profile">
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        profile,
        accountId,
        className: "float-start d-inline-block me-2",
      }}
    />
    <div className="profile-info d-inline-block" style={{ maxWidth: "16em" }}>
      <div className="profile-name text-truncate">
        {name || "No-name profile"}
      </div>
      <div className="profile-description">{description}</div>
      <div className="profile-links d-flex">
        <div className="d-inline-block profile-account text-secondary text-truncate">
          @{accountId}
        </div>
        {linktree.website && (
          <div className="ms-1 d-inline-block">
            <a href={`https://${linktree.website.replace("https://", "")}`}>
              <i className="bi bi-globe2 text-secondary"></i>
            </a>
          </div>
        )}
        {linktree.github && (
          <div className="ms-1 d-inline-block">
            <a
              href={`https://github.com/${linktree.github.replace(
                "https://github.com/",
                ""
              )}`}
            >
              <i className="bi bi-github text-secondary"></i>
            </a>
          </div>
        )}
        {linktree.twitter && (
          <div className="ms-1 d-inline-block">
            <a
              href={`https://twitter.com/${linktree.twitter.replace(
                "https://twitter.com/",
                ""
              )}`}
            >
              <i className="bi bi-twitter text-secondary"></i>
            </a>
          </div>
        )}
        {linktree.telegram && (
          <div className="ms-1 d-inline-block">
            <a
              href={`https://t.me/${linktree.telegram.replace(
                "https://t.me/",
                ""
              )}`}
            >
              <i className="bi bi-telegram text-secondary"></i>
            </a>
          </div>
        )}
      </div>
    </div>
    {showEditButton && (
      <a
        href="#/mob.near/widget/ProfileEditor"
        className="profile-edit btn btn-sm btn-outline-secondary border-0 align-top"
      >
        Edit
      </a>
    )}
    <br />
    <br />
    <div>
      Send
      <br />
      <br />
      <a
        href={`https://send.doe.cx/${context.accountId}/${accountId}/0.01`}
        class="btn btn-primary"
      >
        0.01 Ⓝ
      </a>
      <a
        href={`https://send.doe.cx/${context.accountId}/${accountId}/0.05`}
        class="btn btn-primary"
      >
        0.05 Ⓝ
      </a>
      <a
        href={`https://send.doe.cx/${context.accountId}/${accountId}/0.1`}
        class="btn btn-primary"
      >
        0.1 Ⓝ
      </a>
      <a
        href={`https://send.doe.cx/${context.accountId}/${accountId}/0.3`}
        class="btn btn-primary"
      >
        0.3 Ⓝ
      </a>
      <a
        href={`https://send.doe.cx/${context.accountId}/${accountId}/0.5`}
        class="btn btn-primary"
      >
        0.5 Ⓝ
      </a>
      <a
        href={`https://send.doe.cx/${context.accountId}/${accountId}/1`}
        class="btn btn-primary"
      >
        1 Ⓝ
      </a>
      <a
        href={`https://send.doe.cx/${context.accountId}/${accountId}/3`}
        class="btn btn-primary"
      >
        3 Ⓝ
      </a>
      <a
        href={`https://send.doe.cx/${context.accountId}/${accountId}/5`}
        class="btn btn-primary"
      >
        5 Ⓝ
      </a>
      <a
        href={`https://send.doe.cx/${context.accountId}/${accountId}/10`}
        class="btn btn-primary"
      >
        10 Ⓝ
      </a>
      <a
        href={`https://send.doe.cx/${context.accountId}/${accountId}/25`}
        class="btn btn-primary"
      >
        25 Ⓝ
      </a>
      <a
        href={`https://send.doe.cx/${context.accountId}/${accountId}/50`}
        class="btn btn-primary"
      >
        50 Ⓝ
      </a>
      <a
        href={`https://send.doe.cx/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
    </div>
  </div>
);
