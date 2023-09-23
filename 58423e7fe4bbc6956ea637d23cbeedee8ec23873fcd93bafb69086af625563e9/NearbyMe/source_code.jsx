const accountId = props.accountId || context.accountId;

console.log("accountId: ", accountId);
const profile = Social.getr(`${accountId}/profile`);

const name = profile?.name;
const image = profile?.image;
const imageUrl = image.ipfs_cid
  ? `https://ipfs.near.social/ipfs/${image?.ipfs_cid}`
  : "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const Theme = styled.div`
  ${
    fetch(
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    ).body
  }
`;

const Banner = () => (
  <div className="navbar bg-body-tertiary border rounded px-3 mb-3 justify-content-center">
    <a className="navbar-brand" href="#">
      <h2>nearbyme.social</h2>
    </a>
  </div>
);

const ProfileCard = () => (
  <div className="navbar bg-body-tertiary border rounded px-3 mb-3">
    <div class="row">
      <div class="col-1 mt-4">
        <img
          className="profileImage"
          src={imageUrl}
          style={{ height: "40px" }}
        />
      </div>
      <div class="col-5 pt-3">
        <h2>{name}</h2>
        <p>@{accountId}</p>
      </div>
    </div>
  </div>
);
return (
  <Theme>
    <div className="container-fluid mt-3">
      <Banner />
      <ProfileCard />
    </div>
  </Theme>
);
