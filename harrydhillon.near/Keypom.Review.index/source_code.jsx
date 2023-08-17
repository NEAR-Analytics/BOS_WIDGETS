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
            objectFit: "cover",
            borderRadius: 5,
            margin: 10,
            marginBottom: 5,
            marginLeft: 0,
          }}
          src="https://i.ibb.co/kx9Y61n/Screenshot-2023-08-15-at-23-44-38.png"
        />
        <div>
          <Label>Event name</Label>
          <p style={{ fontSize: 12 }}>[Event name]</p>
          <Label>Event description</Label>
          <p style={{ fontSize: 12 }}>
            A communi observantia non est recedendum. Prima luce, cum quibus
            mons aliud consensu ab eo.
          </p>
        </div>
      </div>
      <div style={{ width: "10%" }} />
      <div style={{ width: "40%" }}>
        <Label>Event date</Label>
        <p style={{ fontSize: 12 }}>June 16, 2023</p>
        <Label>Event location</Label>
        <p style={{ fontSize: 12 }}>1234 University Ave, Toronto ON Canada</p>
      </div>
    </EventDisplayFlex>
    <Widget src="harrydhillon.near/widget/Keypom.Review.TicketTable" />
  </div>
);
