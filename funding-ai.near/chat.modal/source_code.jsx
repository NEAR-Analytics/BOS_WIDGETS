const profileData = props.profileData || [];
const [name, setName] = useState("");
const [accountId, setAccountId] = useState("");
const [image, setImage] = useState("");
const [description, setDescription] = useState("");
const [tags, setTags] = useState([]);
const [teams, setTeams] = useState([]);
const hanleClick = (data, accountId) => {
  if (data.accountId == accountId) {
    setAccountId(accountId);
    setName(data.data.name);
    setImage(data.data.image.ipfs_cid || data.data.image.url);
    setDescription(data.data.description);
    console.log(data.data.tags);
    if (data.data.tags) setTags(Object.keys(data.data.tags).flat());
  }
};
const Header = styled.div`
  display:flex;
  flex-direction:row;
  align-items:top;
  justify-content:space-between;
  gap:10px;
  padding:10px 15px;
  .navLeft{
    display:flex;
    gap:10px;
    flex-direction:row;
  }
  .title{
    display:flex;
    flex-direction:column;
    gap:5px;
  }
  .id{
    font-size:14px;
  }
`;
const Description = styled.div`
  display:flex;
  flex-direction:column;
  gap:15px;
  padding:10px 15px;
  font-size:16px;
  .title{
    font-size:18px;
    font-weight:700;
  }
  .desc{
    background-image: linear-gradient(to right top, #cad5fe, #ced9fe, #d3ddff, #d7e0ff, #dce4ff);
    padding: 10px 15px;
    border-radius:10px;
  }
  .tags{
    background-image: linear-gradient(to right top, #cad5fe, #ced9fe, #d3ddff, #d7e0ff, #dce4ff);
    padding: 10px 15px;
    border-radius:10px;
    display:flex;
    flex-direction:row;
    gap:20px;
  }
  .tag{
    font-weight:600;
    border:1px solid white;
    padding:5px 10px;
    box-shadow: 2px 2px white;
  }
  .teams{
    background-image: linear-gradient(to right top, #cad5fe, #ced9fe, #d3ddff, #d7e0ff, #dce4ff);
    padding: 10px 10px;
    border-radius:15px;
  }
  .social{
    background-image: linear-gradient(to right top, #cad5fe, #ced9fe, #d3ddff, #d7e0ff, #dce4ff);
    padding: 10px 15px;
    border-radius:10px;
  }
`;
return (
  <>
    {profileData.length > 0 &&
      profileData.map((dt) => (
        <div
          class="item"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => hanleClick(dt, dt.accountId)}
        >
          {dt.data.image.url ? (
            <img class="image" src={dt.data.image.url} alt="profile" />
          ) : (
            <img
              class="image"
              src={`https://ipfs.near.social/ipfs/` + dt.data.image.ipfs_cid}
              alt="profile"
            />
          )}
          <div class="project">
            <div class="title">{dt.data.name}</div>
            <div class="decs">
              {dt.data.description.length > 80
                ? dt.data.description.slice(0, 80) + "..."
                : dt.data.description}
            </div>
          </div>
        </div>
      ))}
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      style={{ padding: "10px 15px" }}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <Header>
            <div class="navLeft">
              {image.startsWith("https") ? (
                <img class="image" src={image} alt="profile" />
              ) : (
                <img
                  class="image"
                  src={`https://ipfs.near.social/ipfs/` + image}
                  alt="profile"
                />
              )}
              <div class="title">
                <h5 class="modal-title" id="staticBackdropLabel">
                  {name}
                </h5>
                <div class="id">@{accountId}</div>
              </div>
            </div>
            <div class="navRight">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </Header>
          <Description class="modal-body">
            <div>Overview</div>
            <div class="desc">{description}</div>
            <div>Tags</div>
            <div class="tags">
              {tags.map((tag) => (
                <div class="tag">{tag}</div>
              ))}
            </div>
            <div>Team Member</div>
            <div>Social</div>
          </Description>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>{" "}
  </>
);
