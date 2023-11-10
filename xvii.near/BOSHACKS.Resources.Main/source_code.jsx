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
      <div style={linkContainerStyle}>
        <a
          style={linkStyle}
          href="https://hackmd.io/@doulos819/ncr-03"
          target="_blank"
        >
          Lesson 3
        </a>
      </div>
      <div style={linkContainerStyle}>
        <a
          style={linkStyle}
          href="https://hackmd.io/@doulos819/ncr-04"
          target="_blank"
        >
          Lesson 4
        </a>
      </div>
      <div style={linkContainerStyle}>
        <a
          style={linkStyle}
          href="https://hackmd.io/@doulos819/ncr-05"
          target="_blank"
        >
          Lesson 5
        </a>
      </div>
      <div style={linkContainerStyle}>
        <a
          style={linkStyle}
          href="https://hackmd.io/@doulos819/ncr-06"
          target="_blank"
        >
          Lesson 6
        </a>
      </div>
      <div style={linkContainerStyle}>
        <a
          style={linkStyle}
          href="https://hackmd.io/@doulos819/ncr-07"
          target="_blank"
        >
          Lesson 7
        </a>
      </div>
      <div style={linkContainerStyle}>
        <a
          style={linkStyle}
          href="https://hackmd.io/@doulos819/ncr-08"
          target="_blank"
        >
          Lesson 8
        </a>
      </div>
    </div>
  );
};

return (
  <div>
    <LessonLinks />
  </div>
);
