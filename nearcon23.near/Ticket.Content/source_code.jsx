const ownerId = "nearcon23.near";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  padding: 3.5em 3.5em 4.5em;
  gap: 3em;
  background: #fff;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Explainer = styled.div`
  width: 45%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Detail = styled.div`
  width: 55%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const { isValidTicket, contractId, secretKey } = props;

return (
  <Container>
    {isValidTicket === undefined && (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifycontent: "center",
          alignitems: "center",
        }}
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )}

    {isValidTicket === true && (
      <>
        <Explainer>
          <Widget
            src={`${ownerId}/widget/Ticket.QRCode`}
            props={{ contractId, secretKey }}
          />
        </Explainer>
        <Detail>
          <Widget src={`${ownerId}/widget/Ticket.Detail`} props={props} />
        </Detail>
      </>
    )}

    {isValidTicket === false && <h2>Invalid Ticket.</h2>}
  </Container>
);
