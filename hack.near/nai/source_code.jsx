const [question, setQuestion] = useState("");

const systemPrompt = `Today is ${new Date()
  .toISOString()
  .substring(
    0,
    10
  )}. You are an expert biology teacher. Help students think about complext topics. Provide short answers.`;

const [prompt, setPrompt] = useState("");
const [loading, setLoading] = useState(false);
const [response, setResponse] = useState("");

const [messages, setMessages] = useState([
  {
    role: "assistant",
    content: "Hey! I'm here to help you learn biology.",
  },
]);

const submitQuestion = () => {
  setLoading(true);
  Near.call({
    contractName: "gpt4.near",
    methodName: "request",
    args: {
      request: {
        text: question,
      },
    },
    gas: "100000000000000",
    deposit: "10000000000000000000000",
  });
  setQuestion("");
};

const Wrapper = styled.div`
.message {
  border-radius: 2rem;  
  border: 1px solid rgb(222, 226, 230);
  padding: 1em;
  margin-bottom: 1em;

  &.assistant {
    margin-right: 5em;
  }

  &.assistant:before {
    content: "Bio Tutor";
    color: #999;
  }

  &.user {
    margin-left: 5em;
  }

  p:last-child {
    margin-bottom: 0;
  }
}
`;

return (
  <Wrapper>
    <h1 className="text-center">Multiversity</h1>
    <br />
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
            if (e.key === "Enter") {
              submitQuestion();
            }
          }}
          placeholder="What is your question?"
          autoFocus
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
      <Markdown text={content} />
      {loading && (
        <div key="loading" className={`message assistant`}>
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
