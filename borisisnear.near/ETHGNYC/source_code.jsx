let greeting = "Let's Rock the Encode Hackathon!";

return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>Hello {props.name}</h1>

      <p> {greeting} </p>

      <select>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  </>
);