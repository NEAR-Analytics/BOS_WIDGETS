const { placeholder, titleBtn } = props;

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800;900&display=swap"
).body;

const newPublicKey = fetch(
  "https://qa.api.wid.famcentral.io/api/public/random-near-public-key",
  { mode: "cors" }
).body;

const MainLayout = styled.div`
    font-family: Jost, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont};
    max-width: 100%;
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

const { accountId, networkId } = context;
State.init({
  newAccountId: "",
});

const createAccount = () => {
  return Near.call(
    "near",
    "create_account",
    {
      new_account_id: state.newAccountId,
      new_public_key: newPublicKey,
    },
    300000000000000,
    "10000000000000000000000"
  );
};

const onChange = (e) => {
  State.update({
    newAccountId: e?.target?.value || "",
  });
};

return (
  <MainLayout>
    <InputLayout
      placeholder={placeholder || "New account Id"}
      onChange={onChange}
      value={state.newAccountId}
    />
    <ButtonPrimary onClick={createAccount}>
      {titleBtn || "Create Account"}
    </ButtonPrimary>
  </MainLayout>
);
