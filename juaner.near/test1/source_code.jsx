let greeting = "Have a great day";
console.log("000000000000-test1组件更新了");
return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>Hello {props.name}</h1>

      <p> {greeting} </p>
    </div>
  </>
);
