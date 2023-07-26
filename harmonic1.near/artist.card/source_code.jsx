const path = props.path ?? "harmonic1.near/thing/artist";
//const [accountId, type] = path.split("/");

const metadata = Social.getr(path);
//console.log(metadata);
const handle = Object.keys(metadata)[0];
//console.log(handle);
const data = JSON.parse(metadata[handle]).data;
//console.log(data);

const name = data.name;
const image = data.avatar;
const bio = data.bio;

//console.log(bio);

const imageStyle = {
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  border: "1px ridge",
  marginBottom: "10px",
};

const Card = styled.div`
  position: relative;
  width: 50%;
  border-radius: 12px;
  justify-content: center;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  textOverflow: "ellipsis";
  textAlign: "center";
  whiteSpace: "nowrap";
  padding: 20px;
`;

return (
  // Have to rewrite thing veiwer to do so.
  //<a href={`${accountId+"/widget/"}`}>
  <Card>
    <div>
      <img src={data.avatar} alt="Musician's Avatar" style={imageStyle} />
    </div>
    <div className="m-1 position-relative">
      <h5 className="card-title mb-2">{name}</h5>
      <p>{bio}</p>
    </div>
  </Card>
  //</a>
);
