const [toEvaluate, setToEvaluate] = useState("");

const contract = "dev-1702501552751-96008049963552";
const accountRegistered = Near.view(contract, "check_account_registered", {
  account_id: context.accountId,
});

const evaluate = () => {
  console.log(accountRegistered);
  console.log(context.accountId);
};

const handleChange = (e) => {
  this.setState({ value: e.target.value });
};


const handleSubmit = (e) => {
  alert("evaluate: " + this.state.value);
  e.preventDefault();
};

return (
  <>
    <div class="container">
      <div>
        <h1>Evaluation One</h1>
        Evaluate Hello Near
        <p>In lesson one </p>
        <input
          onChange={onChange}
          placeholder={`eg. hello_near.${context.accountId}`}
        />
        <button onClick={evaluate}>Evaluate</button>
      </div>

      <div>
        Evaluate Guestbook
        <p>In lesson 2</p>
        <input
          onChange={onChange}
          placeholder={`guestbook.${context.accountId}`}
        />
      </div>
    </div>
  </>
);
