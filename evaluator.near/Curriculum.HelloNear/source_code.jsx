return <>
  <div class="bg-lime-300 p-8 font-bold">
    <h1 class="text-6xl">Hello Near</h1>
  </div>

  <div class="mt-4 px-8 text-gray-800 text-lg">
    <p>In this task we will cover the Hello Near smart contract. The contract stores a <b>greeting: string</b> attribute
      in its state, and exposes two methods to interact with it (<b>set_greeting, get_greeting</b>).</p>
    <p class="mt-1 font-bold">When in doubt, refer to the docs:<br />
      <a class="text-blue-600 hover:text-blue-700 hover:underline"
        href="https://docs.near.org/develop/contracts/quickstart">https://docs.near.org/develop/contracts/quickstart</a>
    </p>

    <h3 class="font-bold text-xl my-1 mt-2">
      <span class="bg-gray-800 text-gray-100 pr-1">TODO:</span>
    </h3>

    <ul class="list-disc ml-4">
      <li>Add a public function <b>`get_greeting`</b> that returns the stored greeting from the contracts state</li>
      <li>Add a public function <b>`set_greeting`</b> that takes a <b>greeting: string</b> as a parameter, such as
        'howdy', and saves it to the contracts state</li>
    </ul>

    <h3 class="font-bold text-xl my-2">
      <span class="bg-gray-800 text-gray-100 pr-1">Sample Interaction:</span>
    </h3>
    <div class="w-full">
      <div class="px-4 py-4 text-gray-100 text-sm font-mono subpixel-antialiased 
              bg-gray-800 rounded-lg leading-normal overflow-hidden">
        <div class="mb-2 flex">
          <div class="h-3 w-3 bg-red-500 rounded-full"></div>
          <div class="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
          <div class="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
        </div>
        <div class="mt-4 flex">
          <span class="text-green-400">computer:~$</span>
          <p class="flex-1 items-center pl-2">
            {`near call mycontract.${context.accountId} set_greeting '{"greeting": "howdy"}' --accountId
            ${context.accountId}`}
          </p>
        </div>
        <div>
          <p>Scheduling a call: {`mycontract.${context.accountId}.set_greeting({"greeting": "howdy"})`}<br />
            Doing account.functionCall()<br />
            ...<br /></p>
          <p class="text-green-400">''</p>
        </div>

        <div class="mt-4 flex">
          <span class="text-green-400">computer:~$</span>
          <p class="flex-1 items-center pl-2">
            {`near view mycontract.${context.accountId} get_greeting`}
            <br />
          </p>
        </div>
        <div>
          <p>View call: {`mycontract.${context.accountId}.get_greeting()`}</p>
          <p class="text-green-400">'howdy'</p>
        </div>

      </div>
    </div>

    {/* Evaluation */}
    <Widget src="evaluator.near/widget/Evaluate" props={{ evaluation_method: props.evaluation_method }} />
  </div>
  <div class="bg-lime-300 h-1 mt-4"></div>
</>


