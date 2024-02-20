const LessonLinks = () => {
  const linkStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#007bff",
    textDecoration: "none",
  };

  const linkContainerStyle = {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "5px",
    margin: "5px 0",
    textAlign: "center",
  };

  const ownerId = "xvii.near";

  const lessonNames = [
    "Introduction to Blockchain and NEAR Protocol",
    "Data Retrieval and Analysis",
    "Data Transformation and Visualization",
    "Advanced Data Evaluation Methods",
    "Research Topic Identification",
    "Governance in Blockchain",
    "Decentralized Finance (DeFi)",
    "Non-Fungible Tokens (NFTs)",
    "Blockchain in Gaming",
    "Advanced Topics in Cryptography",
    "Zero-Knowledge Proofs",
  ];

  // Temporary link for all lessons
  const temporaryLink = "https://hackmd.io/@XVII/LPCS";

  return (
    <div>
      <Widget src={`${ownerId}/widget/Resources.Header`} />
      <div style={linkContainerStyle}>
        <a
          style={linkStyle}
          href="https://hackmd.io/@doulos819/NRC"
          target="_blank"
        >
          Syllabus
        </a>
      </div>
      {[...Array(11).keys()].map((num) => (
        <div style={linkContainerStyle} key={num}>
          <a
            style={linkStyle}
            href={temporaryLink} // Use temporaryLink for all lessons
            target="_blank"
          >
            {`Lesson ${num + 1}: ${lessonNames[num]}`}{" "}
            {/* Modify to include lesson names */}
          </a>
        </div>
      ))}
    </div>
  );
};

return (
  <div>
    <LessonLinks />
  </div>
);
