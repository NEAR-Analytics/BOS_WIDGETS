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
const StoreCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: rgba(214, 214, 214, 0.2);
  border-radius: 10px;
  justify-content: center;
  gap: 1rem;
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
    mb_store_minters(where: {minter_id: {_eq: "${accountAddress}"}}) {
    id: nft_contract_id
    nftContract: nft_contract {
      name
      icon
      owner: owner_id
    }
  }
  mb_store_minters_aggregate(
    where: {minter_id: {_eq: "${accountAddress}"}}
  ) {
    aggregate {
      count
    }
  }
}
`,
    }),
  });

  State.update({
    nftContracts: response.body.data.mb_store_minters,
    nftContractsCount:
      response.body.data.mb_store_minters_aggregate.aggregate.count,
  });
  console.log("count", state.nftContractsCount);
}

const nftContracts = state.nftContracts;

const seeContracts = () => {
  nftContracts &&
    nftContracts.map((contract) => {
      console.log(contract.nftContract.icon);
    });
};

seeContracts();
fetchData(state.account);

// console.log("response", state.account);
const storeAddressChangeHandler = (storeAddress) => {
  fetchStoreFrontData(storeAddress);
  console.log("store address: ", storeAddress);
  state.update({
    storeAddress: storeAddress,
  });
};
const Search = styled.div`
margin-top: 12px;
    // justify-content: center;
display: flex;
width: 100%;
flex-wrap: wrap;
input {
    border-radius: 32px;
    flex-shrink: 0;
    height: 48px;
    width: 100%;
    background: #F8F8F8;
    overflow: hidden;
    color: #B0B0B0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 29.6px */
}
`;

const CreateCard = styled.div`
padding: 1em;
border: 2px dashed rgba(0,0,0,.3);
display: flex;
align-items: center;
justify-content: center;
align-content: center;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
height: 293px;
max-width: 600px;
width: 100%;
button {
    border: 1px solid black;
    border-radius: 0;
    color: white;
    background: black;
    text-align: center
    display: flex;
    padding: 7px 20px;
    cursor: pointer;
  }
  button:disabled {
    background: grey;
    border: grey;
    cursor: not-allowed;
  }
  button:hover {
    background: white;
    color: black;
    border-color: black;
  }
`;

const Main = styled.div`
*{
  font-family: Helvetica Neue;
  }
  .count{
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1.5rem;
  }
`;

const s = state.nftContractsCount > 1 ? "s" : "";

return (
  <Main>
    <Card>
      Near Address:
      <Search>
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
      </Search>
    </Card>
    {nftContracts.length > 0 ? (
      <Cards>
        <div className="count">{`${state.nftContractsCount} Result${s}`}</div>
        <StoreCards className="mx-24 md:mx-64 ">
          {nftContracts &&
            nftContracts.map((contract) => (
              <Widget
                src="jgodwill.near/widget/Mintbase.StoreCard"
                props={{ contract }}
              />
            ))}
          <CreateCard>
            <a href="#/jodwill.near/widget/Mintbase.Store.Deploy">
              <button>New Store</button>
            </a>
          </CreateCard>
        </StoreCards>
      </Cards>
    ) : (
      <div className="text-center my-4">
        <p>😥 No stores found for {state.account}</p>
      </div>
    )}
    {!nftContracts.length > 0 && (
      <CreateCard>
        <a href="#/jodwill.near/widget/Mintbase.Store.Deploy">
          <button>New Store</button>
        </a>
      </CreateCard>
    )}
  </Main>
);
