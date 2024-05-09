const greeting = Near.view(contract, "get_greeting", {});
const IMG = styled.img`
height : 40px;
`;
const contract = "greet.vanshika.near";

const onInputChange = ({ target }) => {
  State.update({ greeting: target.value });
};

const onBtnClick = () => {
  Near.call(contract, "set_greeting", {
    new_greeting: state.greeting,
  });
};

const greetingForm = (
  <div className="border border-white p-3">
    <label htmlFor="greetingInput" className="form-label text-white">
      User Name
    </label>
    <input
      id="greetingInput"
      placeholder="Near India"
      value={state.greeting}
      onChange={onInputChange}
      className="form-control mb-2 bg-black text-white"
    />
    <button
      className="btn btn-primary bg-black text-white"
      onClick={onBtnClick}
    >
      Update
    </button>
  </div>
);

const notLoggedInWarning = (
  <p className="text-center text-white py-2">Login to change the greeting</p>
);

return (
  <div className="container p-3 border border-black bg-black">
    <div className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <IMG
            src="https://i.ibb.co/7Vs0tWT/Screenshot-2024-01-27-213414.png"
            alt="IndoGreet Logo"
            className="d-inline-block align-top"
          />
          <b>IndoGreet</b>
        </a>
      </div>
    </div>

    <h3 className="text-center mb-3 text-white">
      {state.greeting
        ? `Greetings, ${state.greeting}!`
        : `Greet ${state.greeting}!`}
    </h3>

    <p className="text-center mb-4 text-white">
      Discover greetings stored on the NEAR blockchain with IndoGreet.
    </p>

    {greetingForm}
    {!context.accountId && notLoggedInWarning}
  </div>
);
