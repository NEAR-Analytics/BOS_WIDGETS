const LessonLinks = () => {
  const linkStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#007bff", // Default link color
    textDecoration: "none",
  };

  const moduleTitleStyle = {
    ...linkStyle,
    color: "#008080", // Dark teal color
  };

  const linkContainerStyle = {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "5px",
    margin: "5px 0",
    textAlign: "left",
  };

  // Define modules and their corresponding lessons
  const modules = [
    {
      title: "Module 1: Introduction to Blockchain and NEAR Protocol",
      description:
        "This module covers the fundamental concepts of blockchain technology and introduces the NEAR Protocol.",
      lessons: [
        { index: 0, title: "Introduction to Blockchain and NEAR Protocol" },
        { index: 1, title: "Data Retrieval and Analysis" },
      ],
    },
    {
      title: "Module 2: Data Transformation and Visualization",
      description:
        "This module focuses on techniques for transforming and visualizing data.",
      lessons: [
        { index: 2, title: "Data Transformation and Visualization" },
        { index: 3, title: "Advanced Data Evaluation Methods" },
      ],
    },
    {
      title: "Module 3: Specialized Topics in Blockchain",
      description:
        "This module explores specialized topics in blockchain, including governance, decentralized finance, non-fungible tokens, and blockchain in gaming.",
      lessons: [
        { index: 4, title: "Research Topic Identification" },
        { index: 5, title: "Governance in Blockchain" },
        { index: 6, title: "Decentralized Finance (DeFi)" },
        { index: 7, title: "Non-Fungible Tokens (NFTs)" },
        { index: 8, title: "Blockchain in Gaming" },
      ],
    },
    {
      title: "Module 4: Advanced Research Topics",
      description:
        "This module covers advanced research topics in blockchain, including cryptography and zero-knowledge proofs.",
      lessons: [
        {
          index: 9,
          title: "Advanced Topics in Cryptography & Zero-Knowledge Proofs",
        },
      ],
    },
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
  ];

  // State to track expanded modules
  const [expandedModule, setExpandedModule] = useState(null);

  // Function to toggle module expansion
  const toggleModule = (index) => {
    if (expandedModule === index) {
      setExpandedModule(null);
    } else {
      setExpandedModule(index);
    }
  };

  return (
    <div>
      {/* Syllabus link */}
      <div style={{ ...linkContainerStyle, textAlign: "center" }}>
        <a
          style={moduleTitleStyle} // Apply the same style as module titles
          href="https://hackmd.io/@doulos819/NRC"
          target="_blank"
        >
          Syllabus
        </a>
      </div>

      {/* Module links */}
      {modules.map((module, moduleIndex) => (
        <div key={moduleIndex} style={{ marginBottom: "10px" }}>
          {/* Module title and description as header */}
          <div
            style={{ ...linkContainerStyle, cursor: "pointer" }}
            onClick={() => toggleModule(moduleIndex)}
          >
            <span style={{ ...moduleTitleStyle, fontWeight: "bold" }}>
              {module.title}
            </span>
            {/* Show arrow icon based on module expansion */}
            {expandedModule === moduleIndex ? " -" : " +"}
          </div>
          {expandedModule === moduleIndex && (
            <div style={{ paddingLeft: "20px" }}>
              <p>{module.description}</p>
              {/* Render lesson links within expanded module */}
              {module.lessons.map((lesson) => (
                <div style={linkContainerStyle} key={lesson.index}>
                  <a
                    style={linkStyle}
                    href={lessonURLs[lesson.index]} // Use lesson URL for each lesson
                    target="_blank"
                  >
                    {`Lesson ${lesson.index + 1}: ${lesson.title}`}{" "}
                    {/* Display lesson name */}
                  </a>
                </div>
              ))}
            </div>
          )}
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
