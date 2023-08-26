const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800;900&display=swap"
).body;

const MainLayout = styled.div`
    font-family: Jost, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont};
    background-image: url("https://api-qa.nft-square.io/files/ecommerce/4c49cd6cf9234e4586f0276365f403d5bg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat:no-repeat;
    height: 100vh;
    width: 100vw;
    padding: 24px;
    max-width: 100%;
`;

const TextPrimary = styled.div`
    background: linear-gradient(118deg, #FB00FF 0%, #161AF8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    margin: 8px;
`;

const ButtonPrimary = styled.button`
    background:linear-gradient(134.38deg, #F539F8 0%, #C342F9 43.55%, #5356FB 104.51%);
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-radius: 100px;
    color: #fff;
    font-size: 16px;
    line-height: 21px;
    font-weight: 700;
    padding: 12px 28px;
    margin: 8px;
`;

const ContainerBorder = styled.div`
    background: linear-gradient(#070814 0 0) padding-box,linear-gradient(45.37deg, #C309F3 9.61%, #4194FF 53.33%, #11E6A4 92.25%) border-box;
    border-radius: 12px;
    padding: 12px;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    max-width: 100%;
    margin-top: 500px;
`;

const InputLayout = styled.input`
   background: linear-gradient(#070814 0 0) padding-box,linear-gradient(45.37deg, #C309F3 9.61%, #4194FF 53.33%, #11E6A4 92.25%) border-box;
    border-radius: 100px;
    padding: 12px;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    max-width: 100%;
    width: 100%;
    color: #fff;
`;

State.init({
  userName: "",
});

return (
  <MainLayout>
    <ContainerBorder>
      <TextPrimary>WELLCOME TO W3W</TextPrimary>

      <Widget
        src={`fam3hackathon.near/widget/F3CreateWallet`}
        props={{
          placeholder: "Your Account ID",
          titleBtn: "Create Account",
        }}
      />

      <div style={{ border: "1px dashed #fff" }}></div>

      <Widget
        src={`fam3hackathon.near/widget/F3CreateCollection`}
        props={{
          placeholder: "Your Account ID",
          titleBtn: "Create Collection",
        }}
      />

      <Widget
        src={`fam3hackathon.near/widget/MintNearNft`}
        props={{
          placeholder: "Receive Wallet",
          titleBtn: "Mint NFT",
          tokenSeriesId: "497786",
        }}
      />
    </ContainerBorder>
  </MainLayout>
);
