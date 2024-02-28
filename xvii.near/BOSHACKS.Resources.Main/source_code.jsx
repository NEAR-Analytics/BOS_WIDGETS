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

  // Array of lesson URLs
  const lessonURLs = [
    "https://hackmd.io/@doulos819/ncr-01",
    "https://hackmd.io/@doulos819/ncr-02",
    "https://hackmd.io/@doulos819/ncr-03",
    "https://hackmd.io/@doulos819/ncr-04",
    "https://hackmd.io/@doulos819/ncr-05",
    "https://hackmd.io/@doulos819/ncr-06",
    "https://hackmd.io/@doulos819/ncr-07",
    "https://hackmd.io/@doulos819/ncr-08",
    "https://hackmd.io/@doulos819/ncr-09",
    "https://hackmd.io/@doulos819/ncr-10",
    "https://hackmd.io/@doulos819/ncr-11",
  ];

  return (
    <div>
      {/* Widget component */}
      <Widget src={`${ownerId}/widget/Resources.Header`} />

      {/* Syllabus link */}
      <div style={linkContainerStyle}>
        <a
          style={linkStyle}
          href="https://hackmd.io/@doulos819/NRC"
          target="_blank"
        >
          Syllabus
        </a>
      </div>

      {/* Lesson links */}
      {lessonNames.map((lesson, index) => (
        <div style={linkContainerStyle} key={index}>
          <a
            style={linkStyle}
            href={lessonURLs[index]} // Use lesson URL for each lesson
            target="_blank"
          >
            {`Lesson ${index + 1}: ${lesson}`} {/* Display lesson name */}
          </a>
        </div>
      ))}
    </div>
  );
};

// Render the LessonLinks component
return (
  <div>
    <LessonLinks />
  </div>
);
