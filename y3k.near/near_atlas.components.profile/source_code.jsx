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

const name = profile.name || "No-name profile";
const image = profile.image;
const backgroundImage = profile.backgroundImage;
const tags = Object.keys(profile.tags ?? {});

const nameHeader = <h4 className="mt-0 mb-0 truncate">{name}</h4>;

return (
  <div className="bg-white shadow-md rounded overflow-hidden">
    <div className="px-4 pt-0 pb-5 bg-gray-800 relative">
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
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {showEditButton && (
        <a
          href="#/mob.near/widget/ProfileEditor"
          className="btn mt-4 text-white float-right relative z-10"
        >
          Edit profile
        </a>
      )}
      <div
        className="profile-picture inline-block"
        style={{ transform: "translateY(28px)" }}
      >
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            profile,
            fast,
            accountId,
            style: { width: "10rem", height: "10rem" },
            className: "mb-2",
            imageClassName: "rounded-full w-full h-full object-cover block",
            thumbnail: false,
          }}
          className="mb-2 rounded-full w-40 h-40"
        />
      </div>
    </div>
    <div className="bg-gray-100 px-4 pb-4">
      <div className="flex justify-between pt-3 mb-2">
        <div className="pt-12">
          <div className="flex gap-1 items-center">
            <div className="relative">
              {link ? (
                <a className="truncate text-black" href={link}>
                  {nameHeader}
                </a>
              ) : (
                nameHeader
              )}
              <div className="text-xs truncate">
                <i className="bi bi-person-fill text-secondary"></i>
                {accountId}
                <Widget
                  src="mob.near/widget/CopyButton"
                  props={{
                    text: accountId,
                    className: "btn btn-sm btn-outline-dark border-0",
                  }}
                />
                <Widget
                  src="mob.near/widget/FollowsYouBadge"
                  props={{ accountId }}
                />
              </div>
            </div>
            <div>
              <Widget
                src="mob.near/widget/FollowButton"
                props={{ accountId }}
              />
              <Widget src="mob.near/widget/PokeButton" props={{ accountId }} />
            </div>
          </div>
          <div>
            <Widget src="mob.near/widget/FollowStats" props={{ accountId }} />
          </div>
        </div>
        <div className="min-w-[12rem]">
          <Widget
            src="mob.near/widget/LinkTree"
            props={{ linktree: profile.linktree }}
          />
        </div>
      </div>

      {tags.length > 0 && (
        <div>
          {tags.map((tag, i) => (
            <span
              key={i}
              className="me-1 mb-1 font-light border border-gray-400 text-black-100"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div>
        <div className="float-right">
          <Widget
            src="mob.near/widget/CopyButton"
            props={{
              text: link,
              label: "Share",
              clipboardIcon: <i className="bi bi-share" />,
            }}
          />
        </div>
        <div className="public-tags collapse show">
          <button
            className="btn btn-sm btn-outline-gray-400 border-0"
            data-bs-toggle="collapse"
            data-bs-target={`.public-tags`}
            aria-expanded="false"
            aria-controls={"public-tags"}
          >
            <i className="bi bi-arrows-angle-expand me-1"></i>Show public tags
          </button>
        </div>
        <div className="collapse public-tags">
          <Widget src="mob.near/widget/PublicTags" props={{ accountId }} />
        </div>
      </div>
    </div>
  </div>
);
