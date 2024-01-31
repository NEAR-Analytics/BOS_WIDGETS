const ProgressBar = ({ value, max }) => {
  // Calculate the width of the progress bar as a percentage
  const width = (value / max) * 100;

  const containerStyle = {
    border: "2px outset #000",
    backgroundColor: "#f2f1e9", // Off-white primary from https://near.org/brand
    padding: "1px",
    height: "23px",
    width: "100%",
    borderRadius: "3px",
    overflow: "hidden",
  };

  const progressBarStyle = {
    height: "100%",
    width: `${width}%`,
    backgroundColor: "#9797ff", // Accent purple from https://near.org/brand
    backgroundImage:
      "linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.4) 25%, rgba(255, 255, 255, 0.4) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.4) 75%)",
    backgroundSize: "19px 19px",
    backgroundPosition: `${width / 6}px 0`, // Have it move like a barber shop
    transition: "width 1s cubic-bezier(0.6, -0.6, 0.6, 1.9)",
  };

  return (
    <div style={containerStyle}>
      <div style={progressBarStyle}></div>
    </div>
  );
};

return ProgressBar;
