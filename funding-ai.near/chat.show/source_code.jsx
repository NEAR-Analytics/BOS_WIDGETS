const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  height:100vh;
  background-image: linear-gradient(to right top, #cad5fe, #ced9fe, #d3ddff, #d7e0ff, #dce4ff);
`;

const Row = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  overflow: auto;
`;

const Header = styled.div`
  display:flex;
  width:100%;
  justify-content:space-between;
  font-size: 0.875rem; 
  line-height: 1.25rem; 
  padding: 15px 20px;
  background: #acbafc;
  .logo{
    display:flex;
    color: #3730a3;
    font-size:20px;
    font-weight:700;
    text-decoration:none;
  }
  .info{
    margin-left: 10px;
    display:flex;
    gap:10px;
    align-items:center;
  }
  .icon{
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 50%;
    background: #9aa8fb;
    padding: 2px;
  }
`;

const Content = styled.div`
  display:flex;
  justify-content:center;
  flex-direction:column;
  
`;

const SearchBar = styled.div`
  position:relative;
  width:80%;
  display:flex;
  margin: 3rem auto;
  flex-direction:column;
  @media screen and (max-width:768px){
    width:100%;
    padding:0 10px;
  }

  .title{
    color:#807eca;
    margin-bottom:5px;
  }
  input{
    &::placeholder{
      color:#9b97d1;
    }
  }
  .search{
    width:100%;
    border-radius:15px;
    border: 2px solid #c7d2fe;
    padding: 10px 20px;
    outline:none;
    :focus{
      border: 2px solid #3730a3;
    }
    :hover{
      border: 2px solid #3730a3;
    }
    &::placeholder{
      color:#9b97d1;
    }
    @media screen and (max-width:768px){
      padding: 15px 20px;
    }
  }
  .arrow{
    position:absolute;
    right:10px;
    top: 50%;
    cursor:default;
    outline:none;
    border:2px solid #a5b4fc;
    background: none;
    border-radius:50px;
    @media screen and (max-width:768px){
      top:52%;
      right:20px;
    }
  }
  .button-arrow{
    border-radius: 100%;
    outline:none;
    border:none;
    background:#5d76cb;
  }
`;

const View = styled.div`
    padding: 0 10px;
`;

const ListResult = styled.div`
    display:flex;
    flex-direction:column;
    border: 2px solid #c7d2fe;
    border-radius:15px;
    color:#7c7bc8;
    background:#eef2ff;
    max-width:80%;
    margin: 0 auto;
    height:100%;
    //max-height:100%;
    @media screen and (max-width:768px){
        max-width:100%;
    }
    .header{
        margin-top:10px;
        margin-left:15px;
        font-size:16px;
        font-weight:600;
    }
    .listItem{
        display:flex;
        flex-direction:column;
        gap:20px;
        margin-top:10px;
        padding-bottom:20px;
        padding:0 10px;
        padding-bottom:20px;
        @media screen and (max-width:768px){
            padding:0 5px;
        }
    }
    .item{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
        gap:10px;
        width:100%;
        border: 1px solid #a5b4fc;
        min-height:20px;
        border-radius:15px;
        padding:10px 20px;

    }
    .image{
        border-radius:50px;
        border: 2px solid #c7d2fe;
        width:50px;
        height:50px;
    }
    .project{
        display:flex;
        flex-direction:column;
        gap:2px;
    }
    .title{
        color:#7c7bc8;
        font-size:15px;
        font-weight:500;
        @media screen and (max-width:768px){
            font-size:12px;
        }
    }
    .decs{
        font-size:11px;
        @media screen and (max-width:768px){
            font-size:10px;
        }
    }
`;
const [value, setValue] = useState(props.search || "public good");
const requestOptions = {
  method: "POST",
  body: JSON.stringify({ messages: value }),
  header: {
    "Content-Type": "application/json",
  },
};
const res = fetch(
  "https://chat-ai.dropwallet.io/api/chat-potlock",
  requestOptions
);
console.log("Res", res);
const [projectsId, setProjectsId] = useState(res.body || []);
const [data, setData] = useState([]);
const [name, setName] = useState("");
const [image, setImage] = useState("");
const [description, setDescription] = useState("");
const hanleInput = (e) => {
  const value = e.target.value;
  setValue(value);
};
const profileData = [];
res.body &&
  res.body.forEach((projectId) => {
    // console.log(projectId);
    if (projectId != undefined) {
      const datas = Social.getr(`${projectId}/profile`);
      if (datas) {
        profileData.push(datas);
      }
    }
  });
//console.log(profileData);
return (
  <Container>
    <Row>
      <Content>
        <SearchBar>
          <div class="title">Results for</div>
          <div>
            <input
              value={value}
              onChange={hanleInput}
              class="search"
              type="text"
            />
            <button class="arrow" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#5950e6"
                viewBox="0 0 256 256"
              >
                <path d="M244,56v48a12,12,0,0,1-12,12H184a12,12,0,1,1,0-24H201.1l-19-17.38c-.13-.12-.26-.24-.38-.37A76,76,0,1,0,127,204h1a75.53,75.53,0,0,0,52.15-20.72,12,12,0,0,1,16.49,17.45A99.45,99.45,0,0,1,128,228h-1.37A100,100,0,1,1,198.51,57.06L220,76.72V56a12,12,0,0,1,24,0Z"></path>
              </svg>
            </button>
          </div>
        </SearchBar>
        <View>
          <ListResult>
            <div class="header">ALL PROJECT</div>
            <div class="listItem">
              {profileData.map((dt) => (
                <div class="item">
                  {dt.image.url ? (
                    <img class="image" src={dt.image.url} alt="profile" />
                  ) : (
                    <img
                      class="image"
                      src={`https://ipfs.near.social/ipfs/` + dt.image.ipfs_cid}
                      alt="profile"
                    />
                  )}
                  <div class="project">
                    <div class="title">{dt.name}</div>
                    <div class="decs">{dt.description.split(/"/)}</div>
                  </div>
                </div>
              ))}
            </div>
          </ListResult>
        </View>
      </Content>
    </Row>
  </Container>
);
