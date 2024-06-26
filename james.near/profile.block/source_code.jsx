const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const fast = !!props.fast;

const link =
  props.link &&
  (props.link === true
    ? `https://near.social/mob.near/widget/ProfilePage?accountId=${accountId}`
    : props.link);

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

const showEditButton =
  profile !== undefined &&
  (!props.profile || props.showEditButton) &&
  accountId &&
  accountId === context.accountId;

const name = profile.name || "Nameless profile";
const image = profile.image;
const backgroundImage = profile.backgroundImage;
const tags = Object.keys(profile.tags ?? {});

const nameHeader = <h4 className="mt-0 mb-0 text-truncate">{name}</h4>;

const Wrapper = styled.div`
  overflow: hidden;
  margin: 0 -12px; 
`;

const shareSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="23"
    fill="currentColor"
    viewBox="0 0 16 16"
    stroke="currentColor"
    strokeWidth="0.363"
  >
    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
  </svg>
);

return (
  <Wrapper>
    <div className="px-4 pt-0 pb-5 bg-dark position-relative">
      {backgroundImage && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: backgroundImage,
            alt: "profile background",
            className: "position-absolute w-100 h-100",
            style: { objectFit: "cover", left: 0, top: 0 },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      )}
      <div
        className="profile-picture d-inline-block"
        style={{ transform: "translateY(7rem)" }}
      >
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            profile,
            fast,
            accountId,
            style: { width: "10rem", height: "10rem" },
            className: "mb-2",
            imageClassName: "rounded-circle w-100 h-100 img-thumbnail d-block",
            thumbnail: false,
          }}
        />
      </div>
    </div>
    <div style={{ backgroundColor: "#000" }} className="px-4 pb-4">
      <div
        className="d-flex justify-content-end align-items-center"
        style={{ height: "4rem" }}
      >
        {showEditButton && (
          <div className="mt-3">
            <a
              href="/mob.near/widget/ProfileEditor"
              className="btn btn-outline-light rounded-5"
            >
              Edit profile
            </a>
          </div>
        )}
      </div>
      <div className="d-md-flex justify-content-between mb-2 float-clear">
        <div>
          <div className="me-2 d-sm-flex gap-1 flex-row align-items-center">
            <div style={{ color: "#fff" }} className="me-2 position-relative">
              <div className="d-flex text-truncate mb-2">
                {link ? (
                  <a className="text-truncate text-light" href={link}>
                    {nameHeader}
                  </a>
                ) : (
                  nameHeader
                )}
                <div className="ms-2">
                  <Widget
                    src="james.near/widget/BuilderHat"
                    props={{ accountId, color: props.color }}
                  />
                </div>
              </div>
              <div className="small text-truncate">
                <i className="bi bi-person-fill text-light m-1"></i>
                {accountId}
                <span className="ms-2">
                  <Widget
                    src="james.near/widget/CopyButton"
                    props={{
                      text: accountId,
                      className: "btn btn-sm btn-outline-light",
                    }}
                  />
                </span>
                <Widget
                  src="james.near/widget/FollowsYouBadge"
                  props={{ accountId }}
                />
              </div>
            </div>

            <div>
              <Widget
                src="james.near/widget/FollowButton"
                props={{ accountId }}
              />
              <Widget
                src="james.near/widget/request.collab"
                props={{ accountId }}
              />
            </div>
          </div>
          <div className="mt-2">
            <Widget src="james.near/widget/FollowStats" props={{ accountId }} />
          </div>
        </div>
        <div style={{ minWidth: "12rem" }}>
          <Widget
            src="mob.near/widget/LinkTree"
            props={{ linktree: profile.linktree }}
          />
        </div>
      </div>

      {tags.length > 0 && (
        <div className="mb-2">
          {tags.map((tag, i) => (
            <span key={i} className="me-1 mb-1 fw-bold badge text-bg-success">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div>
        <div className="float-end">
          <Widget
            src="james.near/widget/CopyButton"
            props={{
              text: link,
              label: "Share",
              clipboardIcon: shareSvg,
              className: "btn btn-outline-light rounded-5",
            }}
          />
        </div>

        <Widget src="hack.near/widget/every.tag" props={{ accountId }} />
      </div>
    </div>
  </Wrapper>
);
