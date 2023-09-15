
/**
 * Check is human
 * 
 */
let accountId = props.accountId ?? context.accountId;
const registryContract = "registry.i-am-human.near";
State.init({
  accountId: accountId,
});
function loadFlagged() {
    console.log("Loading flag for this account: " + state.accountId);
  const flagged = Near.view(registryContract, "account_flagged", {
    account: state.accountId,
  });

  State.update({
    blacklisted: flagged === "Blacklisted",
    greylisted: flagged !== "Blacklisted" && flagged !== "Verified",
    flagged: flagged,
  });
  console.log("Is " + state.accountId + " flagged? " + state.flagged)
  return flagged;
}


function getAccountsWithProfile() {
  const data = Social.keys("*/profile", "final");

  if (!data) {
    return "Loading";
  }

  const accounts = Object.entries(data);

  const allProfiles = [];

  for (let i = 0; i < accounts.length; ++i) {
    const accountId = accounts[i][0];
    allProfiles.push(accountId);
  }
  return allProfiles;
}

const onChangeRecipient = (recipient) => {
            console.log("Recipient : " + recipient ); 

  State.update({
    accountId: recipient,
  });
  loadFlagged();
    

};


function isFlagged(account) {
            console.log("Starting is flagged check : " + account ); 

    const view = Near.view("registry.i-am-human.near", "account_flagged", {
      account: `${account}`,
    });
        console.log("View: "  + view?.[0]?.[1]?.[0]); 


}



const Main = styled.div`
  display: grid;
  gap: 3rem;
  align-content: center;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  margin-top: 5px;
  width: 100%;
  padding: 1rem;
  .button {
    padding: 0.75em 2em;
    border-radius: 0.7em;
    border: 1px solid #0d99ff;
    transition: all 0.3s;
    cursor: pointer;
    color: #fff;
    background: #0d99ff;
    &:hover {
      color: #0d99ff;
      background: #fff;
    }
    @media screen and (max-width: 540px) {
      padding: 0.5em 2em;
    }
  }
`;



const Card = styled.div`
  padding: 1em;
  border: 1px solid #e5e8eb;
  gap: 2em;
  margin: 10px auto;
  border-radius: 0.7em;
  & input {
    display: block;
    padding: 0.5em;
    width: 100%;
    border: 1px solid #e5e8eb;
    border-radius: 10px;
    outline: none;
    background: #f4f5f6;
    color: #525c76;
    :focus {
      box-shadow: none;
      border: 1px solid #0d99ff;
    }
    &::placeholder {
      color: palevioletred;
    }
  }
`;






return (
  <>


 
    

              <Card>
                Search NEAR Account
                <Typeahead
                  id="async-example"
                  className="type-ahead"
                  isLoading={isLoading}
                  labelKey="search"
                  minLength={1}
                  options={getAccountsWithProfile()}
                  onChange={(value) => onChangeRecipient(value)}
                  placeholder={state.accountId
                  }
                />
              </Card>

    <div>Are you flagged? {state.flagged}</div>

      <Widget src="nearefi.near/widget/ReFi.DAO.memberCard" props={{accountId: state.accountId}}/>

  </>
);