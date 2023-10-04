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

  const ownerId = "xvii.near"; // Replace this with your actual ownerId

  return (
    <div>
      <Widget src={`${ownerId}/widget/Resources.Header`} />
      <div style={linkContainerStyle}>
        <a
          style={linkStyle}
          href="https://hackmd.io/23MmiNmXQ6WFW7zq_xYCHg?view"
          target="_blank"
        >
          Lesson 1
        </a>
      </div>
      <div style={linkContainerStyle}>
        <a
          style={linkStyle}
          href="https://hackmd.io/@doulos819/ncr-02"
          target="_blank"
        >
          Lesson 2
        </a>
      </div>
    </div>
  );
};

// Usage in your main function or another component
return (
  <div>
    <LessonLinks />
  </div>
);
