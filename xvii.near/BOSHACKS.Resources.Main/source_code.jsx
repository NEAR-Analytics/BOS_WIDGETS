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
      {[...Array(10).keys()].map((num) => (
        <div style={linkContainerStyle} key={num}>
          <a
            style={linkStyle}
            href={`https://hackmd.io/@doulos819/ncr-${
              num + 1 < 10 ? `0${num + 1}` : num + 1
            }`}
            target="_blank"
          >
            {`Lesson ${num + 1}`}
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
