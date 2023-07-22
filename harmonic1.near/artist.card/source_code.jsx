const path = props.path ?? "harmonic1.near/artist";
const [accountId, type] = path.split("/");

const metadata = Social.getr(path);
const handle = Object.keys(metadata.thing)[0];
const data = JSON.parse(metadata.thing[handle]).data;
console.log(data);

const name = data.name;
const image = metadata.avatar;

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
    </div>
  </Card>
  //</a>
);
