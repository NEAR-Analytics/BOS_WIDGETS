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

return (
  <Theme>
    <div className="container-fluid mt-3">
      <div className="navbar bg-body-tertiary border rounded px-3 mb-3">
        <a className="navbar-brand" href="#">
          <h2>nearbyme.social</h2>
        </a>
      </div>
      <img className="profileImage" src={url} alt="profile" />
      <div style={{ paddingBlock: 10 }}>
        <h2>{name}</h2>
        <p>@{accountId}</p>
      </div>
    </div>
  </Theme>
);
