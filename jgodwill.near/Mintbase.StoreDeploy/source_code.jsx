const accountId = context.accountId;

const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading";
}

State.init({
  account: accountId,
});
const accounts = Object.entries(data);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];
  allWidgets.push(accountId);
}
const onChangeAccount = (account) => {
  State.update({
    account: account[0],
  });
  fetchData(state.account);
};

const Card = styled.div`
padding: 1em;
border: 1px solid #e5e8eb;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
& input{
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
  box-shadow:none;
    border:1px solid #0d99ff;
  }
  &::placeholder {
    color: palevioletred;
  }
  }
  .soulbound{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

function fetchData(accountAddress) {
  if (!state.account) {
    State.update({
      account: accountId,
    });
  }
  const response = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyQuery {
  nft_contracts(where: {owner_id: {_eq: "nate.near"}}) {
    id
  }
}

`,
    }),
  });

  State.update({
    nftContracts: response.body.data.nft_contracts,
  });
  console.log("running", response);
}

fetchData(state.account);

// console.log("response", state.account);
const storeAddressChangeHandler = (storeAddress) => {
  console.log("store address: ", storeAddress);
  state.update({
    storeAddress: storeAddress,
  });
};
return (
  <div>
    <h2 className="text-center my-4">
      Enter a Near address to See the various Mintbase contracts under it
    </h2>
    <Card>
      Near Address:
      <Typeahead
        id="async-example"
        className="type-ahead"
        isLoading={isLoading}
        labelKey="search"
        minLength={1}
        options={allWidgets}
        onChange={(value) => onChangeAccount(value)}
        placeholder={accountId}
      />
    </Card>
    {state.nftContracts.length > 0 ? (
      <Card>
        <select onChange={(e) => storeAddressChangeHandler(e.target.value)}>
          <option selected disabled>
            Select a contract
          </option>
          {state.nftContracts.map((contract) => (
            <option value={contract.id}>{contract.id}</option>
          ))}
        </select>
      </Card>
    ) : (
      <p>No contracts found for {state.account}</p>
    )}
  </div>
);
