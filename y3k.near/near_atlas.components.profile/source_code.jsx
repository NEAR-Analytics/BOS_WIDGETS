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
