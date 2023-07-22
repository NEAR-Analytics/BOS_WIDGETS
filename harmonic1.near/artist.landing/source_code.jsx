const data = props.data;
const containerStyle = {
  textAlign: "center",
  margin: "20px",
};

const headingStyle = {
  color: "#333",
};

const imageStyle = {
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  border: "1px ridge",
  marginBottom: "10px",
};

const linkStyle = {
  display: "inline-block",
  margin: "5px",
  color: "#333",
  textDecoration: "none",
};

const imageContainer = {
  textAlign: "center",
};

return (
  <div style={containerStyle}>
    <h1 style={headingStyle}>{data.name}</h1>
    <div style={imageContainer}>
      <img src={data.avatar} alt="Musician's Avatar" style={imageStyle} />
    </div>
    <p>{data.bio}</p>
    {data.links && data.links.length > 0 && (
      <div>
        {data.links.map((link, index) => (
          <a key={index} href={link.value} style={linkStyle}>
            {link.key}
          </a>
        ))}
      </div>
    )}
  </div>
);
