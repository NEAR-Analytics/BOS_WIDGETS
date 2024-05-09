const cardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column", // To align children vertically
  minHeight: "80vh",
  backgroundColor: "#151718",
  color: "#fff",
};

const titleStyle = {
  fontSize: "2.25rem",
  fontWeight: "bold",
  marginBottom: "1.5rem",
};

return (
  <>
    <div style={cardStyle} className="text-center">
      <h3 style={titleStyle} className="mt-5">
        Join our Network of Artists
      </h3>
      <div className="mb-5">
        <Widget src="abdullahi3000.near/widget/artist.feed" />
      </div>
    </div>
  </>
);
