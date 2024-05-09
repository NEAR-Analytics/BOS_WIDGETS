const accountId = props.accountId;
if (!accountId) {
  return "No accountId";
}

const content = JSON.parse(Social.get(`${accountId}`) ?? "null");

return (
  <div
    style={{
      background:
        "linear-gradient(-45deg, #5F8AFA, #FFFFFF, #FFFFFF, #FFFFFF, #A463B0)",
      width: "100%",
      height: "100%",
      padding: "2rem",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <h1 style={{ fontWeight: "bold" }}>Mentor HUB</h1>
      <h3>Make the world around you the better place</h3>
      <Widget
        src="near/widget/#"
        props={{
          accountId,
          style: { width: "7rem", height: "7rem" },
          className: "mb-2",
          imageClassName: "rounded-circle w-100 h-100 img-thumbnail d-block",
          thumbnail: false,
        }}
      />
      <Widget src="near/widget/#" props={{ profileName }} />
      <h3
        style={{
          marginTop: "20px",
        }}
      >
        My Students
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "15px",
        }}
      >
        <Widget
          src="near/widget/#"
          props={{
            accountId: student,
            descriptionForStudent: student,
            ourDescriptionForStudent: student,
          }}
        />
      </div>
    </div>
  </div>
);
