const { userAccountId } = props;

const evaluation_name = "Hello Near";
const evaluation_method = "evaluate_hello_near";
const accent_color = "#BEF264";

const text = (`
# Hello Near

### Concept:
NEAR smart contracts are capable of storing and returning  values by exposing methods that we can interact with.

### Resources:
- [https://docs.near.org/develop/contracts/quickstart](https://docs.near.org/develop/contracts/quickstart)

### Task:
In this evaluation we will create a simple contract that will store a **'greeting'** and expose two methods (**'set_greeting'**) and **'get_greeting'**) interact with.

### TODO:
- Add a public function **'get_greeting'** that returns the stored greeting from the contracts state
- Add a public function **'set_greeting'** that takes a **greeting: string** as a parameter, such as 'howdy', and saves it to the contracts state

### Interacting with the contract:
\`\`\`bash
$ near call mycontract.${userAccountId} set_greeting '{"greeting": "howdy"}' --accountId ${userAccountId}
# > ''
\`\`\`

\`\`\`bash
$ near view mycontract.${userAccountId} get_greeting
# > 'howdy'
\`\`\`

### Run the tests:

After we have made sure we are in the relevant directory we can run the tests by \`npm run test - ts\` or \`npm run test - rs\`
`);

return { evaluation_name, evaluation_method, accent_color, text }
