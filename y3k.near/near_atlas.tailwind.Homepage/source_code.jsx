const accountId = props.debugAccountId ?? context.accountId;

// change this back to !accountId
if (!accountId) {
}

const profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "";
}

const name = profile.name;
const image = profile.image;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const pills = [
  { id: "overview", title: "Overview" },
  { id: "posts", title: "Posts" },
  { id: "nfts", title: "NFTs" },
  { id: "widget", title: "Widgets" },
];

return (
  <div>
    <div>
      {accountId && !name && (
        <div classNameName="alert alert-warning rounded-4 mb-3">
          <p>Your profile is missing a name.</p>
          {editProfileButton}
        </div>
      )}

      {accountId &&
        !image.ipfs_cid &&
        (!image.nft.contractId || !image.nft.tokenId) &&
        !image.url && (
          <div classNameName="alert alert-warning rounded-4 mb-3">
            <p>Your profile is missing a picture.</p>
            {editProfileButton}
          </div>
        )}
    </div>
  </div>
);
