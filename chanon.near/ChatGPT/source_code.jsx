// handle only ask once
// handle waiting process to display

State.init({
  apiKey: "",
  askQuestion: "",
  respAnswer: "Waiting for answer ...",
});

const queryURI = "https://api.openai.com/v1/chat/completions";
const token = "Bearer "; // fill api keys
let data = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: "plan a 30 days trip to usa.",
    },
  ],
  temperature: 1,
  top_p: 1,
  n: 1,
  stream: false,
  max_tokens: 250,
  presence_penalty: 0,
  frequency_penalty: 0,
};
const fetchAskChatGPT = (queryURI) => {
  data.messages[0].content = state.askQuestion;
  return asyncFetch(queryURI, {
    method: "POST",
    headers: {
      Authorization: token + state.apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const handleAskChatGPT = () => {
  fetchAskChatGPT(queryURI).then((res) => {
    // load into infinities scrolls
    State.update({ respAnswer: res.body.choices[0].message.content });
    console.log(res.body.choices[0].message.content);
  });
};

return (
  <div>
    <input
      value={state.apiKey}
      onChange={(e) => State.update({ apiKey: e.target.value })} // react
      placeholder="Please paste your chatgpt api key"
    />
    <input
      value={state.askQuestion}
      onChange={(e) => State.update({ askQuestion: e.target.value })}
      placeholder="Please type your question"
    />

    <button class="btn btn-success" onClick={handleAskChatGPT} disabled={false}>
      Ask ChatGPT for Thaiprogrammer
    </button>
    <div>{state.respAnswer}</div>
  </div>
);
