const data = props.data;
console.log(data);

const containerStyle = {
  display: "flex", // Using flex to display contents side by side
  flexDirection: "column",
  alignItems: "center", // Vertically centering the contents
  //justifyContent: "center",
  paddingTop: "30px",
  //backgroundImage:    "url('https://ik.imagekit.io/n7h27i0lh/v960-ning-08-klhoizzv.jpeg?updatedAt=1692893730584')",
  //backgroundColor: "black",
  backgroundSize: "cover",
  backgroundPosition: "center",
  //backgroundRepeat: "no-repeat",
  minHeight: "100vh", // At least the full height of the viewport
  height: "auto",
};

const profileInfoStyle = {
  //marginLeft: "40px", // Add spacing between avatar and profile info
  paddingTop: "10px",
  textAlign: "center",
};

const headingStyle = {
  color: "#1f355c",
};

const bioStyle = {
  color: "#1f355c",
};

const imageStyle = {
  width: "200px",
  height: "200px",
  //borderRadius: "100%",
  borderRadius: "1rem",
  marginBottom: "10px",
};

// const linkCardStyle = {
//   display: "inline-block",
//   margin: "5px",
//   padding: "10px", // Add padding for a card effect
//   backgroundColor: "#4472c4", // Background color for the card
//   borderRadius: "5px", // Rounded corners for the card
//   color: "white",
//   textDecoration: "none",
//   fontSize: "20px",
//   boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Optional: adds a soft shadow for depth
// };

// const linkCardStyle = {
//   display: "block", // Changed to block
//   margin: "10px auto", // Center the block and increase spacing
//   padding: "10px 10px", // Increased padding for top and bottom
//   width: "350px", // Set to take most of the parent's width, adjust as necessary
//   backgroundColor: "rgba(255, 255, 255, 0.8)", //"#4472c4",
//   borderRadius: "10px", // Increased border-radius
//   color: "#1f355c",
//   textDecoration: "none",
//   fontSize: "20px",
//   textAlign: "center", // Center the text inside the tile
//   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//   //opacity: "0.8",
// };

// const linkArray = {
//   marginTop: "40px",
//   margin: "2rem",
// };

const linkArray = {
  marginTop: "40px",
  margin: "2rem",
  display: "flex", // Added this to make it a flex container
  flexWrap: "wrap", // Allow the items to wrap to the next line
};

// const linkCardStyle = {
//   flex: "0 0 calc(50% - 20px)", // Each item takes up half the container's width minus the margins
//   margin: "10px", // Margin to add space between cards
//   padding: "10px 10px",
//   height: "100px", // Set a fixed height
//   backgroundColor: "rgba(255, 255, 255, 0.8)",
//   borderRadius: "10px",
//   color: "#1f355c",
//   textDecoration: "none",
//   fontSize: "20px",
//   textAlign: "center",
//   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
// };

const linkCardStyle = {
  flex: "0 0 calc(50% - 20px)", // Each item takes up half the container's width minus the margins
  margin: "10px", // Margin to add space between cards
  padding: "10px 10px",
  height: "100px", // Set a fixed height
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "10px",
  color: "#1f355c",
  textDecoration: "none",
  fontSize: "20px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",

  // Add these to vertically and horizontally center the text
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

return (
  <div style={containerStyle}>
    <img src={data.avatar} alt="Musician's Avatar" style={imageStyle} />
    <div style={profileInfoStyle}>
      <h1 style={headingStyle}>{data.name}</h1>
      {/*<hr style={{ width: "90%", margin: "10px auto" }} /> */}
      {/* Added this line for the horizontal rule */}
      <h4 style={bioStyle}>{data.bio}</h4>
      {data.links && data.links.length > 0 && (
        <div style={linkArray}>
          {data.links.map((link, index) => (
            <a key={index} href={link.value} style={linkCardStyle}>
              {link.key}
            </a>
          ))}
        </div>
      )}
    </div>
  </div>
);
