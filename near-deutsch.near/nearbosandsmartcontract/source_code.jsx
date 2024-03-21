const contract = "hello.near-examples.near"
const greeting = Near.view(contract, "get_greeting", {});

State.init({ new_greeting: "" });

const onInputChange = ({ target }) => {
  State.update({ new_greeting: target.value });
};

const onBtnClick = () => {
  if (!state.new_greeting) {
    return;
  }

  Near.call(contract, "set_greeting", {
    greeting: state.new_greeting,
  });
};


const changeGreeting = (
    <div>
      <label>Begrüßung ändern:</label>
      <input placeholder="Hallo" onChange={onInputChange} />
      <button onClick={onBtnClick}>
        Speichern
      </button>
    </div>
);

const loginInfo = <p> Logge dich ein, um die Begrüßung zu ändern </p>;

// Render
return (
  <>
    <div>
      <div>
        Der Smart Contract "Hello" begrüßt dich mit: <b>{greeting}</b>
      </div>
     <p></p>
      {context.accountId ? changeGreeting : loginInfo}
    </div>
  </>
);

