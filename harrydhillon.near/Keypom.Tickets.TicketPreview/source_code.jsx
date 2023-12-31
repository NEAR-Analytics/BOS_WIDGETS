const Container = styled.div`
border:0.5px solid #00A7E4;
padding:10px;
border-radius:5px;
position:relative;
margin-top:15px;
`;

function extractDateComponents(dateStr) {
  const dateObj = new Date(dateStr);

  const month = dateObj.toLocaleString("default", { month: "long" }); // e.g., "August"
  const date = dateObj.getDate(); // e.g., 3
  const year = dateObj.getFullYear(); // e.g., 2023

  return `${month} ${date}, ${year}`;
}

const EyeDiv = styled.div`
  background-color:#B6E8F7;
  display:flex;
  align-items:center;
  text-align:center;
  width:50px;
  height:50px;
  position:absolute;
  transform:translate(140px,-70px);
  border-radius:100px;
  border: 1px solid #00A7E4;
`;

const Paragraph = styled.p`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  cursor: default;
`;

// <EyeDiv>
//   <div
//     style={{ display: "block", margin: "auto", transform: "scale(0.6)" }}
//   >
//     <Widget src="harrydhillon.near/widget/Keypom.Tickets.EyeSVG" />
//   </div>
// </EyeDiv>
const PreviewTicketModal = (
  <>
    <Container>
      {!!props.numberOfTickets && (
        <p style={{ position: "absolute", right: 65, top: 27, fontSize: 12 }}>
          1 of {props.numberOfTickets}
        </p>
      )}

      <div>
        <img
          style={{
            width: "90%",
            maxHeight: 250,
            objectFit: "contain",
            marginLeft: "5%",
            borderRadius: 5,
          }}
          src={`https://ipfs.near.social/ipfs/${props.image.cid}`}
        />
        <Paragraph
          style={{
            fontSize: 22,
            fontWeight: "500",
            marginBottom: 0,
          }}
        >
          {props.ticketName}
        </Paragraph>
        <Paragraph
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "#94A3B8",
            marginBottom: 0,
          }}
        >
          {extractDateComponents(props.from)} -{" "}
          {extractDateComponents(props.to)}
        </Paragraph>
        <Paragraph
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "gray",
          }}
        >
          {props.description}
        </Paragraph>
        <Paragraph
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "gray",
            marginTop: 10,
          }}
        >
          {props?.formValues?.location}
        </Paragraph>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <button
            style={{
              backgroundColor: "white",
              fontSize: 14,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#E2E8F0",
              color: "black",
              marginTop: 5,
              cursor: "default",
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
              cursor: "default",
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
              cursor: "default",
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
            cursor: "default",
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
      isOpen: props?.isOpen,
      overlayStyles: {
        style: {
          overflowY: "hidden",
        },
      },
      contentStyles: {
        style: {
          width: 400,
        },
      },
    }}
  />
);
