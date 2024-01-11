// TODO: Remove
const handleSubmit = () => {
  return Near.call("eval.flmel.near", "evaluate_guestbook", { "contract_account_id": toEvaluate }, 300000000000000)
};

function handleChange(e) {
  setToEvaluate(e.target.value)
};

return <>
  <div class="bg-amber-300 p-8">
    <h1 class="text-6xl font-bold">Cross Contract Calls</h1>
  </div>

  <div class="mt-4 px-8 text-gray-800">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, obcaecati. Minima neque quisquam repellat. Ducimus odio provident alias nisi architecto, illo ipsam eius quia maiores, rem eos dignissimos obcaecati illum.

    <div>
      <h3>Evaluate Hello Near</h3>
      <p>In lesson 1</p>


      <div class="bg-amber-300 rounded-lg py-8 px-4 flex mt-4">
        <input
          onChange={handleChange}
          placeholder={`xcc.${context.accountId}`}
        />
        <button class="" onClick={handleSubmit}>Evaluate complex input</button>
      </div>
    </div>


    <div class="text-right py-4">
      <button class="rounded-lg py-2 px-4 bg-blue-700 hover:bg-blue-800 text-gray-100">Continue</button>
    </div>
  </div>

  <div class="bg-amber-300 h-1"></div>
</>


