const balances = null;

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800;900&display=swap"
).body;

const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "b";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num;
};

const MainLayout = styled.div`
    font-family: Jost, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont};
    background-image: url("https://api-nft.famcentral.finance/files/background/ac249f679cb04214a8811752706f75b6bgw3w.png");
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
    margin-top: 300px;
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

if (!balances) {
  const baseApi = "https://api.pikespeak.ai";
  const publicApiKey = "b7ae87d9-c374-46b3-bbe2-3696def948ea";
  const fetchApiConfig = {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  };
  const res = fetch(
    `${baseApi}/account/balances?accounts=${[
      props.accountId ?? context.accountId ?? "bobo.near",
    ]}`,
    fetchApiConfig
  );

  balances = res.body;
}

State.init({
  userName: "",
});

return (
  <MainLayout>
    <ContainerBorder>
      <TextPrimary>Username: {state.userName}</TextPrimary>
      <InputLayout
        placeholder="Near username"
        value={state.userName}
        onChange={(e) => {
          State.update({ userName: e.target.value });
        }}
      />

      {balances.balancesTotal.map((balance, i) => {
        return (
          <>
            <TextPrimary>{balance.contract}</TextPrimary>
            <TextPrimary>
              USD: {formatNumber(Number(balance.usdPrice).toFixed(2))} USD
            </TextPrimary>
            <TextPrimary>
              {balance.symbol}: {Number(balance.amount).toFixed(2)} NEAR
            </TextPrimary>
          </>
        );
      })}
      <Widget
        src={`longx30.near/widget/CreateNearAccount`}
        props={{
          placeholder: "Your Account ID",
          titleBtn: "Create Account",
        }}
      />
    </ContainerBorder>
  </MainLayout>
);
