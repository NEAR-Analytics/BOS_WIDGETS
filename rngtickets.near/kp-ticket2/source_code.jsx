const qrPayload = `v2.keypom.near/${props.pk}`;

const qrSourceImg = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrPayload}&format=svg`;

return (
  <div className="container row mt-3 mb-3">
    <div align="center">
      <div
        style={{
          backgroundColor: "#ecc2ff",
          width: "300px",
          height: "450px",
          border: "5px solid black",
          borderRadius: "25px",
        }}
      >
        <br />
        <br />
        <text style={{ fontSize: 26, fontFamily: "Avenir" }}>
          🎟️ This is your Ticket 🔑
        </text>
        <br />
        <img src={qrSourceImg} alt="" title="" style={{ paddingTop: 15 }} />
        <br />
        <br />
        <text style={{ fontSize: 18, fontFamily: "Avenir" }}>
          NEAR Toronto: Rooftop Rendezvous🦩
        </text>
        <br></br>
        <text style={{ fontSize: 11, fontFamily: "Avenir" }}>
          In collaboration with: NEAR Foundation, TENAMINT, Seahorse Social, KPW
          Comms, Proof of Vibes, Marma J Foundation, NEAR Foundation, Music
          Feast, GDS Consulting, Brothers Grimm Ultra Premium Vodka,
          CreativesDAO.
        </text>
      </div>
    </div>
  </div>
);
