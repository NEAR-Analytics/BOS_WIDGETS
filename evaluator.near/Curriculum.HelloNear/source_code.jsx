const { userAccountId, evaluation_method } = props;

return <>
  <div class="bg-lime-300 p-8 font-bold">
    <h1 class="text-6xl">Hello Near</h1>
  </div>

  <div class="mt-4 px-8 text-gray-800">
    <h3 class="font-bold text-xl my-1 mt-2">
      <span class="bg-gray-800 text-gray-100 pr-1 pl-1">Concept:</span>
    </h3>
    <p>NEAR smart contracts are capable of storing and returning  values by exposing methods that we can interact with.</p>

    <h3 class="font-bold text-xl my-1 mt-2">
      <span class="bg-gray-800 text-gray-100 pr-1">Resources:</span>
    </h3>
    <ul>
      <li>
        <a class="text-blue-600 hover:text-blue-700 hover:underline" href="https://docs.near.org/develop/contracts/quickstart">https://docs.near.org/develop/contracts/quickstart</a>
      </li>
    </ul>

    <h3 class="font-bold text-xl my-1 mt-2">
      <span class="bg-gray-800 text-gray-100 pr-1">Task:</span>
    </h3>
    <p>In this evaluation we will create a simple contract that will store a <b>`greeting`</b> and expose two methods (<b>`set_greeting`</b> and <b>`get_greeting`</b>) interact with.</p>

    <h3 class="font-bold text-xl my-1 mt-2">
      <span class="bg-gray-800 text-gray-100 pr-1">TODO:</span>
    </h3>
    <ul class="list-disc ml-4">
      <li>Add a public function <b>`get_greeting`</b> that returns the stored greeting from the contracts state</li>
      <li>Add a public function <b>`set_greeting`</b> that takes a <b>greeting: string</b> as a parameter, such as
        'howdy', and saves it to the contracts state</li>
    </ul>

    <h3 class="font-bold text-xl text-gray-100 my-2">
      <span class="pr-1 bg-gray-800">Interacting with the contract:</span>
    </h3>
    <div class="px-4 py-4 text-gray-100 text-sm font-mono subpixel-antialiased 
                bg-gray-800 rounded-lg leading-normal overflow-hidden">
      <div>
        <p>
          {`$ near call mycontract.${userAccountId} set_greeting '{"greeting": "howdy"}' --accountId
            ${userAccountId}`}
        </p>
        <p class="text-green-400">{'>'} ''</p>
      </div>

      <div class="mt-4">
        <p>
          {`$ near view mycontract.${userAccountId} get_greeting`}
        </p>
        <p class="text-green-400"> {'>'} 'howdy'</p>
      </div>
    </div>

    <h3 class="font-bold text-xl my-1 mt-2 text-gray-100 pr-1">
      <span class="pr-1 bg-gray-800">Run the tests:</span>
    </h3>

    <p>After we have made sure we are in the relevant directory we can run the tests by
      <span class="font-bold">`npm run test-ts`</span> or <span class="font-bold">`npm run test-rs`</span> respectively
    </p>


    {/* Evaluation */}
    < Widget src="evaluator.near/widget/Evaluate" props={{ evaluation_method, userAccountId }} />
  </div>
  <div class="bg-lime-300 h-1 mt-4"></div>
</>


