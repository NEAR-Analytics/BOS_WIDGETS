let greeting = "Have a great day";
const { name } = props;

return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>Hello {name}</h1>
      <h2>{props.lastname}</h2>
      <p> {greeting} </p>
    </div>
  </>
);
