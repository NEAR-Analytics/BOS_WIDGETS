let greeting = "Have a great day";
let message = "lets build somethin";
return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>Hello {props.name}</h1>

      <p> {greeting} </p>
      <h4> {message} </h4>
    </div>
  </>
);
