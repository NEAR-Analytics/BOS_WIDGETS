const categories = ["ALL", "A", "B", "C", "D"];
  State.init({ activeTab: 0 });

const tabNavigationStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontFamily: "Arial, sans-serif",
  margin: "20px",
};

const tabButtonsStyle = {
  display: "flex",
  gap: "10px",
};

const tabButtonStyle = {
  backgroundColor: "#f0f0f0",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px 8px 0 0",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const activeTabButtonStyle = {
  backgroundColor: "#333",
  color: "white",
};

const tabContentStyle = {
  border: "1px solid #ddd",
  borderRadius: "0 0 8px 8px",
  padding: "20px",
  width: "300px",
  backgroundColor: "white",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  marginTop: "-1px",
};

const handleTabClick = (category) => {
  State.update({ activeTab: category }); // Update state using State.update
};

return (
  <div style={tabNavigationStyle}>
    <div style={tabButtonsStyle}>
      {categories.map((category) => (
        <button
          key={category}
          style={{
            ...tabButtonStyle,
            ...(activeTab === category ? activeTabButtonStyle : {}),
          }}
          onClick={() => handleTabClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
    <div style={tabContentStyle}>
      {activeTab === "ALL" && <p>ALL CONTENTS </p>}
      {activeTab === "A" && <p>A CONTENTS</p>}
      {activeTab === "B" && <p>B CONTENTS</p>}
      {activeTab === "C" && <p>C CONTENTS</p>}
      {activeTab === "D" && <p>D CONTENTS</p>}
    </div>
  </div>
);
