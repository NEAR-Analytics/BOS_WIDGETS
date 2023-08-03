const Container = styled.div`
      @media (max-width: 768px) {
     display:block;
    }
     @media (min-width: 768px) {
    display:flex;
    }
    width: 100%;
`;

const QRContainer = styled.div`
    width:40%;
      @media (max-width: 768px) {
    width:100%;
  }
  display:flex;
  align-items:center;
  justify-content:center;
`;

const TicketContent = styled.div`
    width:60%;
    padding:20px;
    @media (max-width: 768px) {
    width:100%;
    }
`;

const TicketHeading = styled.p`
 font-family: "FK Grotesk";
font-size: 24px;
font-weight: bold;
line-height: 31px;
letter-spacing: 0em;
text-align: left;
`;

const TicketSubtitle = styled.p`
font-family: "Mona Sans";
font-size: 16px;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
`;

const SellButton = styled.button`
width: 185px;
height: 50px;
color:white;
border-width:0px;
padding: 10px 20px 10px 20px;
border-radius: 100px;
gap: 10px;
background-color:rgba(244, 71, 56, 1);
`;

const Dividerline = styled.div`
background-color:rgba(242, 241, 234, 1);
width:100%;
height:1px;
margin-bottom:15px;
`;

const GrayBackground = styled.div`
    background-color:rgba(249, 249, 248, 1);
    padding:10px;
    margin-top:10px;
`;

const TicketSolutionText = styled.p`
font-family: Mona Sans;
font-size: 14px;
font-weight: 600;
line-height: 21px;
letter-spacing: 0em;
text-align: left;
`;

return (
  <>
    <img
      src="https://i.ibb.co/yStFypY/interior-hero.png"
      style={{ width: "100%" }}
    />
    <Container style={{ width: "100%" }}>
      <QRContainer>
        <Widget
          src="harrydhillon.near/widget/data-to-qr-image"
          props={{
            width: 35,
            height: 35,
            link: "www.youtube.com",
            svgProps: {
              width: "100%",
            },
          }}
        />
      </QRContainer>
      <TicketContent>
        <TicketHeading>
          This page is not only your ticket, but your portal into the NEARCON
          Experience.
        </TicketHeading>
        <TicketSubtitle>
          Don’t just screenshot the QR code. Have your mobile device ready with
          this screen open as you enter the event. We’re unleashing the power of
          the BOS at NEARCON. Don’t miss out.
        </TicketSubtitle>
        <Dividerline />
        <TicketSubtitle>
          Can’t make it to NEARCON this year? You can sell your ticket on the
          secondary marketplace powered by Mintbase.
        </TicketSubtitle>
        <SellButton>Sell on MintBase</SellButton>
        <GrayBackground>
          <TicketSolutionText>Tickets Solution By</TicketSolutionText>
          <div style={{ width: "fit-content", margin: "auto" }}>
            <img src="https://i.ibb.co/3kkqvwm/Frame-13509.png" />
          </div>
        </GrayBackground>
      </TicketContent>
    </Container>
  </>
);
