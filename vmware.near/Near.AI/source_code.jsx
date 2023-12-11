const [question, setQuestion] = useState("");

const [prompt, setPrompt] = useState("");
const [loading, setLoading] = useState(false);
const [response, setResponse] = useState("");

const [messages, setMessages] = useState([]);

useEffect(() => {
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return;
  }
  console.log(messages);
  setLoading(true);
  asyncFetch(`https://ai.near.social/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
    body: JSON.stringify([...messages.slice(-3)]),
  })
    .then(({ body }) => {
      setMessages([...messages, { role: "assistant", content: body.response }]);
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

  &.assistant {
    margin-right: 5em;
  }

  &.assistant:before {
    content: "AI";
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
    <h1 className="text-center">Near.AI</h1>
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
          placeholder="What's your question?"
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
      {messages.map(({ role, content }, i) => {
        return (
          <div key={i} className={`message ${role}`}>
            {role === "user" && (
              <Widget
                src="mob.near/widget/N.ProfileLine"
                props={{ accountId: context.accountId }}
              />
            )}
            <Markdown text={content} />
          </div>
        );
      })}
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
