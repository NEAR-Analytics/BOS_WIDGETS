const data = props.data;
console.log(data);

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
  marginBottom: "10px",
};

const linkStyle = {
  display: "inline-block",
  margin: "5px",
  color: "#333",
  textDecoration: "none",
};

return (
  <div style={containerStyle}>
    <h1 style={headingStyle}>{data.name}</h1>
    <img src={data.avatar} alt="Musician's Avatar" style={imageStyle} />
    <p>Bio goes here...</p>
    <div>
      {data.links.map((link, index) => (
        <a key={index} href={link.value} style={linkStyle}>
          {link.key}
        </a>
      ))}
    </div>
  </div>
);
