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
  mb_store_minters(where: {minter_id: {_eq: "nate.near"}}) {
    id: nft_contract_id
    nftContract: nft_contract {
      name
      icon
    }
  }
}
`,
    }),
  });

  State.update({
    nftContracts: response.body.data.mb_store_minters,
  });
  console.log("running", state.nftContracts);
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

const StoreCard = styled.div`
border: 1px solid #e5e8eb;
box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.05);
gap: 2em;
margin: 10px auto;
width: 100%;
  background: #000;
  color: #fff;
max-width: 600px;
*{
  font-family: Helvetica Neue;
  }
.icon_area{
  width: 110px;
  // border-radius: 50%;
  height: 110px;
  border: 3px solid #ccc;
  display: flex;
  overflow: hidden;
  position: absolute;
  margin-top: -50px;
  img{
    object-fit:cover;
  }
}

.name_contract{
  margin-top: 10px;
  h3{
    font-weight: bold;
    margin: 0;
  }
}

.middle{
  padding: 0px 20px;
  position: relative;
  .content{
  position: relative;
    display: flex;
    gap: 20px;
    .name_contract{
      margin-left: 130px;
    }
  }
}

.top{
  height: 100px;
  border-bottom: 1px solid #fff; 
  background: #fff;
}
.bottom{
  padding: 1em;
  button {
    border: 1px solid #fff;
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
}
`;
return (
  <div>
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
    {nftContracts.length > 0 ? (
      <StoreCards className="mx-24 md:mx-64 ">
        {nftContracts &&
          nftContracts.map((contract) => (
            <StoreCard>
              <div className="top"></div>
              <div className="middle">
                <div className="content">
                  <div className="icon_area">
                    <img
                      src={
                        contract.nftContract.icon ??
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
                      }
                      className="chain_icon"
                      alt={contract.nftContract.name + " icon"}
                    />
                  </div>
                  <div className="name_contract">
                    <h3>{contract.nftContract.name.toUpperCase()}</h3>
                    <p>{contract.id}</p>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <button>Manage NFTs</button>
              </div>
            </StoreCard>
          ))}
        {/* deploy here*/}
        <div class="rounded dashed-border p-5">
          <div class="flex flex-col justify-center items-center h-full">
            <div class="items-center text-center justify-center">
              <div class="">
                <button
                  type="button"
                  class="button secondary active p-8 p-med-90 w-32 mb-12 lg:mb-12 mt-64 relative"
                >
                  <span class="visible">New Contract</span>
                </button>
              </div>
            </div>
            <div>
              <a
                href="https://docs.mintbase.xyz/creator/creating-nfts/deploy-contract"
                target="_blank"
                rel="noreferrer noopener"
              >
                <button class="action active p-med-90 undefined" type="button">
                  <div class="flex items-center gap-4 ">
                    <span class="whitespace-nowrap">Learn more</span>
                    <div class="flex justify-center m-4">
                      <svg
                        width="16px"
                        height="16px"
                        viewBox="0 0 24 24"
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        class="fill-current text-blue-300 dark:text-blue-100"
                      >
                        <g clip-path="url(#clip0_295_1571)">
                          <path
                            d="M19 19H5V5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V12H19V19ZM14 3V5H17.59L7.76 14.83L9.17 16.24L19 6.41V10H21V3H14Z"
                            fill="currentColor"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_295_1571">
                            <rect
                              width="24"
                              height="24"
                              fill="currentColor"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </button>
              </a>
            </div>
          </div>
        </div>
      </StoreCards>
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
