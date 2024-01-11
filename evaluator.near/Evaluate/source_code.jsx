const [contractAccountId, setContractAccountId] = useState('');
const [inputRequired, setInputRequired] = useState(false);

function handleChange(e) {
  setContractAccountId(e.target.value);
};

function handleSubmit() {
  if (contractAccountId === '') {
    setInputRequired(true);
  } else {
    setInputRequired(false);
    return Near.call("eval.flmel.near", props.evaluation_method, { "contract_account_id": contractAccountId }, 300000000000000);
  }
};

return <>
  <div class="flex justify-between items-baseline">
    <p class="mt-4 font-bold">Once the tests are passing, contract is deployed and you are ready to submit: </p>
    <button class="rounded-lg py-2 px-4 bg-blue-600 hover:bg-blue-700 text-gray-100 text-right"
      onClick={handleReadyToEvaluate}>Click Here</button>
  </div>

  <div class="mt-4 bg-gray-800 text-gray-100 rounded-lg py-4 px-4">
    <p class="text-gray-100">Enter your contract address here:</p>
    <div class="flex">
      <input class="w-full rounded-l-lg pl-4 py-2 focus:outline-none text-gray-800" onChange={handleChange}
        placeholder={`mycontract.${context.accountId}`}
        required />
      <button class="w-1/3 bg-blue-600 hover:bg-blue-700 text-gray-100 rounded-r-lg"
        onClick={handleSubmit}>Evaluate</button>
    </div>
    {inputRequired ? <p class="text-red-100">Please provide the contract address</p> : <></>}
    <p class="mt-1"><b>OR</b>, You can also validate trough the CLI via:</p>
    <p
      class="border border-gray-100 text-gray-100 font-mono subpixel-antialiased text-sm rounded-lg py-2 px-1 mt-2">
      {`near call evaluator.near ${props.evaluation_method} '{"contract_account_id": "mycontract.${context.accountId}"}' --accountId ${context.accountId}`}</p>
  </div>
</>
