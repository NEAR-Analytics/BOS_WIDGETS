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

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: rgba(214, 214, 214, 0.2);
  border-radius: 10px;
  justify-content: center;
  padding-top: 3em;
  box-shadow: 0 0.05rem 0.05rem rgb(34 34 34 / 5%), 0 0.2rem 0.8rem rgb(34 34 34 / 8%);
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

const fetchStoreFrontData = (accountAddress) => {
  const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyQuery {
  mb_views_nft_tokens(
    where: {owner: {_eq: "nate.near"}, _and: {burned_timestamp: {_is_null: true}, last_transfer_timestamp: {_is_null: false}}, nft_contract_id: {_eq: "${accountAddress}"}}
    limit: 30
    order_by: {last_transfer_timestamp: desc}
  ) {
    nft_contract_id
    title
    description
    media
    last_transfer_receipt_id
  }
}
`,
    }),
  });

  State.update({
    storeContracts: response2.body.data.mb_views_nft_tokens,
  });
  console.log("running2", state.storeContracts);
};

// console.log("response", state.account);
const storeAddressChangeHandler = (storeAddress) => {
  fetchStoreFrontData(storeAddress);
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
    {state.storeContracts.length > 0 ? (
      <Cards>
        {state.storeContracts.map((store) => (
          <Widget
            src="jgodwill.near/widget/Mintbase.StoreFront"
            props={{ storeInfo: store }}
          />
        ))}
      </Cards>
    ) : (
      <p>No NFTs found for {state.storeAddress}</p>
    )}
  </div>
);
