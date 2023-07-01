const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;

  @media (max-width: 768px) {
    padding: var(--section-gap) 12px;
  }
  background-color: #b96868;
`;

const Header = styled.div`
  padding: 20px;
`;

const Name = styled.span`
    font-size: 90px;
    color: #89c70d;
    font-weight: bolder;
    font-family: 'Courier New', Courier, monospace;
    &:hover {
                color: #b3e253; 
            }
`;

const LogoWrapper = styled.div`
    padding: 2px;
    svg {
        fill: #89c70d;
        width: 500px; 
        height: 500px; 
        transition: rotate(1turn);
        &:hover {
            transform: rotate(0.5turn);
            fill: #b3e253; 
        }
    }
    span {
        font-size: 25px;
        color: #89c70d;
        font-weight: bolder;
        font-family: 'Courier New', Courier, monospace;
        &:hover {
            color: #b3e253; 
        }
    }
`;

const Detail = styled.div`
    font-size: 14px;
    color: #b3e253;
    font-weight: bolder;
    font-family: 'Courier New', Courier, monospace;
`;

return (
  <Container>
    <Header>
      <Widget src={`mishih.near/widget/ReputeHeader`} />

      <hr />
      <Name>About Repute</Name>
      <Detail>
        Repute is a decentralized escrow service that simplifies the trading of
        difficult-to-transfer assets like bankruptcy claims and agreements. It
        eliminates the need for trust in a central authority by using a
        transparent blockchain platform. Repute holds funds from the buyer and
        collateral from the seller, ensuring both parties fulfill their
        obligations. It provides a secure and reliable solution for trading
        assets in special situations, such as bankruptcy claims, airdrop farming
        addresses, and agreements related to unvested tokens.
      </Detail>
    </Header>
  </Container>
);
