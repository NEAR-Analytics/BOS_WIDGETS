State.init({
  newMessage: "",
});

const userAccount = context.accountId;
const relayerAccount = "relayer-address.near";

const userAccountStatus = fetch("https://rpc.mainnet.near.org", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "dontcare",
    method: "query",
    params: {
      request_type: "view_account",
      finality: "final",
      account_id: userAccount,
    },
  }),
});

const relayerAccountStatus = fetch("https://rpc.mainnet.near.org", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "dontcare",
    method: "query",
    params: {
      request_type: "view_account",
      finality: "final",
      account_id: relayerAccount,
    },
  }),
});

const contract = "guest-book.near";
const messages = Near.view(contract, "getMessages", {}).reverse();

const addNewMessage = async () => {
  if (state.newMessage.trim() === "") {
    console.log("No message to add");
    return;
  }
  Near.call(contract, "addMessage", {
    text: state.newMessage,
  });
};

const StyledDemo = styled.div`
  .input-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
  }

  li {
    list-style: none;
    margin-bottom: 1rem;
    display: flex;

    div {
      margin: 10px;
    }
  }
`;

const nearAmount = (yocto) => parseInt(yocto) / Math.pow(10, 24);

return (
  <StyledDemo>
    <h1>Relayer Jokes</h1>
    <h5>
      Post a joke to the blockchain at zero cost to you. The relayer will pay
      the gas fees.
    </h5>
    ------------------------
    <h5>
      Your account: <b>{userAccount}</b>
    </h5>
    <h5>
      Your balance: <b>{nearAmount(userAccountStatus.body.result.amount)}</b>
    </h5>
    ------------------------
    <h5>
      Relayer account: <b>{relayerAccount}</b>
    </h5>
    <h5>
      Relayer balance:{" "}
      <b>{nearAmount(relayerAccountStatus.body.result.amount)}</b>
    </h5>
    ------------------------
    <div className="input-wrapper">
      <Widget
        src="near/widget/DIG.Input"
        props={{
          placeholder: "Say GM to the world",
          onInput: async (e) => State.update({ newMessage: e.target.value }),
          value: state.newMessage,
        }}
      />
      <Widget
        src="near/widget/DIG.Button"
        props={{
          label: "Use a random joke",
          onClick: (e) => {
            asyncFetch("https://icanhazdadjoke.com/", {
              headers: { Accept: "application/json" },
            }).then((res) => {
              const joke = res.body.joke;
              State.update({ newMessage: "" });
              State.update({ newMessage: joke });
            });
          },
          size: "large",
          variant: "secondary",
        }}
      />
    </div>
    <Widget
      src="near/widget/DIG.Button"
      props={{
        label: "Add to Blockhain",
        onClick: (e) => addNewMessage(e),
        size: "large",
      }}
    />
    <div>
      <ul>
        {messages.map((data, key) => {
          return (
            <li class="text-center">
              <div>{data.sender}</div>
              <div>{data.text}</div>
            </li>
          );
        })}
      </ul>
    </div>
  </StyledDemo>
);
