const [contractAccountId, setContractAccountId] = useState('');
const [inputRequired, setInputRequired] = useState(false);
const { userAccountId, evaluationMethod, evaluatorContract } = props;


function handleChange(e) {
  setContractAccountId(e.target.value);
};

function handleSubmit() {
  if (contractAccountId === '') {
    setInputRequired(true);
  } else {
    setInputRequired(false);
    return Near.call(evaluationContract, evaluationMethod, { "contract_account_id": contractAccountId }, 300000000000000);
  }
};

return <>
  <h3 class="font-bold text-xl my-1 mt-2 text-gray-100 pr-1">
    <span class="pr-1 bg-gray-800">Evaluating:</span>
  </h3>

  <p>Once the tests are passing, contract is deployed and we are ready to submit: </p>

  <div class="mt-2 bg-gray-800 text-gray-100 rounded-lg py-4 px-4">
    <p class="text-gray-100">Enter your contract address here:</p>
    <div class="flex">
      <input class="w-full rounded-l-lg pl-4 py-2 focus:outline-none text-gray-800" onChange={handleChange}
        placeholder={`contract.${userAccountId}`}
        required />
      <button class="w-1/3 bg-blue-600 hover:bg-blue-700 text-gray-100 rounded-r-lg"
        onClick={handleSubmit}>Evaluate</button>
    </div>

    {inputRequired ? <p class="text-red-100">Please provide the contract address</p> : <></>}
    <p class="mt-1"><b>OR</b>, validate your contract trough the CLI using:</p>
    <p
      class="border border-gray-100 text-gray-100 font-mono subpixel-antialiased text-sm rounded-lg py-2 px-1 mt-2">
      {`near call evaluator.near ${evaluationContract} '{"contract_account_id": "contract.${userAccountId}"}' --accountId ${userAccountId}`}</p>
  </div>
</>
