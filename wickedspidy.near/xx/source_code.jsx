const contrat = "name.near";
const greeting = Near.view(contrat, "set_name", {});

State.init({ greeting });

const onBtnclick = () => {
  Near.call(contrat, "set_name", {
    greeting: state.greeting,
  });
};

return (
  <div>
    <button onClick={onBtnClick}>Save</button>
    <span> {state.greeting} </span>
    {context.accountId ? greetingForm : notLoggedInWarning}
  </div>
);
