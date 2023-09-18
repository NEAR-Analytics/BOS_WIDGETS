let user_account = context.accountId;
let greeting = "Have a great day";
/* To create a component you simply need to implement a return statement,
returning some HTML code. */
return (
  <>
    <div class="container border border-info p-3 text-center min-vw-100">
      <h1>Hello</h1>
      <p>
        {greeting} {user_account}{" "}
      </p>
    </div>
  </>
);
