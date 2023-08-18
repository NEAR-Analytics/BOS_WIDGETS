const Container = styled.div`
border:0.5px solid #00A7E4;
padding:10px;
border-radius:5px;
`;

function extractDateComponents(dateStr) {
  const dateObj = new Date(dateStr);

  const month = dateObj.toLocaleString("default", { month: "long" }); // e.g., "August"
  const date = dateObj.getDate(); // e.g., 3
  const year = dateObj.getFullYear(); // e.g., 2023

  return `${month} ${date}, ${year}`;
}

const PreviewTicketModal = (
  <>
    <Container>
      <div>
        <img
          style={{
            width: "90%",
            marginLeft: "5%",
            borderRadius: 5,
          }}
          src="https://i.ibb.co/kx9Y61n/Screenshot-2023-08-15-at-23-44-38.png"
        />
        <p style={{ fontSize: 22, fontWeight: "500", marginBottom: 0 }}>
          {props.ticketName}
        </p>
        <p
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "#94A3B8",
            marginBottom: 0,
          }}
        >
          {extractDateComponents(props.from)} -{" "}
          {extractDateComponents(props.to)} at 7:00 PM PT
        </p>
        <p style={{ fontSize: 12, fontWeight: "500", color: "gray" }}>
          {props.description}
        </p>
        <p style={{ fontSize: 12, fontWeight: "500", color: "gray" }}>
            [Event Location]
        </p>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <button
            style={{
              backgroundColor: "white",
              fontSize: 14,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#E2E8F0",
              marginTop: 5,
              color: "black",
            }}
          >
            -
          </button>
          <button
            style={{
              backgroundColor: "white",
              fontSize: 14,
              borderRadius: 5,
              paddingLeft: 14,
              paddingRight: 14,
              marginLeft: 5,
              marginRight: 5,
              borderWidth: 1,
              borderColor: "#E2E8F0",
              marginTop: 5,
              color: "black",
            }}
          >
            1
          </button>
          <button
            style={{
              backgroundColor: "white",
              fontSize: 14,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#E2E8F0",
              marginTop: 5,
              color: "black",
            }}
          >
            +
          </button>
        </div>
        <button
          style={{
            backgroundColor: "black",
            borderWidth: 0,
            borderRadius: 5,
            width: "100%",
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          Buy for {props.ticketPricing} NEAR
        </button>
      </div>
    </Container>
    <button
      onClick={props.onClose}
      style={{
        width: "100%",
        backgroundColor: "white",
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
        marginTop: 5,
        color: "black",
      }}
    >
      Close preview
    </button>
  </>
);

return (
  <Widget
    src="harrydhillon.near/widget/Keypom.Components.Modal"
    props={{
      children: PreviewTicketModal,
      isOpen: props.isOpen,
      contentStyles: {
        style: {
          width: 400,
        },
      },
    }}
  />
);
