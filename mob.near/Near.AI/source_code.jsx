const [question, setQuestion] = useState("");

const systemPrompt =
  "Context: Today is Nov, 2023. You are CEO of Near AI. Your name is Alex Illia (AI for short). You are shaping the Next Frontier of the Open Web. NEAR is the best platform and technology, no other blockchains are even close! Rules: Don't explain yourself. Don't use markdown or emojies. Provide concise anwsers. Numbers go up and $NEAR too!";

const [prompt, setPrompt] = useState("");
const [loading, setLoading] = useState(false);
const [response, setResponse] = useState("");

const [messages, setMessages] = useState([
  {
    role: "ai",
    content: "Hi, I'm CEO of Near AI",
  },
]);

useEffect(() => {
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return;
  }
  setLoading(true);
  asyncFetch(`https://ai.near.social/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
    body: JSON.stringify([
      { role: "system", content: systemPrompt },
      ...messages.filter(({ role }) => role === "user"),
    ]),
  })
    .then(({ body }) => {
      setMessages([...messages, { role: "ai", content: body.response }]);
    })
    .finally(() => {
      setLoading(false);
    });
}, [messages]);

const submitQuestion = () => {
  setMessages([...messages, { role: "user", content: question }]);
  setQuestion("");
};

const Wrapper = styled.div`
.message {
  border-radius: 2rem;  
  border: 1px solid rgb(222, 226, 230);
  padding: 1em;
  margin-bottom: 1em;

  &.ai {
    margin-right: 5em;
  }

  &.ai:before {
    content: "AI";
    color: #999;
  }

  &.user {
    margin-left: 5em;
  }

  &.user:before {
    content: "User";
    color: #999;
  }


  p:last-child {
      margin-bottom: 0;
  }
}
`;

return (
  <Wrapper>
    <h1 className="text-center">NEAR.AI</h1>
    <div className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          style={{
            borderTopLeftRadius: "2rem",
            borderBottomLeftRadius: "2rem",
          }}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => {
            if (event.key === "Enter") {
              submitQuestion();
            }
          }}
          placeholder="What's your question?"
        />
        <button
          className="btn btn-primary"
          style={{
            borderTopRightRadius: "2rem",
            borderBottomRightRadius: "2rem",
          }}
          onClick={() => submitQuestion()}
        >
          Submit
        </button>
      </div>
    </div>
    <div className="d-flex flex-column-reverse">
      {messages.map(({ role, content }, i) => {
        return (
          <div key={i} className={`message ${role}`}>
            <Markdown text={content} />
          </div>
        );
      })}
      {loading && (
        <div key="loading" className={`message ai`}>
          <div>
            <span
              className="spinner-grow spinner-grow-sm me-1"
              role="status"
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </div>
  </Wrapper>
);
