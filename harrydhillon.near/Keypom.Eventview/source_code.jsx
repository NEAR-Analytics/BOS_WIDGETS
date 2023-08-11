const TicketDropBackground = styled.div`
background: lightgray;
background: rgb(220,244,251);
background: linear-gradient(0deg, rgba(220,244,251,1) 0%, rgba(251,254,255,1) 95%, rgba(255,255,255,1) 100%);
`;

const ContentDiv = styled.div`
    padding:10px;
    max-width: 1200px;
    margin:auto;
`;

const Heading = styled.div`
font-size: 30px;
font-style: normal;
font-weight: 500;
margin-top:-10px;
line-height: normal;
letter-spacing: -0.72px;
`;

const EventView = styled.div`
`;

return (
  <EventView>
    <TicketDropBackground>
      <ContentDiv>
        <Widget
          src="harrydhillon.near/widget/Keypom.Header"
          props={{
            scaleDown: true,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "15vh",
          }}
        >
          <p style={{ fontSize: 22, fontWeight: "600" }}>My Event</p>
        </div>
      </ContentDiv>
    </TicketDropBackground>
    <div style={{ maxWidth: 500, margin: "auto", marginTop: 20 }}>
      <p style={{ fontWeight: "600" }}>Event Details</p>
    </div>
  </EventView>
);
