const md = '# Lesson 2 - GuestBook\n---\n\n## Overview:\n \n\n##  Tasks:\n\n- Add a payable function `add_message` that adds a new message to the state. The function should accept a single parameter `text` that is a string. If the user attaches more than 0.1N the message should be premium.\n\n - Add a view function `get_messages` that returns an array of messages. The function should accept two parameters `from_index` and `limit`. The function should return an array of PostedMessage starting from `from_index` with length `limit`.\n\n## Run the tests:\n\n`npm run tests-ts` or `npm run tests-rs`\n'
const evaluation_method = "evaluate_guest_book";

return <>
  <div class="bg-pink-300 p-8">
    <h1 class="text-6xl font-bold">Guest-book</h1>
  </div>

  <div class="mt-4 px-8 text-gray-800">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, obcaecati. Minima neque quisquam repellat. Ducimus odio provident alias nisi architecto, illo ipsam eius quia maiores, rem eos dignissimos obcaecati illum.
    <div class="text-right py-4">
      <button class="rounded-lg py-2 px-4 bg-blue-700 hover:bg-blue-800 text-gray-100">Complete and Continue</button>
    </div>
  </div>

  {/* Evaluation */}
  <Widget src="evaluator.near/widget/Evaluate" props={{ evaluation_method }} />

  <div class="bg-pink-300 h-1"></div>
</>

