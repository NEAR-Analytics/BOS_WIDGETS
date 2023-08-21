// const data = props.data;
// console.log(data);

// const containerStyle = {
//   textAlign: "center",
//   margin: "20px",
// };

// const headingStyle = {
//   color: "#333",
// };

// const imageStyle = {
//   width: "200px",
//   height: "200px",
//   borderRadius: "50%",
//   marginBottom: "10px",
// };

// const linkStyle = {
//   display: "inline-block",
//   margin: "5px",
//   color: "blue",
//   textDecoration: "none",
//   fontSize: "20px",
// };

// return (
//   <div style={containerStyle}>
//     <h1 style={headingStyle}>{data.name}</h1>
//     <img src={data.avatar} alt="Musician's Avatar" style={imageStyle} />
//     <h4>{data.bio}</h4>
//     {data.links && data.links.length > 0 && (
//       <div>
//         {data.links.map((link, index) => (
//           <a key={index} href={link.value} style={linkStyle}>
//             {link.key}
//           </a>
//         ))}
//       </div>
//     )}
//   </div>
// );

const data = props.data;
console.log(data);

const containerStyle = {
  display: "flex", // Using flex to display contents side by side
  flexDirection: "column",
  alignItems: "center", // Vertically centering the contents
  justifyContent: "center",
  margin: "20px",
};

const profileInfoStyle = {
  //marginLeft: "40px", // Add spacing between avatar and profile info
  paddingTop: "10px",
  textAlign: "center",
};

const headingStyle = {
  color: "#333",
};

const imageStyle = {
  width: "300px",
  height: "300px",
  //borderRadius: "100%",
  borderRadius: "1rem",
  marginBottom: "10px",
};

const linkCardStyle = {
  display: "inline-block",
  margin: "5px",
  padding: "10px", // Add padding for a card effect
  backgroundColor: "#4472c4", // Background color for the card
  borderRadius: "5px", // Rounded corners for the card
  color: "white",
  textDecoration: "none",
  fontSize: "20px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Optional: adds a soft shadow for depth
};

return (
  <div style={containerStyle}>
    <img src={data.avatar} alt="Musician's Avatar" style={imageStyle} />
    <div style={profileInfoStyle}>
      <h1 style={headingStyle}>{data.name}</h1>
      <h4>{data.bio}</h4>
      {data.links && data.links.length > 0 && (
        <div>
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
