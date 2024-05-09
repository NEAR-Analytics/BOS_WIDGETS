const callNearSocial = () => {
  Near.call("social.near", "testmethod", []);
};
const callOtherContract = () => {
  Near.call("petersalomonsen.near", "testmethod", []);
};
return (
  <div>
    <p>
      Calling social.near should using Near.call should not present the option
      for not asking again.
      <button onClick={callNearSocial}>Call social.near</button>
    </p>
    <p>
      Calling any other contract should using Near.call should present the
      option for not asking again.
      <button onClick={callOtherContract}>Call petersalomonsen.near</button>
    </p>
  </div>
);
