const contract = "hello.near-examples.near";
const greeting = Near.view(contract, "get_greeting", {});

if (!greeting || context.loading) {
  return "Loading...";
}

// Use and manipulate state
State.init({ greeting });

const onInputChange = ({ target }) => {
  State.update({ greeting: target.value });
};

const onBtnClick = () => {
  Near.call(contract, "set_greeting", {
    greeting: state.greeting,
  });
};

// Define components
const greetingForm = (
  <>
    <div class="border border-black p-3">
      <label>Update greeting</label>
      <input placeholder="Howdy" onChange={onInputChange} />
      <button class="btn btn-primary mt-2" onClick={onBtnClick}>
        Save
      </button>
    </div>
  </>
);

const notLoggedInWarning = (
  <p class="text-center py-2"> Login to change the greeting </p>
);

// Render
return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">
        The contract says:
        <span class="text-decoration-underline"> {state.greeting} </span>
      </h3>

      <p class="text-center py-2">
        Look at that! A greeting stored on the NEAR blockchain.
      </p>

      {context.accountId ? greetingForm : notLoggedInWarning}
    </div>
  </>
);
