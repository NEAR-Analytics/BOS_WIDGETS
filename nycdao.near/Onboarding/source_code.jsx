const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return (
    <div>
      <Widget src="readylayerone.near/widget/ShardDog-CreateAFreeWallet" />
    </div>
  );
}

const data = Social.keys(`${accountId}/widget/*`, "final", {
  return_type: "BlockHeight",
});

const page = Social.getr(`${accountId}/page`);

if (page === null) {
  return "Loading page...";
}

const name = page.name;
const image = page.image;

const editPageButton = (
  <div>
    <a
      className="btn btn-success"
      href="#/hack.near/widget/Project.Page.Editor"
    >
      Edit Your Page
    </a>
  </div>
);

if (!name) {
  return (
    <div className="alert alert-warning rounded-4 m-2">
      <p>Your page is missing a title.</p>
      {editPageButton}
    </div>
  );
}

if (
  !image.ipfs_cid &&
  (!image.nft.contractId || !image.nft.tokenId) &&
  !image.url
) {
  return (
    <div className="alert alert-warning rounded-4 m-2">
      <p>Your page is missing a logo.</p>
      {editPageButton}
    </div>
  );
}

if (data !== null) {
  return (
    <div className="alert alert-warning rounded-4 m-2">
      <p>Create your first bOS widget!</p>
      {editPageButton}
    </div>
  );
}

return <></>;
