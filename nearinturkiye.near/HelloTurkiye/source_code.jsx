let name = props.name || "User";
let greeting = "Have a great day";

return (
  <>
    <div class="container border border-info p-3 text-center min-vw-100">
      <h1>Hello {name}</h1>
      <p> {greeting} </p>
    </div>
  </>
);
