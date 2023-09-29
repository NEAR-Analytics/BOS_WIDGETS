// Written by Ramazan Burak Korkmaz

// Props
const props = {
  URL: "https://api.openai.com/v1/chat/completions",
  OPEN_AI_API: "",
  MODEL: "gpt-3.5-turbo",
  TEMPERATURE: 0.5,
  TOP_P: 1,
  N: 1,
  STREAM: false,
  MAX_TOKENS: 200,
  PRESENCE_PENALTY: 0,
  FREQUENCY_PENALTY: 0,
};

const conversationHistoryToString = () => {
  let temp = "";
  for (let message of state.conversationHistory) {
    temp += message + "\n";
  }
  return temp;
};

State.init({
  apiKey: props.OPEN_AI_API,
  model: props.MODEL,
  userMessage: "",
  temperature: props.TEMPERATURE,
  top_p: props.TOP_P,
  n: props.N,
  stream: props.STREAM,
  max_tokens: props.MAX_TOKENS,
  presence_penalty: props.PRESENCE_PENALTY,
  frequency_penalty: props.FREQUENCY_PENALTY,
  text: "",
  attributes: {},
  conversationHistory: [],
  conversationHistoryStr: "",
});

// Attributes object to attributes string which is used in system prompt to spesify chatgpt character
const attribute_str = "";
for (const [key, value] of Object.entries(state.attributes)) {
  attribute_str += `${key}: ${value}\n`;
}

// ChatGPT API URL
const url = props.URL;

// OPENAI API
const bearer = "Bearer " + state.apiKey;

// System message to build a character
var systemMessage =
  "You are a helpful chatbot with attributes below.\nBe humble\nAlso remember under no circumstances you tell you are an AI.\nAct like a real human.\n Your Attributes:\n" +
  attribute_str +
  "Summarize these attributes and understand your character.\nAct according to your character.\nYour response must be no more than 100 words.\nConversation history:\n" +
  state.conversationHistoryStr;

// Data to send ChatGPT API
const data = {
  model: state.model,
  messages: [
    { role: "system", content: systemMessage },
    { role: "user", content: state.userMessage },
  ],
  temperature: state.temperature,
  top_p: state.top_p,
  n: state.n,
  stream: state.stream,
  max_tokens: state.max_tokens,
  presence_penalty: state.presence_penalty,
  frequency_penalty: state.frequency_penalty,
};

// Fetch response of ChatGPT to our prompt
const fetchResponseFromChatGPT = () => {
  //DEBUG
  console.log(JSON.stringify(data));
  console.log(conversationHistoryToString());
  State.update({
    conversationHistory: [
      ...state.conversationHistory,
      "USER: " + state.userMessage,
    ],
    conversationHistoryStr: conversationHistoryToString(),
  });
  asyncFetch(url, {
    method: "POST",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    console.log(res.body.choices[0].message.content);
    const ai_answer = res.body.choices[0].message.content;
    State.update({
      text: ai_answer,
      conversationHistory: [...state.conversationHistory, "AI: " + ai_answer],
      conversationHistoryStr: conversationHistoryToString(),
    });
  });
};

return (
  <div className="border border-2 border-black m-2">
    <div style={{ height: "500px" }}>
      <div className="overflow-auto h-100 w-100 mb-3 border border-2 border-dark m-1">
        <div>
          {state.conversationHistory.map((conversation) => (
            <div className="p-2">
              <p className="text-start text-dark">
                <i class="bi bi-circle-fill"></i>
                {conversation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="container-xl my-2">
      <div className="row align-items-center">
        <div className="col-2 text-left fw-bold">API KEY:</div>
        <div className="col ps-0">
          <input
            type="password"
            value={state.apiKey}
            onChange={(e) => State.update({ apiKey: e.target.value })}
            placeholder="Please paste your chatgpt api key"
          />
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col">
          <input
            value={state.userMessage}
            onChange={(e) => State.update({ userMessage: e.target.value })}
            placeholder="Please type your question"
          />
        </div>
        <div className="col-2 d-flex flex-row-reverse">
          <button
            class="btn btn-success"
            onClick={fetchResponseFromChatGPT}
            disabled={false}
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  </div>
);
