const evaluationName = "Guest Book";
const evaluationMethod = "evaluate_guestbook";
const accentColor = "#F9A8D4";

const text = (userAccountId) => (`
# GuestBook

### Concept:
Attaching deposit to a function call.

### Resources:
- [https://docs.near.org/sdk/rust/contract-interface/payable-methods](https://docs.near.org/sdk/rust/contract-interface/payable-methods)
- [https://docs.near.org/sdk/js/contract-interface/payable-methods](https://docs.near.org/sdk/js/contract-interface/payable-methods)

### Task:
In this evaluation we will create a Guestbook that any user can **'add_message'** to, the user can optionally attach a payment to the message to make it a premium.

### TODO:
- Add a **'[payable]'** function **'add_message'** that takes a text (String) as argument and stores it in the messages vector in the contract state.
  If the user attaches more than 0.01N the message should be premium.
- Add a function **'get_messages'** that returns a list of messages from the contract state.
  The function should take two optional arguments: **'from_index'** and **'limit'**. to implement pagination.
  The function should return a list of messages starting from **'from_index'** and up to **'limit'** number of messages.
- Add a function **'total_messages'** that returns the total number of messages in the contract state.

### Interacting with the contract:
\`\`\`bash
$ near call guestbook.${userAccountId} add_message '{"text": "My message"}' --accountId ${userAccountId}
> ''
\`\`\`

\`\`\`bash
$ near call guestbook.${userAccountId} add_message '{"text": "My Premium Message"}' --deposit 1 --accountId ${userAccountId}
> ''
\`\`\`

\`\`\`bash
$ near view guestbook.${userAccountId} total_messages
> '2'
\`\`\`

\`\`\`bash
$ near view guestbook.${userAccountId} view_messages 
> '[
  { premium: false, sender: '${userAccountId}', text: 'My message' },
  { premium: true, sender: '${userAccountId}', text: 'My Premium Message' }
]'
\`\`\`

### Run the tests:

After we have made sure we are in the relevant directory we can run the tests by \`npm run test - ts\` or \`npm run test - rs\`
`);

return { evaluationName, evaluationMethod, accentColor, text }
