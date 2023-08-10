const TicketDropBackground = styled.div`
background: lightgray;
min-height:100vh;
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

return (
  <TicketDropBackground>
    <ContentDiv>
      <Widget src="harrydhillon.near/widget/Keypom.Header" />
      <p style={{ fontSize: 12, marginTop: 20 }}>
        <span style={{ color: "#94A3B8" }}>All Drops</span> {">"} New Ticket
        Drop{" "}
      </p>
      <Heading>Enter the details for your new Ticket Drop</Heading>
      {props?.content && props?.content()}
    </ContentDiv>
  </TicketDropBackground>
);
