// return (
//   <>
//     {/* src="near/widget/Onboarding.ComponentCard" to be pasted below */}
//     <Widget src="near/widget/Onboarding.ComponentCard" props={{ accountId }} />
//     <br />
//     {/* src="near/widget/Onboarding.ComponentCollection" to be pasted below */}
//     <Widget src="near/widget/Onboarding.ComponentCollection" props={{}} />
//   </>
// );
let user_account = context.accountId;
let greetings = "Have a nice day 😄";

return (
  <>
    <div class="container border border-info p-3 text-center min-vw-100">
      <h1>Hello {props.name}</h1>
      <p> {user_account} </p>
      <h3>{props.greetings}</h3>
    </div>
  </>
);
