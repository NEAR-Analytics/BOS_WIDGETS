const HeadingDisplayFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Label = styled.p`
    font-weight:500;
    margin: 0;
`;

const UnstyledButton = styled.button`
  background-color:transparent;
  border-width:0px;
  color:#00A7E4;
`;

const EventDisplayFlex = styled.div`
    display:flex;
    margin-top:10px;
    align-items: center;
`;

const eventData = JSON.parse(Storage.get("formValues"));
const ticketValue = JSON.parse(Storage.get("tickets"));

return (
  <div style={{ padding: 10 }}>
    <HeadingDisplayFlex>
      <Label>Let’s make sure all your details are correct</Label>
      <UnstyledButton>Preview Event Page</UnstyledButton>
    </HeadingDisplayFlex>
    <EventDisplayFlex>
      <div style={{ width: "50%", display: "flex", alignItems: "center" }}>
        <img
          style={{
            width: 200,
            height: 150,
            objectFit: "contain",
            borderRadius: 5,
            margin: 10,
            marginBottom: 5,
            marginLeft: 0,
          }}
          src={`https://ipfs.near.social/ipfs/${eventData?.image?.cid}`}
        />
        <div>
          <Label>Event name</Label>
          <p style={{ fontSize: 12 }}>{eventData?.eventName}</p>
          <Label>Event description</Label>
          <p style={{ fontSize: 12 }}>{eventData?.description}</p>
        </div>
      </div>
      <div style={{ width: "10%" }} />
      <div style={{ width: "40%" }}>
        <Label>Event date</Label>
        <p style={{ fontSize: 12 }}>
          {eventData?.isSingleDateEvent ? eventData.date : eventData?.from}
        </p>
        <Label>Event location</Label>
        <p style={{ fontSize: 12 }}>{eventData.location}</p>
      </div>
    </EventDisplayFlex>
    <Widget
      props={{
        ticketValue,
      }}
      src="harrydhillon.near/widget/Keypom.Review.TicketTable"
    />
  </div>
);
