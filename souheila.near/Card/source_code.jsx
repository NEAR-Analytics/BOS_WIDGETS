const cardStyle = {
  container: {
    width: "320px",
    height: "250px",
    padding: "20px",
    color: "white",
    background:
      "linear-gradient(#212121, #212121) padding-box, linear-gradient(145deg, transparent 35%,#e81cff, #40c9ff) border-box",
    border: "2px solid transparent",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transformOrigin: "right bottom",
    transition: "all 0.6s cubic-bezier(0.23, 1, 0.320, 1)",
    boxShadow: "0 0 2px 1px #3457D5",
    margin: "40px 20px",
  },
  mainContent: {
    flex: 1,
  },
  header: {
    fontWeight: 600,
    color: "#717171",
    marginRight: "4px",
  },
  headerSpan: {
    fontWeight: 600,
    color: "#ffffff", // Change this to the desired color
    marginRight: "4px",
  },
  heading: {
    fontSize: "24px",
    margin: "24px 0 16px",
    fontWeight: 600,
  },
  categories: {
    display: "flex",
    gap: "8px",
  },
  categorySpan: {
    backgroundColor: "#e81cff",
    padding: "4px 8px",
    fontWeight: 600,
    textTransform: "uppercase",
    fontSize: "12px",
    borderRadius: "50em",
  },
  footer: {
    fontWeight: 600,
    color: "#717171",
    marginRight: "4px",
  },
};

return (
  <div style={cardStyle.container}>
    <div style={cardStyle.mainContent}>
      <div style={cardStyle.header}>
        <span>Made with</span>
        <span style={cardStyle.headerSpan}>love and support</span>
      </div>
      <p style={cardStyle.heading}>Moving from React to Jutsu</p>
      <div style={cardStyle.categories}>
        <span>React</span>
        <span>Jutsu</span>
      </div>
      <div style={cardStyle.footer}>by Learned and Tested</div>
    </div>
  </div>
);
