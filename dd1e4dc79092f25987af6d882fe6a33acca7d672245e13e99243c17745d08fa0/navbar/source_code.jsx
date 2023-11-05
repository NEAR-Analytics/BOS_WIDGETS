const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 8px;
  box-shadow: 0 9px 10px rgb(0 0 0 / 0.2)
  `;

const Nav = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  font-weight: 500;

    .LidoStakeFormSubmitContainer {
  font-weight: bold;
  color: #fff;
  background-color: transparent;
  border: 2px solid #fff;

   .titles{
    font-color: #fff;
    font-size: 16px
  }
 `;

const A = styled.a`
  font-weight: bold;
  color: #fff;
  background-color: transparent;
 `;

const Button = styled.button`
    background:linear-gradient(134.38deg, #F539F8 0%, #C342F9 43.55%, #5356FB 104.51%);
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-radius: 100px;
    width: 150px;
    color: #fff;
    font-size: 16px;
    line-height: 21px;
    font-weight: 700;
    padding: 12px 28px;
    margin: 8px;
    margin-left: 39%
`;

return (
  <HeaderContainer style={{ fontWeight: 700, backgroundColor: "#c89efc" }}>
    <h4 style={{ fontWeight: 700 }}>Verax</h4>

    <img
      src="https://cdn.glitch.global/c1a02863-a911-4281-8824-6fa8c201ce5e/Capture_d_écran_2023-11-04_à_16.22.19-removebg-preview.png?v=1699130016137"
      style={{ width: "60px" }}
    />

    <Nav>
      <A href="#">Feed</A>
      <A
        href="https://near.social/embed/dd1e4dc79092f25987af6d882fe6a33acca7d672245e13e99243c17745d08fa0/widget/mintpage"
        target="_blank"
      >
        Make a post
      </A>
      <Web3Connect
        className="LidoStakeFormSubmitContainer"
        connectLabel="Connect your wallet"
      />
    </Nav>
  </HeaderContainer>
);
