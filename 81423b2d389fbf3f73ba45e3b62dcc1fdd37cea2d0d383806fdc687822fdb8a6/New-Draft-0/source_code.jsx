initState({ accountId: "root.near" });
const accountId = props.wallet_id || context.accountId;
const decimals = props.decimal_places ?? 1;

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: orange; 
  border: 4px solid green;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const LabelArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
  margin-bottom: 0.5em;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Paragraph = styled.p`
  margin-top: 1em; /* Add some space above the paragraph */
`;

const onAccountInputChange = ({ target }) => {
  State.update({ accountId: target.value });
};

const res = fetch(`https://api.nearblocks.io/v1/account/${state.accountId}`);
const accountBalance = (res.body.account[0].amount / 1e24).toFixed(decimals);

return (
  <div className="d-flex flex-column align-items-center">
    <LabelArea>
      <Image
        src="https://zealy-webapp-images-prod.s3.eu-west-1.amazonaws.com/public/5d8a56da-0df6-4e25-ba2d-c2029e8dd760-logo.png"
        alt="Logo"
      />
      <Input
        type="text"
        value={state.accountId}
        onChange={onAccountInputChange}
        placeholder="Enter wallet address"
      />
    </LabelArea>
    <Paragraph>This wallet has {accountBalance} Near</Paragraph>
  </div>
);
