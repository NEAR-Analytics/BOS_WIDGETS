function Chip({ label, color, backgroundColor }) {
  const style = {
    padding: "8px 16px",
    borderRadius: "100px",
    display: "inline-block",
    marginRight: "10px",
    backgroundColor: backgroundColor,
    color: color,
    fontWeight: "500",
  };

  return <span style={style}>{label}</span>;
}

function ChipDisplay(name) {
  const items = {
    Purchased: {
      fontColor: "#475569",
      backgroundColor: "#F8FAFC",
    },
    Claimed: {
      fontColor: "#16A34A",
      backgroundColor: "#F0FDF4",
    },
    Scanned: {
      backgroundColor: "#F9F6E9",
      fontColor: "#9E811B",
    },
  };

  return (
    <div style={{ transform: "scale(0.9)" }}>
      <Chip
        label={name}
        color={items[name].fontColor}
        backgroundColor={items[name].backgroundColor}
      />
    </div>
  );
}

const PreviewTicketModal = (
  <div style={{ padding: 25, backgroundColor: "white", borderRadius: 12 }}>
    <p style={{ fontWeight: "500" }}>Attendee details</p>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p style={{ marginBottom: 0, fontWeight: "500" }}>Link</p>
        <p style={{ fontSize: 14, color: "#1E293B" }}>{props.link}</p>
      </div>
      {ChipDisplay(props.status)}
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "50%" }}>
        <p style={{ marginBottom: 0, fontWeight: "500" }}>Full Name</p>
        <p style={{ fontSize: 14, color: "#1E293B" }}>{props.name}</p>
      </div>
      <div style={{ width: "50%" }}>
        <p style={{ marginBottom: 0, fontWeight: "500" }}>Email</p>
        <p style={{ fontSize: 14, color: "#1E293B" }}>{props.email}</p>
      </div>
    </div>
    <hr style={{ backgroundColor: "#F1F5F9", border: "none", height: 4 }} />
    <p style={{ fontSize: 18, fontWeight: "500" }}>
      Attendee questions and responses
    </p>
    <div>
      <p style={{ marginBottom: 0, fontWeight: "500" }}>
        How did you hear about Keypom?
      </p>
      <p style={{ fontSize: 14, color: "#1E293B" }}>
        Inmensae subtilitatis, obscuris et malesuada fames.
      </p>
    </div>
    <div>
      <p style={{ marginBottom: 0, fontWeight: "500" }}>
        Why did you buy tickets to this event?
      </p>
      <p style={{ fontSize: 14, color: "#1E293B" }}>
        I know someone in the band.
      </p>
    </div>
    <div>
      <p style={{ marginBottom: 0, fontWeight: "500" }}>Question</p>
      <p style={{ fontSize: 14, color: "#1E293B" }}>
        Inmensae subtilitatis, obscuris et malesuada fames.
      </p>
    </div>
    <button
      onClick={props.onClose}
      style={{
        width: "100%",
        backgroundColor: "white",
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginTop: 5,
        color: "black",
      }}
    >
      Close
    </button>
  </div>
);

return (
  <Widget
    src="harrydhillon.near/widget/Keypom.Components.Modal"
    props={{
      children: PreviewTicketModal,
      background:
        "linear-gradient(180deg, rgba(242,252,255,1) 18%, rgba(203,239,255,1) 100%)",
      isOpen: props.isOpen,
      contentStyles: {
        style: {
          width: 500,
          borderRadius: 15,
          padding: 2,
          overflow: "hidden",
          background:
            " linear-gradient(180deg, rgba(182,232,247,1) 41%, rgba(255,207,234,1) 96%)",
        },
      },
    }}
  />
);
