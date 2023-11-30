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

const nameHeader = <h4 className="mt-0 mb-0 text-truncate">{name}</h4>;

const Wrapper = styled.div`
  overflow: hidden;
  margin: 0 -12px; 
`;

const shareSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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
    return (
    <div className="bg-gray-800 p-4 text-white">
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        {backgroundImage && (
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: backgroundImage,
              alt: "profile background",
              className: "w-full h-48 object-cover",
              style: { objectFit: "cover", left: 0, top: 0 },
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
            }}
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

        <div className="relative p-4">
          <div className="flex justify-between items-end">
            <div className="flex space-x-4">
              <Widget
                src="mob.near/widget/ProfileImage"
                props={{
                  profile,
                  fast,
                  accountId,
                  style: { width: "10rem", height: "10rem" },
                  className: "mb-2",
                  imageClassName:
                    "w-20 h-20 rounded-full border-4 border-gray-800",
                  thumbnail: false,
                }}
              />
              <div>
                <h2 className="text-2xl font-semibold">
                  {link ? (
                    <a className="text-truncate text-dark" href={link}>
                      {nameHeader}
                    </a>
                  ) : (
                    nameHeader
                  )}
                </h2>
                <p className="text-sm text-gray-400">
                  <i className="bi bi-person-fill text-secondary"></i>
                  {accountId}
                  <Widget
                    src="mob.near/widget/CopyButton"
                    props={{
                      text: accountId,
                      className: "btn btn-sm btn-outline-dark border-0",
                    }}
                  />
                </p>
                <div className="flex space-x-2 mt-2">
                  <Widget
                    src="mob.near/widget/FollowStats"
                    props={{ accountId }}
                  />
                </div>
                <div className="flex flex-wrap mt-2">
                  {tags.length > 0 && (
                    <div>
                      {tags.map((tag, i) => (
                        <span
                          key={index}
                          className="text-xs py-1 px-2 bg-gray-700 rounded m-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded transition duration-300">
              Edit profile
            </button>
          </div>

          <div className="flex space-x-4 mt-8 justify-end">
            <Widget
              src="mob.near/widget/LinkTree"
              props={{ linktree: profile.linktree }}
            />
          </div>
        </div>
      </div>
    </div>
    );
  </Wrapper>
);
