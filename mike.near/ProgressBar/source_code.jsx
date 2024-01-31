const ProgressBar = ({ value, max }) => {
  const width = (value / max) * 100;

  const containerStyle = {
    border: "2px outset #000",
    backgroundColor: "#f2f1e9", // Off-white background
    padding: "1px",
    height: "23px",
    width: "100%", // Ensure this is effectively 100% of a parent with a defined width
    borderRadius: "3px",
    overflow: "hidden",
    display: "flex", // Use flex to better control the inner bar
  };

  let progressBarStyle = {
    height: "100%",
    width: `${width}%`,
    backgroundColor: "#9797ff", // Accent purple
    transition: "width 0.3s cubic-bezier(0.6, -0.6, 0.6, 1.9)",
    display: "block",
  };

  return (
    <div style={containerStyle}>
      <div style={progressBarStyle}></div>
    </div>
  );
};
