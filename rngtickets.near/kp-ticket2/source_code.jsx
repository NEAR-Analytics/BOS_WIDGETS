const qrPayload = `v2.keypom.near/${props.pk}`;

const qrSourceImg = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrPayload}&format=svg`;

return (
  <div className="container row mt-1 mb-1">
    <div align="center">
      <div
        style={{
          backgroundColor: "#fff",
          width: "300px",
          height: "400px",
          border: "5px solid black",
          borderRadius: "25px",
        }}
      >
        <br />
        <text style={{ fontSize: 26, fontFamily: "Avenir" }}>
          🎟️ This is your Ticket 🔑
        </text>
        <br />
        <img src={qrSourceImg} alt="" title="" style={{ paddingTop: 15 }} />
      </div>
    </div>
  </div>
);
