const Main = styled.div`
  width:90%;
  margin: auto;
  h1{
        text-align: center;
        font-size: 64px;
    font-weight: 700;
    line-height: 120%;
    margin-bottom: 16px;
    width: 1000px;
    margin:  auto;
  }
  p{
    text-align: center;
  }
`;

const ConnectWallet = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 22px 46px 21px 45px;
border-radius: 8px;
border: 1px solid rgba(0, 0, 0, 0.07);
width: 100%;
`;
const Wallets = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 594px;
background: #FAFAFA;
margin: auto;
border-radius: 12px;
gap: 32px;
`;

return (
  <>
    <Main>
      <h1>Connect multiple ethereum wallets to a NEAR wallet</h1>
      <p>Connect an ethereum wallet now</p>
      <Wallets>
        <ConnectWallet>
          <Web3Connect class="connectweb3btn" />
        </ConnectWallet>
      </Wallets>
    </Main>
  </>
);

