const accountId = props.accountId;
if (!accountId) {
  return "No accountId";
}

const content = JSON.parse(Social.get(`${accountId}`) ?? "null");

if (!Array.isArray(state.studentArray)) {
  return "Student array is not valid";
}

return content?.submentorhub ? (
  <Widget src="mob.near/widget/MentorHub" props={props} />
) : (
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
        src="mob.near/widget/ProfileImage"
        props={{
          accountId,
          style: { width: "7rem", height: "7rem" },
          className: "mb-2",
          imageClassName: "rounded-circle w-100 h-100 img-thumbnail d-block",
          thumbnail: false,
        }}
      />
      <h4>{state.profileName}</h4>
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
        {state.studentArray((student) => (
          <div
            key={student}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              margin: "10px",
              borderRadius: "12px",
              background: "#fff",
              border: "1px solid #eceef0",
              boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1)",
              overflow: "hidden",
              padding: "16px",
            }}
          >
            <div>
              <Widget
                src="near/widget/AccountProfile"
                props={{ accountId: student }}
              />

              <div>
                <h4>{descriptionForStudent(student)}</h4>
              </div>
              <div>
                <h4>{ourDescriptionForStudent(student)}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
